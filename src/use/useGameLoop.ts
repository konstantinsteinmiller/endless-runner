import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface GameLoopOptions {
  onUpdate: (deltaTime: number) => void
  isRunning: Ref<boolean>
}

export function useGameLoop({ onUpdate, isRunning }: GameLoopOptions) {
  let lastTime: number = 0
  let animationFrameId: number

  const gameLoop = (currentTime: number) => {
    if (!lastTime) lastTime = currentTime
    const deltaTime = currentTime - lastTime
    lastTime = currentTime

    if (isRunning.value) {
      onUpdate(deltaTime)
    }

    animationFrameId = requestAnimationFrame(gameLoop)
  }

  onMounted(() => {
    animationFrameId = requestAnimationFrame(gameLoop)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
  })

  return {}
}
