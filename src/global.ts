import type { Ref } from 'vue'

declare global {
  interface Window {
    G: {
      isDebug: boolean
      route: Ref<any>
      // isGameOver: Ref<boolean>
      // isStartingGame: Ref<boolean>
    }
  }
}

window.G = window.G || {}
