export type ANIM = 'idle' | 'walk' | 'walk-back' | 'run' | 'run-back' | 'dance' | 'cast' | 'jump' | 'fly' | 'hit'
export const characterAnimationNamesList: ANIM[] = [
  'idle',
  'walk',
  'walk-back',
  'run',
  'run-back',
  // 'dance',
  // 'cast',
  'jump',
  'fly',
  'hit' /*
   */,
]

export const GAME_NAME: string = 'kingdom'
export const GAME_USER_LANGUAGE: string = `${GAME_NAME}UserLanguage`
export const GAME_USER_SOUND_VOLUME: string = `${GAME_NAME}SoundVolume`
export const GAME_USER_MUSIC_VOLUME: string = `${GAME_NAME}MusicVolume`
