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

export const GAME_WIDTH: number = window.innerWidth || 1280
export const GAME_HEIGHT: number = window.innerHeight || 720
export const GRAVITY: number = 0.8
export const JUMP_STRENGTH: number = 15
export const JETPACK_THRUST_ACCELERATION = 0.4 // How much upward force per frame (adjust as needed)
export const MAX_JETPACK_VELOCITY_Y = 8 // Optional: Cap max upward speed

export const PLAYER_WIDTH: number = 32
export const PLAYER_HEIGHT: number = 40
export const PLAYER_LEFT_OFFSET: number = Math.floor(GAME_WIDTH / 20) // 5% of the game width
export const PLAYER_START_X: number = PLAYER_LEFT_OFFSET

export const ROUNDED_FLOOR_OFFSET: number = Math.floor(GAME_HEIGHT / 10)
export const GROUND_OFFSET: number = ROUNDED_FLOOR_OFFSET >= 20 ? 20 : ROUNDED_FLOOR_OFFSET // 10% of the game height, but at least 50px
export const GROUND_Y: number = GAME_HEIGHT - GROUND_OFFSET // Where the player "stands"
export const SCROLL_SPEED_BG_FAR: number = 1
export const SCROLL_SPEED_BG_MID: number = 3
export const SCROLL_SPEED_FOREGROUND: number = 5 // This will be the main game speed

export const TOTAL_ENEMY_TYPES: number = 5
export const ENEMY_WIDTH: number = 48
export const ENEMY_HEIGHT: number = 48
export const OBSTACLE_WIDTH: number = 64
export const OBSTACLE_HEIGHT: number = 64
export const ENEMY_SPAWN_INTERVAL: number = 2000 // ms
export const OBSTACLE_SPAWN_INTERVAL: number = 2715 // ms
export const MAX_ENEMIES_ON_SCREEN: number = 3
export const MAX_OBSTACLES_ON_SCREEN: number = 2
