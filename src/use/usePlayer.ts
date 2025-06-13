import { ref, watch, type Ref } from 'vue'
import {
  GRAVITY,
  JUMP_STRENGTH,
  GROUND_Y,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_START_X,
  GAME_HEIGHT,
} from '@/utils/constants'

export function usePlayer(isGameOver: Ref<boolean>) {
  const playerX = ref(PLAYER_START_X)
  const playerY = ref(GROUND_Y)
  const velocityY = ref(0)
  const isJumping = ref(false)

  const jump = () => {
    if (isGameOver.value) return
    if (!isJumping.value) {
      velocityY.value = -JUMP_STRENGTH
      isJumping.value = true
    }
  }

  const updatePlayer = (deltaTime: number) => {
    if (isGameOver.value) return

    // Apply gravity
    velocityY.value += GRAVITY
    playerY.value += velocityY.value

    // Prevent falling through ground
    if (playerY.value >= GROUND_Y) {
      playerY.value = GROUND_Y
      velocityY.value = 0
      isJumping.value = false
    }

    // Prevent jumping too high (optional ceiling)
    if (playerY.value < 0) {
      playerY.value = 0
      velocityY.value = 0 // Or reverse velocity if you want a bounce
    }
  }

  // Reset player state when game restarts (or game over changes)
  watch(isGameOver, newValue => {
    if (!newValue) {
      // If game is no longer over (restarted)
      playerX.value = PLAYER_START_X
      playerY.value = GROUND_Y
      velocityY.value = 0
      isJumping.value = false
    }
  })

  return {
    playerX,
    playerY,
    isJumping,
    jump,
    updatePlayer,
    playerWidth: PLAYER_WIDTH,
    playerHeight: PLAYER_HEIGHT,
  }
}
