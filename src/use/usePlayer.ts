import { ref, watch } from 'vue'
import {
  GRAVITY,
  GROUND_Y,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_START_X,
  GAME_HEIGHT,
  JETPACK_THRUST_ACCELERATION,
  MAX_JETPACK_VELOCITY_Y,
} from '@/utils/constants'
import useMatch from '@/use/useMatch.ts'

const playerX = ref(PLAYER_START_X)
const playerY = ref(GROUND_Y - PLAYER_HEIGHT) // Start at ground level minus player height
const velocityY = ref(0)
const isJumping = ref(false)
const isFlying = ref(false)

export function usePlayer() {
  const { isGameOver } = useMatch()
  /**
   * Activates jetpack flight. Player will accelerate upwards in the next game updates.
   */
  const startFlying = () => {
    if (isGameOver.value) return
    isFlying.value = true
    isJumping.value = true // Consider player as "jumping" or in air when flying
  }

  /**
   * Deactivates jetpack flight. Player will fall due to gravity.
   */
  const stopFlying = () => {
    isFlying.value = false
  }

  const updatePlayer = (deltaTime: number) => {
    if (isGameOver.value) {
      isFlying.value = false // Ensure flight stops if game ends
      return
    }

    // Apply jetpack thrust if flying
    if (isFlying.value) {
      // Apply upward acceleration
      velocityY.value -= JETPACK_THRUST_ACCELERATION // Subtract to move upwards
      // Optional: Cap max upward velocity to prevent infinite acceleration
      if (velocityY.value < -MAX_JETPACK_VELOCITY_Y) {
        velocityY.value = -MAX_JETPACK_VELOCITY_Y
      }
    } else {
      // Apply gravity when not flying
      velocityY.value += GRAVITY
    }

    // Update player position based on velocity
    playerY.value += velocityY.value

    // Prevent falling through ground
    if (playerY.value >= GROUND_Y - PLAYER_HEIGHT) {
      playerY.value = GROUND_Y - PLAYER_HEIGHT
      velocityY.value = 0
      // isJumping.value = false // Player is on the ground
      // isFlying.value = false // Ensure flight state is reset if touching ground
    }

    // Prevent going above screen (optional ceiling)
    if (playerY.value < 0) {
      playerY.value = 0
      velocityY.value = 0 // Stop upward movement if hitting top
    }
  }

  // Reset player state when game restarts (or game over changes)
  watch(isGameOver, newValue => {
    if (!newValue) {
      // If game is no longer over (restarted)
      playerX.value = PLAYER_START_X
      playerY.value = GROUND_Y - PLAYER_HEIGHT // Reset to correct ground position
      velocityY.value = 0
      isJumping.value = false
      isFlying.value = false // Reset flying state
    }
  })

  return {
    playerX,
    playerY,
    isJumping,
    isFlying,
    startFlying,
    stopFlying,
    updatePlayer,
    playerWidth: PLAYER_WIDTH,
    playerHeight: PLAYER_HEIGHT,
  }
}
