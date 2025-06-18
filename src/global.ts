import { type ComputedRef, ref, type Ref } from 'vue'

declare global {
  interface Window {
    G: {
      isDebug: boolean
      route: Ref<any>
      // isGameOver: Ref<boolean>
      // isStartingGame: Ref<boolean>
      obstaclesDodgedTotal: Ref<number>
      enemiesDodgedTotal: Ref<number>
      timePlayed: Ref<number>
      speed: ComputedRef<number>
    }
  }
}

window.G = window.G || {
  obstaclesDodgedTotal: ref(0),
  enemiesDodgedTotal: ref(0),
  timePlayed: ref(0),
  speed: ref(0),
}
console.log('window.G: ', window.G)
