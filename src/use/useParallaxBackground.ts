import { ref, type Ref } from 'vue'
import { GAME_WIDTH, SCROLL_SPEED_BG_FAR, SCROLL_SPEED_BG_MID, SCROLL_SPEED_FOREGROUND } from '@/utils/constants.ts'

export const bgFarX1 = ref(0)
export const bgFarX2 = ref(GAME_WIDTH)
export const bgMidX1 = ref(0)
export const bgMidX2 = ref(GAME_WIDTH)
export const fgX1 = ref(0)
export const fgX2 = ref(GAME_WIDTH)

export function useParallaxBackground(isRunning: Ref<boolean>) {
  const updateBackground = (deltaTime: number) => {
    if (!isRunning.value) return

    // Far background
    bgFarX1.value -= SCROLL_SPEED_BG_FAR
    bgFarX2.value -= SCROLL_SPEED_BG_FAR
    if (bgFarX1.value <= -GAME_WIDTH) bgFarX1.value = bgFarX2.value + GAME_WIDTH - 1
    if (bgFarX2.value <= -GAME_WIDTH) bgFarX2.value = bgFarX1.value + GAME_WIDTH - 1

    // Mid background
    bgMidX1.value -= SCROLL_SPEED_BG_MID
    bgMidX2.value -= SCROLL_SPEED_BG_MID
    if (bgMidX1.value <= -GAME_WIDTH) bgMidX1.value = bgMidX2.value + GAME_WIDTH - 1
    if (bgMidX2.value <= -GAME_WIDTH) bgMidX2.value = bgMidX1.value + GAME_WIDTH - 1

    // Foreground (main game speed)
    fgX1.value -= SCROLL_SPEED_FOREGROUND
    fgX2.value -= SCROLL_SPEED_FOREGROUND
    if (fgX1.value <= -GAME_WIDTH) fgX1.value = fgX2.value + GAME_WIDTH - 1
    if (fgX2.value <= -GAME_WIDTH) fgX2.value = fgX1.value + GAME_WIDTH - 1
  }

  return {
    bgFarX1,
    bgFarX2,
    bgMidX1,
    bgMidX2,
    fgX1,
    fgX2,
    updateBackground,
  }
}
