// import type { ENUM } from '@/types'

// export const MENU: ENUM = {
//   MAP: 'map',
//   COLLECTION: 'collection',
//   ITEMS: 'items',
//   FAIRY: 'fairy',
//   ATTACK_SPELLS: 'attackSpells',
//   PASSIVE_SPELLS: 'passiveSpells',
// }
// export type MenuItem = (typeof MENU)[keyof typeof MENU]

import type { ENUM } from '@/types'
import enemy from '@/components/atoms/Enemy.vue'

export const ENEMY_TYPES: ENUM = {
  '1': '/images/enemies/enemy-1.webp',
  '2': '/images/enemies/enemy-2.webp',
}
export type EnemyType = (typeof ENEMY_TYPES)[keyof typeof ENEMY_TYPES]

export const OBSTACLE_TYPES: { [s: string]: { width: number; height: number } } = {
  1: {
    width: 64,
    height: 112,
  },
  2: {
    width: 54,
    height: 134,
  },
}
export const TOTAL_OBSTACLES_TYPES = Object.keys(OBSTACLE_TYPES).length

export const LANGUAGES: Array<string> = [
  // 'ar',
  // 'cs',
  // 'da',
  'de',
  // 'el',
  'en',
  // 'es',
  // 'fi',
  // 'fr',
  // 'it',
  // 'jp',
  // 'kr',
  // 'ms',
  // 'nl',
  // 'pl',
  // 'pt',
  // 'ru',
  // 'sv',
  // 'zh',
]
