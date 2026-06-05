// renderer.js — Motor AAA Híbrido: Sincronia Estrita + HLS + Anti-Sleep (iOS)

/* =================== AudioContext / Constantes =================== */
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

const DUCK_DOWN_TIME = 0.1; 
const DUCK_UP_TIME = 0.5;   

/* =================== Gerador de Silêncio Real (iOS Hack) =================== */
function gerarSilencio10Segundos() {
    const sampleRate = 8000, segundos = 10, channels = 1, bps = 16;
    const blockAlign = channels * (bps / 8);
    const dataSize = sampleRate * segundos * blockAlign; 
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeStr = (pos, str) => { for(let i=0; i<str.length; i++) view.setUint8(pos+i, str.charCodeAt(i)); };

    writeStr(0, 'RIFF'); view.setUint32(4, 36 + dataSize, true);
    writeStr(8, 'WAVE'); writeStr(12, 'fmt '); view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true); view.setUint16(34, bps, true);
    writeStr(36, 'data'); view.setUint32(40, dataSize, true);

    let binary = '';
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return 'data:audio/wav;base64,' + btoa(binary);
}
const silentTrack = gerarSilencio10Segundos();

/* =================== Gains / Streaming =================== */
const musicGain = audioCtx.createGain(); musicGain.gain.value = 1.0; musicGain.connect(audioCtx.destination);
const narrationGain = audioCtx.createGain(); narrationGain.connect(audioCtx.destination);

const streamAudioElement = new Audio();
streamAudioElement.crossOrigin = "anonymous";
streamAudioElement.setAttribute('playsinline', ''); 
streamAudioElement.setAttribute('webkit-playsinline', '');
streamAudioElement.src = silentTrack; 
streamAudioElement.style.display = 'none';
document.body.appendChild(streamAudioElement);

/* =================== Gerenciamento de Estado =================== */
const audioBufferCache = new Map();
let started = false;
let currentSessionId = 0; 

let activeExpansionKey = 'v'; 
let activeRadioKey = 'radio_18_90s_rock'; 
let activeNarrationsCount = 0;
let activeAudioSources = [];
let preloadedEvents = new Map();
let currentTimeline = [];

let currentStreamEvent = null; 
let isSystemSeeking = false; 
let iosUnlocked = false;
let hlsInstance = null; // Instância HLS.js

/* =================== Utils & Relógio Mestre =================== */
function log(...args){ console.log('[RADIO]', ...args); }

function getCurrentMonthMs() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    return now.getTime() - startOfMonth.getTime();
}

/* =================== Personalizar Widget Media (Lockscreen) =================== */
function updateChromeMediaHub(titleText) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: titleText,
            artist: 'GTA Radio Player',
            album: activeExpansionKey.toUpperCase() + ' EDITION'
        });
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('seekto', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
    }
}

/* =================== Motores de Reprodução & Ducking =================== */
function onNarrationStart(scheduledTime = null){
    if(!started) return;
    activeNarrationsCount++;
    const triggerTime = scheduledTime !== null ? Math.max(audioCtx.currentTime, scheduledTime) : audioCtx.currentTime;
    
    // Regra da Kult FM (Abaixa menos o som da música)
    const isKult = activeRadioKey.includes('kult');
    const DUCK_TARGET = isKult ? 0.5 : 0.4;
    
    musicGain.gain.setTargetAtTime(DUCK_TARGET, triggerTime, DUCK_DOWN_TIME);
}

function onNarrationEnd(scheduledTime = null){
    if(!started) return;
    activeNarrationsCount = Math.max(0, activeNarrationsCount-1);
    if(activeNarrationsCount === 0){
        const triggerTime = scheduledTime !== null ? Math.max(audioCtx.currentTime, scheduledTime) : audioCtx.currentTime;
        musicGain.gain.setTargetAtTime(1.0, triggerTime, DUCK_UP_TIME);
    }
}

/* =================== O Segurança (Anti-Seek Guard) =================== */
streamAudioElement.addEventListener('seeked', () => {
    if (isSystemSeeking) { isSystemSeeking = false; return; }
    if (currentStreamEvent && !streamAudioElement.src.startsWith('data:')) {
        const correctOffset = (getCurrentMonthMs() - currentStreamEvent.startMs) / 1000;
        isSystemSeeking = true;
        streamAudioElement.currentTime = Math.max(0, correctOffset);
    }
});

/* =================== Desbloqueador iOS =================== */
function unlockAudioForiOS() {
    if (iosUnlocked) return;
    if (audioCtx.state !== 'running') audioCtx.resume().catch(()=>{});
    if (!streamAudioElement.src.startsWith('data:')) streamAudioElement.src = silentTrack;
    streamAudioElement.muted = false; 
    streamAudioElement.loop = true;
    streamAudioElement.play().then(() => { 
        iosUnlocked = true; 
        log("🍏 iOS Audio Desbloqueado com sucesso (Widget Ativo)!");
    }).catch(e => {});
    ['touchstart', 'touchend', 'click'].forEach(evt => document.removeEventListener(evt, unlockAudioForiOS));
}
['touchstart', 'touchend', 'click'].forEach(evt => document.addEventListener(evt, unlockAudioForiOS, { once: true }));

/* =================== Data Loaders =================== */
async function loadTimeline(expansionKey, radioKey) {
    let targetExpansion = expansionKey;
    const radioData = window.STATION_DATA?.PROGRAMACOES?.[expansionKey]?.[radioKey];
    if (radioData && radioData.aliasFrom) targetExpansion = radioData.aliasFrom;

    const fileName = radioKey.replace('radio_', 'prog_') + '.json';
    const url = `programacoes_mensais/${targetExpansion}/${fileName}`;
    
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        currentTimeline = await resp.json();
    } catch(e) {
        console.error("Erro ao carregar timeline:", e.message);
        currentTimeline = [];
    }
}

async function getAudioBuffer(filePath, limparDaMemoria = false) {
    if (!filePath) return null;
    if (audioBufferCache.has(filePath)) {
        const buf = audioBufferCache.get(filePath);
        if (limparDaMemoria) audioBufferCache.delete(filePath);
        return buf;
    }
    try {
        const resp = await fetch(filePath);
        if (!resp.ok) return null;
        const ab = await resp.arrayBuffer();
        const buf = await audioCtx.decodeAudioData(ab);
        audioBufferCache.set(filePath, buf);
        if (audioBufferCache.size > 20) audioBufferCache.delete(audioBufferCache.keys().next().value);
        return buf;
    } catch (e) { return null; }
}

/* =================== Execução Fina (O Coração) =================== */
async function preloadEvent(ev) {
    if (ev.path && ev.type !== 'stream') await getAudioBuffer(ev.path);
}

async function executeEvent(ev, mySession, forcedSyncTime = null, forcedNowMs = null) {
    if (!started || currentSessionId !== mySession) return;

    // --- LÓGICA DE STREAMING (HLS & NATIVO) ---
    if (ev.type === 'stream') {
        currentStreamEvent = ev;
        const offset = (getCurrentMonthMs() - ev.startMs) / 1000;
        isSystemSeeking = true;

        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }

        if (ev.path.endsWith('.m3u8') && window.Hls && window.Hls.isSupported()) {
            log(`🌐 Iniciando HLS Stream: ${ev.path}`);
            hlsInstance = new window.Hls({ startPosition: Math.max(0, offset) });
            hlsInstance.loadSource(ev.path);
            hlsInstance.attachMedia(streamAudioElement);

            hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, function() {
                streamAudioElement.muted = false;
                streamAudioElement.loop = false;
                streamAudioElement.play()
                    .then(() => { window.dispatchEvent(new CustomEvent('radio-ready')); }) 
                    .catch(e => log('Autoplay HLS bloqueado:', e.message));
            });
        } else {
            log(`🍏 Iniciando Stream Nativo: ${ev.path}`);
            streamAudioElement.src = ev.path;
            streamAudioElement.muted = false; 
            streamAudioElement.loop = false;
            streamAudioElement.currentTime = Math.max(0, offset);
            streamAudioElement.play()
                .then(() => { window.dispatchEvent(new CustomEvent('radio-ready')); }) 
                .catch(e => log('Autoplay stream bloqueado:', e.message));
        }

        updateChromeMediaHub(activeRadioKey.replace('radio_', '').toUpperCase().replace(/_/g, ' '));
        return;
    }

    // --- ATIVAÇÃO DO SILENT TRACK SE NADA ESTIVER NO STREAM ---
    if (!currentStreamEvent) {
        if (streamAudioElement.paused || !streamAudioElement.src.startsWith('data:')) {
            streamAudioElement.src = silentTrack; 
            streamAudioElement.muted = false; 
            streamAudioElement.loop = true;
            streamAudioElement.play().catch(e => {});
            updateChromeMediaHub(activeRadioKey.replace('radio_', '').toUpperCase().replace(/_/g, ' '));
        }
    }

    // --- LÓGICA PADRÃO (OGG LOCAL) ---
    if (!ev.path) return;
    const buf = await getAudioBuffer(ev.path, true);
    if (!buf || !started || currentSessionId !== mySession) return;

    if (audioCtx.state !== 'running') audioCtx.resume().catch(()=>{});
    
    if (activeNarrationsCount === 0) musicGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.01);
    narrationGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.01);

    const nowMs = forcedNowMs !== null ? forcedNowMs : getCurrentMonthMs();
    const seekOffsetSec = (nowMs - ev.startMs) / 1000;
    
    let startOffset = 0;
    let scheduledTime = audioCtx.currentTime;

    if (forcedSyncTime !== null) {
        scheduledTime = forcedSyncTime;
        startOffset = Math.max(0, seekOffsetSec);
    } else {
        if (seekOffsetSec < 0) scheduledTime = audioCtx.currentTime + Math.abs(seekOffsetSec);
        else startOffset = seekOffsetSec;
    }

    const s = audioCtx.createBufferSource();
    s.buffer = buf;
    activeAudioSources.push(s);

    if (ev.type === 'voiceover') {
        s.connect(narrationGain);
        onNarrationStart(scheduledTime); 
        s.onended = () => { onNarrationEnd(audioCtx.currentTime); activeAudioSources = activeAudioSources.filter(x => x !== s); };
    } else if (ev.type === 'music') {
        s.connect(musicGain);
        s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    } else {
        s.connect(narrationGain);
        s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    }

    s.start(scheduledTime, startOffset);
    
    // AVISA O INDEX QUE O ÁUDIO COMEÇOU PARA DESLIGAR A ESTÁTICA
    window.dispatchEvent(new CustomEvent('radio-ready')); 
    
    if (startOffset > 0) log(`🔄 HOT-SWAP: ${ev.path} (Avançado: ${startOffset.toFixed(2)}s)`);
    else log(`▶️ Agendado: ${ev.path}`);
}

async function radioLoop(mySession) {
    log(`A sintonizar Rádio (${activeExpansionKey} -> ${activeRadioKey})...`);
    await loadTimeline(activeExpansionKey, activeRadioKey);
    if (currentTimeline.length === 0) return;

    let eventIndex = 0;
    let nowMs = getCurrentMonthMs();
    const hotSwapEvents = [];
    
    for (let i = 0; i < currentTimeline.length; i++) {
        const ev = currentTimeline[i];
        if (ev.startMs <= nowMs && ev.endMs > nowMs) hotSwapEvents.push(ev); 
        else if (ev.startMs > nowMs && ev.startMs - nowMs <= 2000) if (ev.type !== 'stream') hotSwapEvents.push(ev);
        if (ev.startMs > nowMs + 2000 && eventIndex === 0) eventIndex = i;
    }
    if (eventIndex === 0) eventIndex = currentTimeline.findIndex(ev => ev.startMs > nowMs + 2000);

    if (hotSwapEvents.length > 0) {
        await Promise.all(hotSwapEvents.map(ev => preloadEvent(ev)));
        nowMs = getCurrentMonthMs();
        const syncAudioContextTime = audioCtx.currentTime + 0.05; 
        for (const ev of hotSwapEvents) {
            if (ev.startMs <= nowMs) executeEvent(ev, mySession, syncAudioContextTime, nowMs);
            else executeEvent(ev, mySession); 
        }
    }

    async function radarTick() {
        if (!started || currentSessionId !== mySession) return;
        if (audioCtx.state !== 'running') audioCtx.resume().catch(()=>{});
        nowMs = getCurrentMonthMs();

        // Limpeza de HLS (Guilhotina)
        if (currentStreamEvent && currentStreamEvent.endMs <= nowMs) {
            const nextEvent = currentTimeline.find(ev => ev.type === 'stream' && ev.startMs <= nowMs && ev.endMs > nowMs);
            if (!nextEvent) {
                log(`🛑 Guilhotina: Encerrando stream.`);
                streamAudioElement.pause();
                if (hlsInstance) {
                    hlsInstance.destroy();
                    hlsInstance = null;
                }
            }
            currentStreamEvent = null;
        }

        for (let i = eventIndex; i < currentTimeline.length; i++) {
            const ev = currentTimeline[i];
            if (ev.startMs - nowMs <= 30000) {
                if (!preloadedEvents.has(i)) {
                    preloadedEvents.set(i, true);
                    preloadEvent(ev).catch(e => {}); 
                }
            } else break;
        }

        while (eventIndex < currentTimeline.length) {
            const ev = currentTimeline[eventIndex];
            const timeUntilStart = ev.startMs - nowMs;
            
            if (timeUntilStart > 15000) break;
            if (ev.type === 'stream' && timeUntilStart > 0) break; 
            
            if (ev.endMs > nowMs) executeEvent(ev, mySession);
            preloadedEvents.delete(eventIndex); 
            eventIndex++;
        }

        if (eventIndex >= currentTimeline.length) { eventIndex = 0; preloadedEvents.clear(); }
    }

    streamAudioElement.addEventListener('timeupdate', radarTick);

    const pcInterval = setInterval(() => {
        if (!started || currentSessionId !== mySession) { 
            clearInterval(pcInterval); 
            streamAudioElement.removeEventListener('timeupdate', radarTick);
            return; 
        }
        radarTick();
    }, 250);
}

// ==== CONTROLE DE ESTADO GLOBAL ====
async function startRadio(expansionKey, radioKey){
    if(started && activeExpansionKey === expansionKey && activeRadioKey === radioKey) return;
    
    stopRadio(); 
    
    activeExpansionKey = expansionKey;
    activeRadioKey = radioKey;
    started = true;
    currentSessionId++; 
    const mySession = currentSessionId;
    
    unlockAudioForiOS();
    if(audioCtx.state !== 'running') audioCtx.resume().catch(()=>{});
    
    radioLoop(mySession).catch(e => {
        if(currentSessionId === mySession) started = false;
    });
}

function stopRadio() {
    log('A parar rádio...');
    started = false; 

    activeAudioSources.forEach(src => { try { src.stop(); } catch(e) {} });
    activeAudioSources = [];
    preloadedEvents.clear();

    streamAudioElement.pause();
    if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
    }
    if (!streamAudioElement.src.startsWith('data:')) {
        streamAudioElement.src = silentTrack; 
    }
    currentStreamEvent = null;

    const now = audioCtx.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(1.0, now);
    activeNarrationsCount = 0;
}

window.__RADIO = window.__RADIO || {};
window.__RADIO.startRadio = startRadio;
window.__RADIO.stopRadio = stopRadio;