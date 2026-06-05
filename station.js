// station.js — Rádios do GTA V (Estrutura Unificada e Otimizada)
// Requer: geral.js carregado antes (para G.adv e G.news globais, se aplicável).

(function() {
  const pad = (n, len=2) => String(n).padStart(len, '0');
  const G = window.GERAL_DATA || { adv: { gtav: [] }, news: { gtav: [] } }; 

  // Helpers otimizados para gerar arrays de caminhos em .ogg
  const genList = (base, folder, names) => names.map(n => `${base}/${folder}/${n}.ogg`);
  const range = (start, end) => Array.from({ length: (end - start + 1) }, (_, i) => start + i);
  const padArr = (prefix, start, end) => range(start, end).map(i => `${prefix}_${pad(i, 2)}`);

  /* ================================================================================= */
  /* ===================== 1. LOS SANTOS ROCK RADIO (CLASS ROCK) ===================== */
  /* ================================================================================= */
  
  const bpClassRock = 'RADIO_01_CLASS_ROCK';
  
  const obj_class_rock = {
    chanceLocucao: 0.9,
    musicasList: [
      { id: 'all_the_things_she_said', name: 'ALL_THE_THINGS_SHE_SAID', arquivo: `${bpClassRock}/musicas/ALL_THE_THINGS_SHE_SAID.ogg`, introStart: 250879, introEnd: 1699792, finalStart: 10706944, finalEnd: 11536896 },
      { id: 'baker_street', name: 'BAKER_STREET', arquivo: `${bpClassRock}/musicas/BAKER_STREET.ogg`, introStart: 1375493, introEnd: 2458629, finalStart: 14612480, finalEnd: 15420416 },
      { id: 'big_log', name: 'BIG_LOG', arquivo: `${bpClassRock}/musicas/BIG_LOG.ogg`, introStart: 1359872, introEnd: 2512896, finalStart: 8650752, finalEnd: 9685504 },
      { id: 'black_velvet', name: 'BLACK_VELVET', arquivo: `${bpClassRock}/musicas/BLACK_VELVET.ogg`, introStart: 250120, introEnd: 988160, finalStart: 10655744, finalEnd: 12553216 },
      { id: 'burning_heart', name: 'BURNING_HEART', arquivo: `${bpClassRock}/musicas/BURNING_HEART.ogg`, introStart: 254272, introEnd: 864576, finalStart: 8990464, finalEnd: 10237952 },
      { id: 'carry_on_my_wayward_sun', name: 'CARRY_ON_MY_WAYWARD_SUN', arquivo: `${bpClassRock}/musicas/CARRY_ON_MY_WAYWARD_SUN.ogg`, introStart: 743396, introEnd: 1294336, finalStart: 13821696, finalEnd: 14845440 },
      { id: 'cats_in_the_cradle', name: 'CATS_IN_THE_CRADLE', arquivo: `${bpClassRock}/musicas/CATS_IN_THE_CRADLE.ogg`, introStart: 237568, introEnd: 565248, finalStart: 9378560, finalEnd: 10292864 },
      { id: 'circle_in_the_sand', name: 'CIRCLE_IN_THE_SAND', arquivo: `${bpClassRock}/musicas/CIRCLE_IN_THE_SAND.ogg`, introStart: 224012, introEnd: 1043212, finalStart: 9497356, finalEnd: 10447907 },
      { id: 'coming_on_strong', name: 'COMING_ON_STRONG', arquivo: `${bpClassRock}/musicas/COMING_ON_STRONG.ogg`, introStart: 331264, introEnd: 977600, finalStart: 8585532, finalEnd: 9860343 },
      { id: 'danger_zone', name: 'DANGER_ZONE', arquivo: `${bpClassRock}/musicas/DANGER_ZONE.ogg`, introStart: 213524, introEnd: 752480, finalStart: 8575840, finalEnd: 9737359 },
      { id: 'dirty_white_boy', name: 'DIRTY_WHITE_BOY', arquivo: `${bpClassRock}/musicas/DIRTY_WHITE_BOY.ogg`, introStart: 334336, introEnd: 1013376, finalStart: 8484802, finalEnd: 9631232 },
      { id: 'fortunate_son', name: 'FORTUNATE_SON', arquivo: `${bpClassRock}/musicas/FORTUNATE_SON.ogg`, introStart: 237648, introEnd: 810064, finalStart: 5005312, finalEnd: 5958144 },
      { id: 'gimme_all_your_lovin', name: 'GIMME_ALL_YOUR_LOVIN', arquivo: `${bpClassRock}/musicas/GIMME_ALL_YOUR_LOVIN.ogg`, introStart: 265152, introEnd: 1108928, finalStart: 7552000, finalEnd: 8561152 },
      { id: 'heartbeat', name: 'HEARTBEAT', arquivo: `${bpClassRock}/musicas/HEARTBEAT.ogg`, introStart: 378880, introEnd: 861696, finalStart: 7831552, finalEnd: 9260416 },
      { id: 'higher_love', name: 'HIGHER_LOVE', arquivo: `${bpClassRock}/musicas/HIGHER_LOVE.ogg`, finalStart: 11403264, finalEnd: 12459520 },
      { id: 'hollywood_nights', name: 'HOLLYWOOD_NIGHTS', arquivo: `${bpClassRock}/musicas/HOLLYWOOD_NIGHTS.ogg`, introStart: 516096, introEnd: 1249792, finalStart: 9228658, finalEnd: 10237952 },
      { id: 'i_cant_wait', name: 'I_CANT_WAIT', arquivo: `${bpClassRock}/musicas/I_CANT_WAIT.ogg`, introStart: 837632, introEnd: 1549216, finalStart: 10679200, finalEnd: 11561248 },
      { id: 'i_dont_care_anymore', name: 'I_DONT_CARE_ANYMORE', arquivo: `${bpClassRock}/musicas/I_DONT_CARE_ANYMORE.ogg`, introStart: 626688, introEnd: 1453824, finalStart: 12763136, finalEnd: 13968384 },
      { id: 'i_wouldnt_want_to_be', name: 'I_WOULDNT_WANT_TO_BE', arquivo: `${bpClassRock}/musicas/I_WOULDNT_WANT_TO_BE.ogg`, introStart: 1114112, introEnd: 2253312, finalStart: 6338752, finalEnd: 8605696 },
      { id: 'if_you_leave_me_now', name: 'IF_YOU_LEAVE_ME_NOW', arquivo: `${bpClassRock}/musicas/IF_YOU_LEAVE_ME_NOW.ogg`, introStart: 168960, introEnd: 438784, finalStart: 8550400, finalEnd: 9272320 },
      { id: 'im_free', name: 'IM_FREE', arquivo: `${bpClassRock}/musicas/IM_FREE.ogg`, introStart: 504800, introEnd: 916128, finalStart: 8576416, finalEnd: 9265568 },
      { id: 'lonely_is_the_night', name: 'LONELY_IS_THE_NIGHT', arquivo: `${bpClassRock}/musicas/LONELY_IS_THE_NIGHT.ogg`, introStart: 276271, introEnd: 644864, finalStart: 9213224, finalEnd: 10259040 },
      { id: 'mississippi_queen', name: 'MISSISSIPPI_QUEEN', arquivo: `${bpClassRock}/musicas/MISSISSIPPI_QUEEN.ogg`, introStart: 259216, introEnd: 795792, finalStart: 5821419, finalEnd: 6718608 },
      { id: 'night_moves', name: 'NIGHT_MOVES', arquivo: `${bpClassRock}/musicas/NIGHT_MOVES.ogg`, introStart: 342016, introEnd: 798720, finalStart: 9445376, finalEnd: 11402240 },
      { id: 'ogdens_nut_gone_flake', name: 'OGDENS_NUT_GONE_FLAKE', arquivo: `${bpClassRock}/musicas/OGDENS_NUT_GONE_FLAKE.ogg`, introStart: 1515520, introEnd: 2539008, finalStart: 5377278, finalEnd: 6280192 },
      { id: 'peace_of_mind', name: 'PEACE_OF_MIND', arquivo: `${bpClassRock}/musicas/PEACE_OF_MIND.ogg`, introStart: 231632, introEnd: 1071312, finalStart: 11753680, finalEnd: 12542206 },
      { id: 'photograph', name: 'PHOTOGRAPH', arquivo: `${bpClassRock}/musicas/PHOTOGRAPH.ogg`, introStart: 277504, introEnd: 686080, finalStart: 8680144, finalEnd: 10046720 },
      { id: 'radio_ga_ga', name: 'RADIO_GA_GA', arquivo: `${bpClassRock}/musicas/RADIO_GA_GA.ogg`, introStart: 1490944, introEnd: 2642432, finalStart: 11321344, finalEnd: 12807680 },
      { id: 'rain', name: 'RAIN', arquivo: `${bpClassRock}/musicas/RAIN.ogg`, introStart: 258010, introEnd: 712704, finalStart: 8208384, finalEnd: 10125312 },
      { id: 'rockin_me', name: 'ROCKIN_ME', arquivo: `${bpClassRock}/musicas/ROCKIN_ME.ogg`, introStart: 450560, introEnd: 1291264, finalStart: 6389760, finalEnd: 7690240 },
      { id: 'roundabout', name: 'ROUNDABOUT', arquivo: `${bpClassRock}/musicas/ROUNDABOUT.ogg`, introStart: 269312, introEnd: 2055168, finalStart: 22682624, finalEnd: 24058880 },
      { id: 'saturday_nights_alright', name: 'SATURDAY_NIGHTS_ALRIGHT', arquivo: `${bpClassRock}/musicas/SATURDAY_NIGHTS_ALRIGHT.ogg`, introStart: 286720, introEnd: 633600, finalStart: 9560339, finalEnd: 10156032 },
      { id: 'shadows_of_the_night', name: 'SHADOWS_OF_THE_NIGHT', arquivo: `${bpClassRock}/musicas/SHADOWS_OF_THE_NIGHT.ogg`, introStart: 787264, introEnd: 1536832, finalStart: 8945152, finalEnd: 9900544 },
      { id: 'the_breakup_song', name: 'THE_BREAKUP_SONG', arquivo: `${bpClassRock}/musicas/THE_BREAKUP_SONG.ogg`, introStart: 262144, introEnd: 627957, finalStart: 6111232, finalEnd: 6981632 },
      { id: 'thirty_days_in_the_hole', name: 'THIRTY_DAYS_IN_THE_HOLE', arquivo: `${bpClassRock}/musicas/THIRTY_DAYS_IN_THE_HOLE.ogg`, introStart: 245452, introEnd: 574511, finalStart: 8102144, finalEnd: 8963328 },
      { id: 'too_late_for_goodbyes', name: 'TOO_LATE_FOR_GOODBYES', arquivo: `${bpClassRock}/musicas/TOO_LATE_FOR_GOODBYES.ogg`, introStart: 638976, introEnd: 1512192, finalStart: 7901184, finalEnd: 8647680 },
      { id: 'we_built_this_city', name: 'WE_BUILT_THIS_CITY', arquivo: `${bpClassRock}/musicas/WE_BUILT_THIS_CITY.ogg`, introStart: 810496, introEnd: 1379090, finalStart: 11787264, finalEnd: 13023232 },
      { id: 'what_a_fool_believes', name: 'WHAT_A_FOOL_BELIEVES', arquivo: `${bpClassRock}/musicas/WHAT_A_FOOL_BELIEVES.ogg`, introStart: 358400, introEnd: 737024, finalStart: 8007680, finalEnd: 8962048 }
    ],
    grupoID: genList(bpClassRock, 'narracoes', padArr('ID', 1, 13)),
    grupoDJSolo: genList(bpClassRock, 'narracoes', padArr('MONO_SOLO', 1, 25)),
    narracoesGeneral: genList(bpClassRock, 'narracoes', padArr('GENERAL', 1, 43)),
    timePools: {
      morning: genList(bpClassRock, 'narracoes', padArr('MORNING', 1, 7)),
      evening: genList(bpClassRock, 'narracoes', padArr('EVENING', 1, 6))
    },
    endto: {
      toad: genList(bpClassRock, 'narracoes', padArr('TO_AD', 1, 7)),
      tonews: genList(bpClassRock, 'narracoes', padArr('TO_NEWS', 1, 6))
    },
    grupoAdv: G.adv.gtav || [],
    grupoWeazelNews: G.news.gtav || [],
    musicIntroNarrations: {
      'ALL_THE_THINGS_SHE_SAID': genList(bpClassRock, 'narracoes', ['ALL_THE_THINGS_SHE_SAID_01', 'ALL_THE_THINGS_SHE_SAID_02']),
      'BAKER_STREET': genList(bpClassRock, 'narracoes', ['BAKER_STREET_01', 'BAKER_STREET_02']),
      'BIG_LOG': genList(bpClassRock, 'narracoes', ['BIG_LOG_01', 'BIG_LOG_02']),
      'BLACK_VELVET': genList(bpClassRock, 'narracoes', ['BLACK_VELVET_01', 'BLACK_VELVET_02']),
      'BURNING_HEART': genList(bpClassRock, 'narracoes', ['BURNING_HEART_01', 'BURNING_HEART_02']),
      'CARRY_ON_MY_WAYWARD_SUN': genList(bpClassRock, 'narracoes', ['CARRY_ON_MY_WAYWARD_SUN_01', 'CARRY_ON_MY_WAYWARD_SUN_02']),
      'CATS_IN_THE_CRADLE': genList(bpClassRock, 'narracoes', ['CATS_IN_THE_CRADLE_01']),
      'COMING_ON_STRONG': genList(bpClassRock, 'narracoes', ['COMING_ON_STRONG_01', 'COMING_ON_STRONG_02']),
      'DIRTY_WHITE_BOY': genList(bpClassRock, 'narracoes', ['DIRTY_WHITE_BOY_01', 'DIRTY_WHITE_BOY_02']),
      'FORTUNATE_SON': genList(bpClassRock, 'narracoes', ['FORTUNATE_SON_01', 'FORTUNATE_SON_02']),
      'GIMME_ALL_YOUR_LOVIN': genList(bpClassRock, 'narracoes', ['GIMME_ALL_YOUR_LOVIN_01', 'GIMME_ALL_YOUR_LOVIN_02']),
      'HEARTBEAT': genList(bpClassRock, 'narracoes', ['HEARTBEAT_01', 'HEARTBEAT_02']),
      'HOLLYWOOD_NIGHTS': genList(bpClassRock, 'narracoes', ['HOLLYWOOD_NIGHTS_01', 'HOLLYWOOD_NIGHTS_02']),
      'I_CANT_WAIT': genList(bpClassRock, 'narracoes', ['I_CANT_WAIT_01', 'I_CANT_WAIT_02']),
      'I_WOULDNT_WANT_TO_BE': genList(bpClassRock, 'narracoes', ['I_WOULDNT_WANT_TO_BE_01', 'I_WOULDNT_WANT_TO_BE_02']),
      'IF_YOU_LEAVE_ME_NOW': genList(bpClassRock, 'narracoes', ['IF_YOU_LEAVE_ME_NOW_01', 'IF_YOU_LEAVE_ME_NOW_02']),
      'IM_FREE': genList(bpClassRock, 'narracoes', ['IM_FREE_01', 'IM_FREE_02']),
      'LONELY_IS_THE_NIGHT': genList(bpClassRock, 'narracoes', ['LONELY_IS_THE_NIGHT_01', 'LONELY_IS_THE_NIGHT_02']),
      'MISSISSIPPI_QUEEN': genList(bpClassRock, 'narracoes', ['MISSISSIPPI_QUEEN_01', 'MISSISSIPPI_QUEEN_02']),
      'NIGHT_MOVES': genList(bpClassRock, 'narracoes', ['NIGHT_MOVES_01', 'NIGHT_MOVES_02']),
      'OGDENS_NUT_GONE_FLAKE': genList(bpClassRock, 'narracoes', ['OGDENS_NUT_GONE_FLAKE_01', 'OGDENS_NUT_GONE_FLAKE_02']),
      'PEACE_OF_MIND': genList(bpClassRock, 'narracoes', ['PEACE_OF_MIND_01', 'PEACE_OF_MIND_02']),
      'PHOTOGRAPH': genList(bpClassRock, 'narracoes', ['PHOTOGRAPH_01', 'PHOTOGRAPH_02']),
      'RADIO_GA_GA': genList(bpClassRock, 'narracoes', ['RADIO_GA_GA_01']),
      'RAIN': genList(bpClassRock, 'narracoes', ['RAIN_01', 'RAIN_02']),
      'ROUNDABOUT': genList(bpClassRock, 'narracoes', ['ROUNDABOUT_01', 'ROUNDABOUT_02']),
      'SATURDAY_NIGHTS_ALRIGHT': genList(bpClassRock, 'narracoes', ['SATURDAY_NIGHTS_ALRIGHT_01', 'SATURDAY_NIGHTS_ALRIGHT_02']),
      'SHADOWS_OF_THE_NIGHT': genList(bpClassRock, 'narracoes', ['SHADOWS_OF_THE_NIGHT_01', 'SHADOWS_OF_THE_NIGHT_02', 'SHADOWS_OF_THE_NIGHT_03']),
      'THE_BREAKUP_SONG': genList(bpClassRock, 'narracoes', ['THE_BREAKUP_SONG_01', 'THE_BREAKUP_SONG_02']),
      'THIRTY_DAYS_IN_THE_HOLE': genList(bpClassRock, 'narracoes', ['THIRTY_DAYS_IN_THE_HOLE_01', 'THIRTY_DAYS_IN_THE_HOLE_02']),
      'TOO_LATE_FOR_GOODBYES': genList(bpClassRock, 'narracoes', ['TOO_LATE_FOR_GOODBYES_01', 'TOO_LATE_FOR_GOODBYES_02']),
      'WE_BUILT_THIS_CITY': genList(bpClassRock, 'narracoes', ['WE_BUILT_THIS_CITY_01', 'WE_BUILT_THIS_CITY_02']),
      'WHAT_A_FOOL_BELIEVES': genList(bpClassRock, 'narracoes', ['WHAT_A_FOOL_BELIEVES_01', 'WHAT_A_FOOL_BELIEVES_02'])
    }
  };

  /* ================================================================================= */
  /* =========================== 2. RADIO MIRROR PARK (SILVERLAKE) =================== */
  /* ================================================================================= */

  const bpSilverlake = 'RADIO_16_SILVERLAKE';
  
  const obj_silverlake = {
    chanceLocucao: 0.9,
    musicasList: [
      { id: 'always', name: 'ALWAYS', arquivo: `${bpSilverlake}/musicas/ALWAYS.ogg`, introStart: 807008, introEnd: 1523808, finalStart: 8671232, finalEnd: 9777152 },
      { id: 'boogie_in_zero_gravity', name: 'BOOGIE_IN_ZERO_GRAVITY', arquivo: `${bpSilverlake}/musicas/BOOGIE_IN_ZERO_GRAVITY.ogg`, introStart: 247856, introEnd: 741376, finalStart: 7970816, finalEnd: 10113536 },
      { id: 'change_of_coast', name: 'CHANGE_OF_COAST', arquivo: `${bpSilverlake}/musicas/CHANGE_OF_COAST.ogg`, finalStart: 7163904, finalEnd: 8303936 },
      { id: 'colours', name: 'COLOURS', arquivo: `${bpSilverlake}/musicas/COLOURS.ogg`, introStart: 250178, introEnd: 794624, finalStart: 7598080, finalEnd: 9236480 },
      { id: 'crystalfilm', name: 'CRYSTALFILM', arquivo: `${bpSilverlake}/musicas/CRYSTALFILM.ogg`, introStart: 244611, introEnd: 641923, finalStart: 9728000, finalEnd: 10845184 },
      { id: 'dark_matter', name: 'DARK_MATTER', arquivo: `${bpSilverlake}/musicas/DARK_MATTER.ogg`, introStart: 242650, introEnd: 844800, finalStart: 7999488, finalEnd: 9060352 },
      { id: 'do_you_believe', name: 'DO_YOU_BELIEVE', arquivo: `${bpSilverlake}/musicas/DO_YOU_BELIEVE.ogg`, introStart: 696320, introEnd: 1992704, finalStart: 7987200, finalEnd: 9939968 },
      { id: 'dont_come_close', name: 'DONT_COME_CLOSE', arquivo: `${bpSilverlake}/musicas/DONT_COME_CLOSE.ogg`, finalStart: 7315456, finalEnd: 8378368 },
      { id: 'feel_the_same', name: 'FEEL_THE_SAME', arquivo: `${bpSilverlake}/musicas/FEEL_THE_SAME.ogg`, introStart: 256482, introEnd: 1426432, finalStart: 8237056, finalEnd: 9319424 },
      { id: 'flutes', name: 'FLUTES', arquivo: `${bpSilverlake}/musicas/FLUTES.ogg`, introStart: 249856, introEnd: 1196032, finalStart: 10186752, finalEnd: 11188224 },
      { id: 'forget', name: 'FORGET', arquivo: `${bpSilverlake}/musicas/FORGET.ogg`, introStart: 258048, introEnd: 1110016, finalStart: 9039616, finalEnd: 10320896 },
      { id: 'from_nowhere', name: 'FROM_NOWHERE', arquivo: `${bpSilverlake}/musicas/FROM_NOWHERE.ogg`, introStart: 311296, introEnd: 1075200, finalStart: 9027584, finalEnd: 10075136 },
      { id: 'heart_in_the_pipes', name: 'HEART_IN_THE_PIPES', arquivo: `${bpSilverlake}/musicas/HEART_IN_THE_PIPES.ogg`, introStart: 517821, introEnd: 1084544, finalStart: 8904832, finalEnd: 10298368 },
      { id: 'heartbreak', name: 'HEARTBREAK', arquivo: `${bpSilverlake}/musicas/HEARTBREAK.ogg`, introStart: 264252, introEnd: 780348, finalStart: 9153018, finalEnd: 10205244 },
      { id: 'high_pressure', name: 'HIGH_PRESSURE', arquivo: `${bpSilverlake}/musicas/HIGH_PRESSURE.ogg`, introStart: 256419, introEnd: 1513984, finalStart: 7163904, finalEnd: 8612869 },
      { id: 'hold_on_holy_ghost', name: 'HOLD_ON_HOLY_GHOST', arquivo: `${bpSilverlake}/musicas/HOLD_ON_HOLY_GHOST.ogg`, introStart: 241664, introEnd: 2358824, finalStart: 15363584, finalEnd: 16437248 },
      { id: 'in_real_life', name: 'IN_REAL_LIFE', arquivo: `${bpSilverlake}/musicas/IN_REAL_LIFE.ogg`, introStart: 233830, introEnd: 716800, finalStart: 8577024, finalEnd: 9569717 },
      { id: 'jasmine', name: 'JASMINE', arquivo: `${bpSilverlake}/musicas/JASMINE.ogg`, introStart: 255715, introEnd: 1289216, finalStart: 8884224, finalEnd: 9996288 },
      { id: 'little_white_lie', name: 'LITTLE_WHITE_LIE', arquivo: `${bpSilverlake}/musicas/LITTLE_WHITE_LIE.ogg`, finalStart: 6449152, finalEnd: 7852032 },
      { id: 'living_in_america', name: 'LIVING_IN_AMERICA', arquivo: `${bpSilverlake}/musicas/LIVING_IN_AMERICA.ogg`, introStart: 243712, introEnd: 655360, finalStart: 7434240, finalEnd: 8550400 },
      { id: 'lucky_boy', name: 'LUCKY_BOY', arquivo: `${bpSilverlake}/musicas/LUCKY_BOY.ogg`, introStart: 720768, introEnd: 1556480, finalStart: 8329216, finalEnd: 9457664 },
      { id: 'mesmerized', name: 'MESMERIZED', arquivo: `${bpSilverlake}/musicas/MESMERIZED.ogg`, introStart: 245760, introEnd: 762904, finalStart: 9000448, finalEnd: 10037248 },
      { id: 'new_beat', name: 'NEW_BEAT', arquivo: `${bpSilverlake}/musicas/NEW_BEAT.ogg`, introStart: 241664, introEnd: 1994752, finalStart: 10249728, finalEnd: 11254272 },
      { id: 'nowhere_to_go', name: 'NOWHERE_TO_go', arquivo: `${bpSilverlake}/musicas/NOWHERE_TO_GO.ogg`, introStart: 256152, introEnd: 688128, finalStart: 8003584, finalEnd: 9518080 },
      { id: 'o_n_e', name: 'O_N_E', arquivo: `${bpSilverlake}/musicas/O_N_E.ogg`, introStart: 255999, introEnd: 778240, finalStart: 11317248, finalEnd: 12245228 },
      { id: 'old_love', name: 'OLD_LOVE', arquivo: `${bpSilverlake}/musicas/OLD_LOVE.ogg`, finalStart: 9064448, finalEnd: 10450944 },
      { id: 'one_girl_one_boy', name: 'ONE_GIRL_ONE_BOY', arquivo: `${bpSilverlake}/musicas/ONE_GIRL_ONE_BOY.ogg`, introStart: 254928, introEnd: 1118208, finalStart: 7729152, finalEnd: 9238849 },
      { id: 'pharaohs', name: 'PHARAOHS', arquivo: `${bpSilverlake}/musicas/PHARAOHS.ogg`, introStart: 249163, introEnd: 1396043, finalStart: 8873984, finalEnd: 9968640 },
      { id: 'polish_girl', name: 'POLISH_GIRL', arquivo: `${bpSilverlake}/musicas/POLISH_GIRL.ogg`, introStart: 245026, introEnd: 781602, finalStart: 11304226, finalEnd: 12310765 },
      { id: 'psychic_city', name: 'PSYCHIC_CITY', arquivo: `${bpSilverlake}/musicas/PSYCHIC_CITY.ogg`, introStart: 255025, introEnd: 1275136, finalStart: 8185856, finalEnd: 9440256 },
      { id: 'shine_a_light', name: 'SHINE_A_LIGHT', arquivo: `${bpSilverlake}/musicas/SHINE_A_LIGHT.ogg`, introStart: 694784, introEnd: 1773568, finalStart: 8704256, finalEnd: 10103296 },
      { id: 'shooting_holes', name: 'SHOOTING_HOLES', arquivo: `${bpSilverlake}/musicas/SHOOTING_HOLES.ogg`, introStart: 229376, introEnd: 2011136, finalStart: 7929856, finalEnd: 8606976 },
      { id: 'sleepwalking', name: 'SLEEPWALKING', arquivo: `${bpSilverlake}/musicas/SLEEPWALKING.ogg`, introStart: 272269, introEnd: 1757184, finalStart: 7789312, finalEnd: 9001728 },
      { id: 'so_many_details', name: 'SO_MANY_DETAILS', arquivo: `${bpSilverlake}/musicas/SO_MANY_DETAILS.ogg`, introStart: 262911, introEnd: 640000, finalStart: 8888320, finalEnd: 10385408 },
      { id: 'sometimes', name: 'SOMETIMES', arquivo: `${bpSilverlake}/musicas/SOMETIMES.ogg`, introStart: 260172, introEnd: 2162688, finalStart: 8871936, finalEnd: 10143744 },
      { id: 'strangers_in_the_wind', name: 'STRANGERS_IN_THE_WIND', arquivo: `${bpSilverlake}/musicas/STRANGERS_IN_THE_WIND.ogg`, introStart: 268268, introEnd: 780268, finalStart: 11074560, finalEnd: 11944448 },
      { id: 'the_drummer', name: 'THE_DRUMMER', arquivo: `${bpSilverlake}/musicas/THE_DRUMMER.ogg`, introStart: 220160, introEnd: 548864, finalStart: 9033048, finalEnd: 9626624 },
      { id: 'the_set_up', name: 'THE_SET_UP', arquivo: `${bpSilverlake}/musicas/THE_SET_UP.ogg`, finalStart: 7981696, finalEnd: 9700992 },
      { id: 'truly_alive', name: 'TRULY_ALIVE', arquivo: `${bpSilverlake}/musicas/TRULY_ALIVE.ogg`, introStart: 258784, introEnd: 765952, finalStart: 11464704, finalEnd: 12463361 },
      { id: 'when_youre_out', name: 'WHEN_YOURE_OUT', arquivo: `${bpSilverlake}/musicas/WHEN_YOURE_OUT.ogg`, introStart: 237568, introEnd: 401933, finalStart: 11395840, finalEnd: 12422144 }
    ],
    grupoID: genList(bpSilverlake, 'narracoes', padArr('ID', 1, 13)),
    grupoDJSolo: genList(bpSilverlake, 'narracoes', padArr('MONO_SOLO', 1, 13)),
    narracoesGeneral: genList(bpSilverlake, 'narracoes', padArr('GENERAL', 1, 30).filter(n => !n.endsWith('15'))),
    timePools: {
      morning: genList(bpSilverlake, 'narracoes', padArr('MORNING', 1, 4)),
      evening: genList(bpSilverlake, 'narracoes', padArr('EVENING', 1, 4))
    },
    endto: {
      toad: genList(bpSilverlake, 'narracoes', padArr('TO_AD', 1, 5)),
      tonews: genList(bpSilverlake, 'narracoes', padArr('TO_NEWS', 1, 4))
    },
    grupoAdv: G.adv.gtav || [],
    grupoWeazelNews: G.news.gtav || [],
    musicIntroNarrations: {
      'ALWAYS': genList(bpSilverlake, 'narracoes', ['ALWAYS_01', 'ALWAYS_02']),
      'BOOGIE_IN_ZERO_GRAVITY': genList(bpSilverlake, 'narracoes', ['BOOGIE_IN_ZERO_GRAVITY_01', 'BOOGIE_IN_ZERO_GRAVITY_02']),
      'CRYSTALFILM': genList(bpSilverlake, 'narracoes', ['CRYSTALFILM_01', 'CRYSTALFILM_02']),
      'DARK_MATTER': genList(bpSilverlake, 'narracoes', ['DARK_MATTER_01', 'DARK_MATTER_02']),
      'DO_YOU_BELIEVE': genList(bpSilverlake, 'narracoes', ['DO_YOU_BELIEVE_01', 'DO_YOU_BELIEVE_02']),
      'FEEL_THE_SAME': genList(bpSilverlake, 'narracoes', ['FEEL_THE_SAME_01', 'FEEL_THE_SAME_02']),
      'FORGET': genList(bpSilverlake, 'narracoes', ['FORGET_01', 'FORGET_02']),
      'FROM_NOWHERE': genList(bpSilverlake, 'narracoes', ['FROM_NOWHERE_01', 'FROM_NOWHERE_02']),
      'HEART_IN_THE_PIPES': genList(bpSilverlake, 'narracoes', ['HEART_IN_THE_PIPES_01', 'HEART_IN_THE_PIPES_02']),
      'HOLD_ON_HOLY_GHOST': genList(bpSilverlake, 'narracoes', ['HOLD_ON_HOLY_GHOST_01', 'HOLD_ON_HOLY_GHOST_02']),
      'IN_REAL_LIFE': genList(bpSilverlake, 'narracoes', ['IN_REAL_LIFE_01', 'IN_REAL_LIFE_02']),
      'JASMINE': genList(bpSilverlake, 'narracoes', ['JASMINE_01', 'JASMINE_02']),
      'LIVING_IN_AMERICA': genList(bpSilverlake, 'narracoes', ['LIVING_IN_AMERICA_01', 'LIVING_IN_AMERICA_02']),
      'LUCKY_BOY': genList(bpSilverlake, 'narracoes', ['LUCKY_BOY_01', 'LUCKY_BOY_02']),
      'NEW_BEAT': genList(bpSilverlake, 'narracoes', ['NEW_BEAT_01', 'NEW_BEAT_02']),
      'NOWHERE_TO_GO': genList(bpSilverlake, 'narracoes', ['NOWHERE_TO_GO_01', 'NOWHERE_TO_GO_02']),
      'ONE_GIRL_ONE_BOY': genList(bpSilverlake, 'narracoes', ['ONE_GIRL_ONE_BOY_01', 'ONE_GIRL_ONE_BOY_02']),
      'PHARAOHS': genList(bpSilverlake, 'narracoes', ['PHARAOHS_01', 'PHARAOHS_02']),
      'POLISH_GIRL': genList(bpSilverlake, 'narracoes', ['POLISH_GIRL_01', 'POLISH_GIRL_02']),
      'PSYCHIC_CITY': genList(bpSilverlake, 'narracoes', ['PSYCHIC_CITY_01', 'PSYCHIC_CITY_02']),
      'SHINE_A_LIGHT': genList(bpSilverlake, 'narracoes', ['SHINE_A_LIGHT_01', 'SHINE_A_LIGHT_02']),
      'SHOOTING_HOLES': genList(bpSilverlake, 'narracoes', ['SHOOTING_HOLES_01', 'SHOOTING_HOLES_02']),
      'SLEEPWALKING': genList(bpSilverlake, 'narracoes', ['SLEEPWALKING_01', 'SLEEPWALKING_02']),
      'SO_MANY_DETAILS': genList(bpSilverlake, 'narracoes', ['SO_MANY_DETAILS_01', 'SO_MANY_DETAILS_02']),
      'SOMETIMES': genList(bpSilverlake, 'narracoes', ['SOMETIMES_01', 'SOMETIMES_02']),
      'THE_DRUMMER': genList(bpSilverlake, 'narracoes', ['THE_DRUMMER_01', 'THE_DRUMMER_02']),
      'TRULY_ALIVE': genList(bpSilverlake, 'narracoes', ['TRULY_ALIVE_01', 'TRULY_ALIVE_02']),
      'WHEN_YOURE_OUT': genList(bpSilverlake, 'narracoes', ['WHEN_YOURE_OUT_01', 'WHEN_YOURE_OUT_02'])
    }
  };

  /* ================================================================================= */
  /* ========================= 3. VINEWOOD BOULEVARD (90S ROCK) ====================== */
  /* ================================================================================= */

  const bpRock = 'RADIO_18_90S_ROCK';
  
  const obj_90s_rock = {
    chanceLocucao: 0.9,
    musicasList: [
      { id: 'answer_to_yourself', name: 'ANSWER_TO_YOURSELF', arquivo: `${bpRock}/musicas/ANSWER_TO_YOURSELF.ogg`, introStart: 258048, introEnd: 1274829, finalStart: 8233984, finalEnd: 9037312 },
      { id: 'black_grease', name: 'BLACK_GREASE', arquivo: `${bpRock}/musicas/BLACK_GREASE.ogg`, introStart: 506496, introEnd: 1882752, finalStart: 9038464, finalEnd: 10278912 },
      { id: 'california_girls', name: 'CALIFORNIA_GIRLS', arquivo: `${bpRock}/musicas/CALIFORNIA_GIRLS.ogg`, introStart: 275302, introEnd: 912512, finalStart: 5776512, finalEnd: 7320704 },
      { id: 'cocaine', name: 'COCAINE', arquivo: `${bpRock}/musicas/COCAINE.ogg`, introStart: 255662, introEnd: 1418405, finalStart: 6733824, finalEnd: 8011776 },
      { id: 'crawling_after_you', name: 'CRAWLING_AFTER_YOU', arquivo: `${bpRock}/musicas/CRAWLING_AFTER_YOU.ogg`, introStart: 254132, introEnd: 509440, finalStart: 8192000, finalEnd: 9403392 },
      { id: 'diddy_wah_diddy', name: 'DIDDY_WAH_DIDDY', arquivo: `${bpRock}/musicas/DIDDY_WAH_DIDDY.ogg`, introStart: 258048, introEnd: 592128, finalStart: 4625920, finalEnd: 5621248 },
      { id: 'fall_in_line', name: 'FALL_IN_LINE', arquivo: `${bpRock}/musicas/FALL_IN_LINE.ogg`, introStart: 242176, introEnd: 863013, finalStart: 7129088, finalEnd: 8309760 },
      { id: 'fire_doesnt_burn_itself', name: 'FIRE_DOESNT_BURN_ITSELF', arquivo: `${bpRock}/musicas/FIRE_DOESNT_BURN_ITSELF.ogg`, introStart: 278656, introEnd: 1273472, finalStart: 9617536, finalEnd: 10627200 },
      { id: 'gone_for_good', name: 'GONE_FOR_GOOD', arquivo: `${bpRock}/musicas/GONE_FOR_GOOD.ogg`, introStart: 245760, introEnd: 552960, finalStart: 3705856, finalEnd: 4708352 },
      { id: 'hysteria', name: 'HYSTERIA', arquivo: `${bpRock}/musicas/HYSTERIA.ogg`, introStart: 266903, introEnd: 1393792, finalStart: 5333120, finalEnd: 6623360 },
      { id: 'next_stop', name: 'NEXT_STOP', arquivo: `${bpRock}/musicas/NEXT_STOP.ogg`, introStart: 286472, introEnd: 1158920, finalStart: 5670009, finalEnd: 6930432 },
      { id: 'nine_is_god', name: 'NINE_IS_GOD', arquivo: `${bpRock}/musicas/NINE_IS_GOD.ogg`, finalStart: 7716864, finalEnd: 9555968 },
      { id: 'sixpack', name: 'SIXPACK', arquivo: `${bpRock}/musicas/SIXPACK.ogg`, finalStart: 5801984, finalEnd: 6922240 },
      { id: 'sleepwalker', name: 'SLEEPWALKER', arquivo: `${bpRock}/musicas/SLEEPWALKER.ogg`, introStart: 253234, introEnd: 1753088, finalStart: 8564736, finalEnd: 9850880 },
      { id: 'the_dream', name: 'THE_DREAM', arquivo: `${bpRock}/musicas/THE_DREAM.ogg`, introStart: 280452, introEnd: 763648, finalStart: 8560384, finalEnd: 9851904 },
      { id: 'this_mystic_decade', name: 'THIS_MYSTIC_DECADE', arquivo: `${bpRock}/musicas/THIS_MYSTIC_DECADE.ogg`, introStart: 243969, introEnd: 1219584, finalStart: 7122944, finalEnd: 8421774 },
      { id: 'turn_it_around', name: 'TURN_IT_AROUND', arquivo: `${bpRock}/musicas/TURN_IT_AROUND.ogg`, introStart: 259536, introEnd: 1095120, finalStart: 9929728, finalEnd: 11004416 },
      { id: 'used_blood', name: 'USED_BLOOD', arquivo: `${bpRock}/musicas/USED_BLOOD.ogg`, introStart: 249733, introEnd: 1023877, finalStart: 8056832, finalEnd: 8986624 },
      { id: 'wet_blanket', name: 'WET_BLANKET', arquivo: `${bpRock}/musicas/WET_BLANKET.ogg`, introStart: 257916, introEnd: 1298432, finalStart: 8089600, finalEnd: 9286702 },
      { id: 'who_needs_you', name: 'WHO_NEEDS_YOU', arquivo: `${bpRock}/musicas/WHO_NEEDS_YOU.ogg`, introStart: 233472, introEnd: 1036288, finalStart: 8056832, finalEnd: 8986624 }
    ],
    grupoID: genList(bpRock, 'narracoes', padArr('ID', 1, 9)),
    grupoDJSolo: genList(bpRock, 'narracoes', padArr('MONO_SOLO', 1, 16)),
    narracoesGeneral: genList(bpRock, 'narracoes', padArr('GENERAL', 1, 48)),
    timePools: {
      morning: genList(bpRock, 'narracoes', padArr('MORNING', 1, 5)),
      evening: genList(bpRock, 'narracoes', padArr('EVENING', 1, 5))
    },
    endto: {
      toad: genList(bpRock, 'narracoes', padArr('TO_AD', 1, 5)),
      tonews: genList(bpRock, 'narracoes', padArr('TO_NEWS', 1, 3))
    },
    grupoAdv: G.adv.gtav || [],
    grupoWeazelNews: G.news.gtav || [],
    musicIntroNarrations: {
      'ANSWER_TO_YOURSELF': genList(bpRock, 'narracoes', ['ANSWER_TO_YOURSELF_01', 'ANSWER_TO_YOURSELF_02']),
      'BLACK_GREASE': genList(bpRock, 'narracoes', ['BLACK_GREASE_01', 'BLACK_GREASE_02']),
      'CALIFORNIA_GIRLS': genList(bpRock, 'narracoes', ['CALIFORNIA_GIRLS_01', 'CALIFORNIA_GIRLS_02']),
      'COCAINE': genList(bpRock, 'narracoes', ['COCAINE_01', 'COCAINE_02']),
      'CRAWLING_AFTER_YOU': genList(bpRock, 'narracoes', ['CRAWLING_AFTER_YOU_01', 'CRAWLING_AFTER_YOU_02']),
      'FALL_IN_LINE': genList(bpRock, 'narracoes', ['FALL_IN_LINE_01', 'FALL_IN_LINE_02']),
      'FIRE_DOESNT_BURN_ITSELF': genList(bpRock, 'narracoes', ['FIRE_DOESNT_BURN_ITSELF_01', 'FIRE_DOESNT_BURN_ITSELF_02']),
      'GONE_FOR_GOOD': genList(bpRock, 'narracoes', ['GONE_FOR_GOOD_01', 'GONE_FOR_GOOD_02']),
      'NEXT_STOP': genList(bpRock, 'narracoes', ['NEXT_STOP_01', 'NEXT_STOP_02']),
      'SLEEPWALKER': genList(bpRock, 'narracoes', ['SLEEPWALKER_01', 'SLEEPWALKER_02']),
      'THIS_MYSTIC_DECADE': genList(bpRock, 'narracoes', ['THIS_MYSTIC_DECADE_01', 'THIS_MYSTIC_DECADE_02']),
      'TURN_IT_AROUND': genList(bpRock, 'narracoes', ['TURN_IT_AROUND_01', 'TURN_IT_AROUND_02', 'TURN_IT_AROUND_03']),
      'USED_BLOOD': genList(bpRock, 'narracoes', ['USED_BLOOD_01', 'USED_BLOOD_02']),
      'WET_BLANKET': genList(bpRock, 'narracoes', ['WET_BLANKET_01', 'WET_BLANKET_02', 'WET_BLANKET_03', 'WET_BLANKET_04']),
      'WHO_NEEDS_YOU': genList(bpRock, 'narracoes', ['WHO_NEEDS_YOU_01', 'WHO_NEEDS_YOU_02'])
    }
  };

  /* ================================================================================= */
  /* ================================= 4. KULT FM ==================================== */
  /* ================================================================================= */

  const bpKult = 'RADIO_34_DLC_HEI4_KULT';
  
  const obj_kult = {
    chanceLocucao: 0.7,
    musicasList: [
      { id: 'age_of_consent', name: 'AGE_OF_CONSENT', arquivo: `${bpKult}/musicas/AGE_OF_CONSENT.ogg`, introStart: 237689, introEnd: 1369525, finalStart: 13887493, finalEnd: 14694641 },
      { id: 'alien_crime_lord', name: 'ALIEN_CRIME_LORD', arquivo: `${bpKult}/musicas/ALIEN_CRIME_LORD.ogg`, introStart: 222720, introEnd: 1159680, finalStart: 11268000, finalEnd: 12169920 },
      { id: 'baby_i_love_you_so', name: 'BABY_I_LOVE_YOU_SO', arquivo: `${bpKult}/musicas/BABY_I_LOVE_YOU_SO.ogg`, introStart: 239847, introEnd: 1435704, finalStart: 18239556, finalEnd: 18930353 },
      { id: 'cycle', name: 'CYCLE', arquivo: `${bpKult}/musicas/CYCLE.ogg`, introStart: 229846, introEnd: 825600, finalStart: 8206672, finalEnd: 8751840 },
      { id: 'deep', name: 'DEEP', arquivo: `${bpKult}/musicas/DEEP.ogg`, introStart: 252000, introEnd: 558720, finalStart: 10115040, finalEnd: 10690080 },
      { id: 'down_on_the_street', name: 'DOWN_ON_THE_STREET', arquivo: `${bpKult}/musicas/DOWN_ON_THE_STREET.ogg`, introStart: 247200, introEnd: 714720, finalStart: 10011907, finalEnd: 10437600 },
      { id: 'drab_measure', name: 'DRAB_MEASURE', arquivo: `${bpKult}/musicas/DRAB_MEASURE.ogg`, introStart: 246720, introEnd: 1064160, finalStart: 12474720, finalEnd: 12810240 },
      { id: 'eisbar', name: 'EISBAR', arquivo: `${bpKult}/musicas/EISBAR.ogg`, introStart: 284343, introEnd: 643813, finalStart: 10970493, finalEnd: 12262874 },
      { id: 'faceless', name: 'FACELESS', arquivo: `${bpKult}/musicas/FACELESS.ogg`, introStart: 546720, introEnd: 1047840, finalStart: 5845920, finalEnd: 6364320 },
      { id: 'four_shadows', name: 'FOUR_SHADOWS', arquivo: `${bpKult}/musicas/FOUR_SHADOWS.ogg`, introStart: 193049, introEnd: 452666, finalStart: 9820760, finalEnd: 10081328 },
      { id: 'girls_and_boys', name: 'GIRLS_AND_BOYS', arquivo: `${bpKult}/musicas/GIRLS_AND_BOYS.ogg`, introStart: 247955, introEnd: 508070, finalStart: 12169368, finalEnd: 13063220 },
      { id: 'going_back_to_cali', name: 'GOING_BACK_TO_CALI', arquivo: `${bpKult}/musicas/GOING_BACK_TO_CALI.ogg`, introStart: 267264, introEnd: 1284096, finalStart: 10278912, finalEnd: 11757568 },
      { id: 'hard_to_explain', name: 'HARD_TO_EXPLAIN', arquivo: `${bpKult}/musicas/HARD_TO_EXPLAIN.ogg`, introStart: 281283, introEnd: 1534346, finalStart: 10184380, finalEnd: 10503951 },
      { id: 'human_fly', name: 'HUMAN_FLY', arquivo: `${bpKult}/musicas/HUMAN_FLY.ogg`, introStart: 678283, introEnd: 1598689, finalStart: 5871186, finalEnd: 6040439 },
      { id: 'its_yours', name: 'ITS_YOURS', arquivo: `${bpKult}/musicas/ITS_YOURS.ogg`, introStart: 229186, introEnd: 677097, finalStart: 11549640, finalEnd: 12222933 },
      { id: 'lft_me_lonely', name: 'LFT_ME_LONELY', arquivo: `${bpKult}/musicas/LFT_ME_LONELY.ogg`, introStart: 230400, introEnd: 444000, finalStart: 14496480, finalEnd: 15038880 },
      { id: 'liebe_auf_den_ersten_blick', name: 'LIEBE_AUF_DEN_ERSTEN_BLICK', arquivo: `${bpKult}/musicas/LIEBE_AUF_DEN_ERSTEN_BLICK.ogg`, finalStart: 10412608, finalEnd: 10946691 },
      { id: 'many_tears_ago', name: 'MANY_TEARS_AGO', arquivo: `${bpKult}/musicas/MANY_TEARS_AGO.ogg`, introStart: 137892, introEnd: 359470, finalStart: 4387817, finalEnd: 4917512 },
      { id: 'nightclubbing', name: 'NIGHTCLUBBING', arquivo: `${bpKult}/musicas/NIGHTCLUBBING.ogg`, introStart: 231740, introEnd: 808332, finalStart: 10824043, finalEnd: 11572220 },
      { id: 'on_the_level', name: 'ON_THE_LEVEL', arquivo: `${bpKult}/musicas/ON_THE_LEVEL.ogg`, introStart: 256062, introEnd: 1132348, finalStart: 9514159, finalEnd: 10166813 },
      { id: 'pool_song', name: 'POOL_SONG', arquivo: `${bpKult}/musicas/POOL_SONG.ogg`, introStart: 244576, introEnd: 518205, finalStart: 8638548, finalEnd: 9176346 },
      { id: 'raga_madhuvanti', name: 'RAGA_MADHUVANTI', arquivo: `${bpKult}/musicas/RAGA_MADHUVANTI.ogg`, introStart: 239847, introEnd: 1137078, finalStart: 13349686, finalEnd: 14100306 },
      { id: 'rock_and_roll', name: 'ROCK_AND_ROLL', arquivo: `${bpKult}/musicas/ROCK_AND_ROLL.ogg`, introStart: 264480, introEnd: 683520, finalStart: 12438720, finalEnd: 13184160 },
      { id: 'shes_lost_control', name: 'SHES_LOST_CONTROL', arquivo: `${bpKult}/musicas/SHES_LOST_CONTROL.ogg`, introStart: 319529, introEnd: 932910, finalStart: 10226828, finalEnd: 10710876 },
      { id: 'so_it_goes', name: 'SO_IT_GOES', arquivo: `${bpKult}/musicas/SO_IT_GOES.ogg`, finalStart: 6328681, finalEnd: 6854976 },
      { id: 'tainted_love', name: 'TAINTED_LOVE', arquivo: `${bpKult}/musicas/TAINTED_LOVE.ogg`, introStart: 133774, introEnd: 381728, finalStart: 5254340, finalEnd: 5752276 },
      { id: 'take_down_the_house', name: 'TAKE_DOWN_THE_HOUSE', arquivo: `${bpKult}/musicas/TAKE_DOWN_THE_HOUSE.ogg`, introStart: 253360, introEnd: 769538, finalStart: 8629765, finalEnd: 8833804 },
      { id: 'the_adults_are_talking', name: 'THE_ADULTS_ARE_TALKING', arquivo: `${bpKult}/musicas/THE_ADULTS_ARE_TALKING.ogg`, introStart: 207313, introEnd: 1047028, finalStart: 13209098, finalEnd: 14538566 },
      { id: 'this_is_the_day', name: 'THIS_IS_THE_DAY', arquivo: `${bpKult}/musicas/THIS_IS_THE_DAY.ogg`, introStart: 279588, introEnd: 868244, finalStart: 12311374, finalEnd: 13188176 },
      { id: 'too_much_money', name: 'TOO_MUCH_MONEY', arquivo: `${bpKult}/musicas/TOO_MUCH_MONEY.ogg`, introStart: 517333, introEnd: 999479, finalStart: 5507119, finalEnd: 6257442 },
      { id: 'tv_casualty', name: 'TV_CASUALTY', arquivo: `${bpKult}/musicas/TV_CASUALTY.ogg`, introStart: 171360, introEnd: 325440, finalStart: 6123360, finalEnd: 6747360 },
      { id: 'typical_girls', name: 'TYPICAL_GIRLS', arquivo: `${bpKult}/musicas/TYPICAL_GIRLS.ogg`, finalStart: 9775785, finalEnd: 10411558 },
      { id: 'where_no_eagles_fly', name: 'WHERE_NO_EAGLES_FLY', arquivo: `${bpKult}/musicas/WHERE_NO_EAGLES_FLY.ogg`, introStart: 280320, introEnd: 1199616, finalStart: 9330432, finalEnd: 10459392 }
    ],
    // Combinação dos IDs curtos e longos da Kult
    grupoID: genList(bpKult, 'narracoes', padArr('ID', 1, 36)),
    grupoDJSolo: genList(bpKult, 'narracoes', padArr('MONO_SOLO', 1, 4)),
    narracoesGeneral: genList(bpKult, 'narracoes', padArr('GENERAL', 1, 11)),
    timePools: {
      morning: genList(bpKult, 'narracoes', padArr('MORNING', 1, 4)),
      evening: genList(bpKult, 'narracoes', padArr('EVENING', 1, 4))
    },
    endto: {},
    // Comerciais exclusivos Zodiacais da Kult
    grupoAdv: genList(bpKult, 'narracoes', [
      'KULT_AD001_AQUARIUS', 'KULT_AD002_ARIES', 'KULT_AD003_CANCER', 'KULT_AD004_CAPRICORN', 
      'KULT_AD005_GEMINI', 'KULT_AD006_LEO', 'KULT_AD007_LIBRA', 'KULT_AD008_PISCES', 
      'KULT_AD009_SAGITARIUS', 'KULT_AD010_SCORPIO', 'KULT_AD011_TAURUS', 'KULT_AD012_VIRGO'
    ]),
    grupoWeazelNews: [], // Sem notícias exclusivas, fica vazio ou global
    musicIntroNarrations: {
      'AGE_OF_CONSENT': genList(bpKult, 'narracoes', ['AGE_OF_CONSENT_01', 'AGE_OF_CONSENT_02', 'AGE_OF_CONSENT_03']),
      'ALIEN_CRIME_LORD': genList(bpKult, 'narracoes', ['ALIEN_CRIME_LORD_01', 'ALIEN_CRIME_LORD_02', 'ALIEN_CRIME_LORD_03']),
      'BABY_I_LOVE_YOU_SO': genList(bpKult, 'narracoes', ['BABY_I_LOVE_YOU_SO_01', 'BABY_I_LOVE_YOU_SO_02', 'BABY_I_LOVE_YOU_SO_03', 'BABY_I_LOVE_YOU_SO_04', 'BABY_I_LOVE_YOU_SO_05']),
      'CYCLE': genList(bpKult, 'narracoes', ['CYCLE_01', 'CYCLE_02', 'CYCLE_03']),
      'DEEP': genList(bpKult, 'narracoes', ['DEEP_01', 'DEEP_02']),
      'DOWN_ON_THE_STREET': genList(bpKult, 'narracoes', ['DOWN_ON_THE_STREET_01', 'DOWN_ON_THE_STREET_02']),
      'DRAB_MEASURE': genList(bpKult, 'narracoes', ['DRAB_MEASURE_01', 'DRAB_MEASURE_02']),
      'EISBAR': genList(bpKult, 'narracoes', ['EISBAR_01', 'EISBAR_02', 'EISBAR_03']),
      'FACELESS': genList(bpKult, 'narracoes', ['FACELESS_01', 'FACELESS_02', 'FACELESS_03', 'FACELESS_04']),
      'FOUR_SHADOWS': genList(bpKult, 'narracoes', ['FOUR_SHADOWS_01', 'FOUR_SHADOWS_02', 'FOUR_SHADOWS_03', 'FOUR_SHADOWS_04']),
      'GIRLS_AND_BOYS': genList(bpKult, 'narracoes', ['GIRLS_AND_BOYS_01', 'GIRLS_AND_BOYS_02', 'GIRLS_AND_BOYS_03']),
      'HARD_TO_EXPLAIN': genList(bpKult, 'narracoes', ['HARD_TO_EXPLAIN_01', 'HARD_TO_EXPLAIN_02', 'HARD_TO_EXPLAIN_03']),
      'HUMAN_FLY': genList(bpKult, 'narracoes', ['HUMAN_FLY_01', 'HUMAN_FLY_02']),
      'ITS_YOURS': genList(bpKult, 'narracoes', ['ITS_YOURS_01', 'ITS_YOURS_02', 'ITS_YOURS_03']),
      'LFT_ME_LONELY': genList(bpKult, 'narracoes', ['LFT_ME_LONELY_01', 'LFT_ME_LONELY_02', 'LFT_ME_LONELY_03']),
      'MANY_TEARS_AGO': genList(bpKult, 'narracoes', ['MANY_TEARS_AGO_01', 'MANY_TEARS_AGO_02', 'MANY_TEARS_AGO_03', 'MANY_TEARS_AGO_04']),
      'NIGHTCLUBBING': genList(bpKult, 'narracoes', ['NIGHTCLUBBING_01', 'NIGHTCLUBBING_02']),
      'ON_THE_LEVEL': genList(bpKult, 'narracoes', ['ON_THE_LEVEL_01', 'ON_THE_LEVEL_02']),
      'POOL_SONG': genList(bpKult, 'narracoes', ['POOL_SONG_01', 'POOL_SONG_02', 'POOL_SONG_03']),
      'RAGA_MADHUVANTI': genList(bpKult, 'narracoes', ['RAGA_MADHUVANTI_01', 'RAGA_MADHUVANTI_02', 'RAGA_MADHUVANTI_03', 'RAGA_MADHUVANTI_04', 'RAGA_MADHUVANTI_05']),
      'ROCK_AND_ROLL': genList(bpKult, 'narracoes', ['ROCK_AND_ROLL_01', 'ROCK_AND_ROLL_02', 'ROCK_AND_ROLL_03']),
      'SHES_LOST_CONTROL': genList(bpKult, 'narracoes', ['SHES_LOST_CONTROL_01', 'SHES_LOST_CONTROL_02', 'SHES_LOST_CONTROL_03']),
      'TAINTED_LOVE': genList(bpKult, 'narracoes', ['TAINTED_LOVE_01', 'TAINTED_LOVE_02', 'TAINTED_LOVE_03']),
      'TAKE_DOWN_THE_HOUSE': genList(bpKult, 'narracoes', ['TAKE_DOWN_THE_HOUSE_01', 'TAKE_DOWN_THE_HOUSE_02', 'TAKE_DOWN_THE_HOUSE_03']),
      'THE_ADULTS_ARE_TALKING': genList(bpKult, 'narracoes', ['THE_ADULTS_ARE_TALKING_01', 'THE_ADULTS_ARE_TALKING_02', 'THE_ADULTS_ARE_TALKING_03']),
      'THIS_IS_THE_DAY': genList(bpKult, 'narracoes', ['THIS_IS_THE_DAY_01', 'THIS_IS_THE_DAY_02', 'THIS_IS_THE_DAY_03']),
      'TOO_MUCH_MONEY': genList(bpKult, 'narracoes', ['TOO_MUCH_MONEY_01', 'TOO_MUCH_MONEY_02', 'TOO_MUCH_MONEY_03', 'TOO_MUCH_MONEY_04']),
      'TV_CASUALTY': genList(bpKult, 'narracoes', ['TV_CASUALTY_01', 'TV_CASUALTY_02', 'TV_CASUALTY_03', 'TV_CASUALTY_04', 'TV_CASUALTY_05']),
      'WHERE_NO_EAGLES_FLY': genList(bpKult, 'narracoes', ['WHERE_NO_EAGLES_FLY_01'])
    }
  };

  /* ================================================================================= */
  /* ============================= 5. THE LOWDOWN 91.1 (MOTOWN) ====================== */
  /* ================================================================================= */

  const bpMotown = 'RADIO_15_MOTOWN';
  
  const obj_motown = {
    chanceLocucao: 0.9,
    musicasList: [
      { id: 'ashleys_roachclip', name: 'ASHLEYS_ROACHCLIP', arquivo: `${bpMotown}/musicas/ASHLEYS_ROACHCLIP.ogg`, introStart: 259018, introEnd: 956928, finalStart: 10774528, finalEnd: 11807744 },
      { id: 'bouncy_lady', name: 'BOUNCY_LADY', arquivo: `${bpMotown}/musicas/BOUNCY_LADY.ogg`, introStart: 235824, introEnd: 506160, finalStart: 8904704, finalEnd: 9847296 },
      { id: 'california_soul', name: 'CALIFORNIA_SOUL', arquivo: `${bpMotown}/musicas/CALIFORNIA_SOUL.ogg`, introStart: 238976, introEnd: 501760, finalStart: 7109488, finalEnd: 7993200 },
      { id: 'changin', name: 'CHANGIN', arquivo: `${bpMotown}/musicas/CHANGIN.ogg`, introStart: 239946, introEnd: 1201621, finalStart: 13830474, finalEnd: 14808058 },
      { id: 'climax', name: 'CLIMAX', arquivo: `${bpMotown}/musicas/CLIMAX.ogg`, introStart: 247728, introEnd: 1116928, finalStart: 10158080, finalEnd: 11196416 },
      { id: 'cruisin', name: 'CRUISIN', arquivo: `${bpMotown}/musicas/CRUISIN.ogg`, introStart: 507904, introEnd: 1202176, finalStart: 9355264, finalEnd: 10999296 },
      { id: 'do_it_til_youre_satisfied', name: 'DO_IT_TIL_YOURE_SATISFIED', arquivo: `${bpMotown}/musicas/DO_IT_TIL_YOURE_SATISFIED.ogg`, introStart: 272768, introEnd: 888192, finalStart: 8557568, finalEnd: 9626624 },
      { id: 'funny_feeling', name: 'FUNNY_FEELING', arquivo: `${bpMotown}/musicas/FUNNY_FEELING.ogg`, introStart: 237568, introEnd: 995328, finalStart: 4452352, finalEnd: 6094848 },
      { id: 'hercules', name: 'HERCULES', arquivo: `${bpMotown}/musicas/HERCULES.ogg`, introStart: 457856, introEnd: 1121792, finalStart: 8475776, finalEnd: 9628672 },
      { id: 'i_believe_in_miracles', name: 'I_BELIEVE_IN_MIRACLES', arquivo: `${bpMotown}/musicas/I_BELIEVE_IN_MIRACLES.ogg`, introStart: 231832, introEnd: 1191936, finalStart: 7114278, finalEnd: 8060928 },
      { id: 'i_get_lifted', name: 'I_GET_LIFTED', arquivo: `${bpMotown}/musicas/I_GET_LIFTED.ogg`, introStart: 442368, introEnd: 1158144, finalStart: 6000640, finalEnd: 7164928 },
      { id: 'magic_mountain', name: 'MAGIC_MOUNTAIN', arquivo: `${bpMotown}/musicas/MAGIC_MOUNTAIN.ogg`, introStart: 264364, introEnd: 1108140, finalStart: 6797824, finalEnd: 7738112 },
      { id: 'o_o_h_child', name: 'O_O_H_CHILD', arquivo: `${bpMotown}/musicas/O_O_H_CHILD.ogg`, introStart: 253440, introEnd: 683776, finalStart: 7747584, finalEnd: 8668672 },
      { id: 'ready_or_not', name: 'READY_OR_NOT', arquivo: `${bpMotown}/musicas/READY_OR_NOT.ogg`, introStart: 336896, introEnd: 1101824, finalStart: 3960832, finalEnd: 5099520 },
      { id: 'rubber_band', name: 'RUBBER_BAND', arquivo: `${bpMotown}/musicas/RUBBER_BAND.ogg`, introStart: 683264, introEnd: 1342902, finalStart: 10584064, finalEnd: 11776000 },
      { id: 'smiling_faces', name: 'SMILING_FACES', arquivo: `${bpMotown}/musicas/SMILING_FACES.ogg`, introStart: 263284, introEnd: 703616, finalStart: 8154114, finalEnd: 8573440 },
      { id: 'stories', name: 'STORIES', arquivo: `${bpMotown}/musicas/STORIES.ogg`, introStart: 277792, introEnd: 990496, finalStart: 5466624, finalEnd: 6402048 },
      { id: 'superman_lover', name: 'SUPERMAN_LOVER', arquivo: `${bpMotown}/musicas/SUPERMAN_LOVER.ogg`, introStart: 270336, introEnd: 1048576, finalStart: 9247587, finalEnd: 10085470 },
      { id: 'the_cisco_kid', name: 'THE_CISCO_KID', arquivo: `${bpMotown}/musicas/THE_CISCO_KID.ogg`, introStart: 240207, introEnd: 818176, finalStart: 7804928, finalEnd: 8718336 },
      { id: 'viva_tirado', name: 'VIVA_TIRADO', arquivo: `${bpMotown}/musicas/VIVA_TIRADO.ogg`, introStart: 671616, introEnd: 1742720, finalStart: 8990592, finalEnd: 9794688 }
    ],
    grupoID: genList(bpMotown, 'narracoes', padArr('ID', 1, 13)),
    grupoDJSolo: genList(bpMotown, 'narracoes', padArr('MONO_SOLO', 1, 12)),
    narracoesGeneral: genList(bpMotown, 'narracoes', padArr('GENERAL', 1, 36)),
    timePools: {
      morning: genList(bpMotown, 'narracoes', padArr('MORNING', 1, 6)),
      evening: genList(bpMotown, 'narracoes', padArr('EVENING', 1, 5))
    },
    endto: {
      toad: genList(bpMotown, 'narracoes', padArr('TO_AD', 1, 5)),
      tonews: [] // Sem narrações de notícias listadas para esta rádio
    },
    grupoAdv: G.adv.gtav || [],
    grupoWeazelNews: G.news.gtav || [],
    musicIntroNarrations: {
      'ASHLEYS_ROACHCLIP': genList(bpMotown, 'narracoes', ['ASHLEYS_ROACHCLIP_01', 'ASHLEYS_ROACHCLIP_02']),
      'CALIFORNIA_SOUL': genList(bpMotown, 'narracoes', ['CALIFORNIA_SOUL_01', 'CALIFORNIA_SOUL_02']),
      'CLIMAX': genList(bpMotown, 'narracoes', ['CLIMAX_01', 'CLIMAX_02']),
      'CRUISIN': genList(bpMotown, 'narracoes', ['CRUISIN_01', 'CRUISIN_02']),
      'DO_IT_TIL_YOURE_SATISFIED': genList(bpMotown, 'narracoes', ['DO_IT_TIL_YOURE_SATISFIED_01', 'DO_IT_TIL_YOURE_SATISFIED_02']),
      'FUNNY_FEELING': genList(bpMotown, 'narracoes', ['FUNNY_FEELING_01']),
      'HERCULES': genList(bpMotown, 'narracoes', ['HERCULES_01', 'HERCULES_02']),
      'I_BELIEVE_IN_MIRACLES': genList(bpMotown, 'narracoes', ['I_BELIEVE_IN_MIRACLES_01', 'I_BELIEVE_IN_MIRACLES_02']),
      'I_GET_LIFTED': genList(bpMotown, 'narracoes', ['I_GET_LIFTED_01', 'I_GET_LIFTED_02']),
      'MAGIC_MOUNTAIN': genList(bpMotown, 'narracoes', ['MAGIC_MOUNTAIN_01', 'MAGIC_MOUNTAIN_02']),
      'O_O_H_CHILD': genList(bpMotown, 'narracoes', ['O_O_H_CHILD_01', 'O_O_H_CHILD_02']),
      'READY_OR_NOT': genList(bpMotown, 'narracoes', ['READY_OR_NOT_01', 'READY_OR_NOT_02']),
      'RUBBER_BAND': genList(bpMotown, 'narracoes', ['RUBBER_BAND_01', 'RUBBER_BAND_02']),
      'SMILING_FACES': genList(bpMotown, 'narracoes', ['SMILING_FACES_01', 'SMILING_FACES_02']),
      'SUPERMAN_LOVER': genList(bpMotown, 'narracoes', ['SUPERMAN_LOVER_01', 'SUPERMAN_LOVER_02']),
      'THE_CISCO_KID': genList(bpMotown, 'narracoes', ['THE_CISCO_KID_01', 'THE_CISCO_KID_02', 'THE_CISCO_KID_03']),
      'VIVA_TIRADO': genList(bpMotown, 'narracoes', ['VIVA_TIRADO_01', 'VIVA_TIRADO_02'])
    }
  };

  /* ================================================================================= */
  /* =========================== EXPORTAÇÃO GLOBAL (GTA V) =========================== */
  /* ================================================================================= */
  
  window.STATION_DATA = {
    PROGRAMACOES: {
      'v': { 
        'radio_01_class_rock': obj_class_rock,
        'radio_16_silverlake': obj_silverlake,
        'radio_18_90s_rock': obj_90s_rock,
        'radio_34_dlc_hei4_kult': obj_kult,
        'radio_15_motown': obj_motown
      }
    }
  };
})();