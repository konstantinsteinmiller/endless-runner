import { ref, computed } from 'vue'
import type { Ref } from 'vue'

const isStartingGame: Ref<boolean> = ref(false)
const isGameOver: Ref<boolean> = ref(false)
// const isStartingGame: Ref<boolean> = ref(false)
// const isResizing: Ref<boolean> = ref(false)
const isSplashScreenVisible: Ref<boolean> = ref(true)
// const showSplashScreen: Ref<boolean> = ref(true)
const isDbInitialized: Ref<boolean> = ref(false)
const levelType: Ref<string> = ref('')
const isOptionsModalOpen: Ref<boolean> = ref(false)

const controls: any = ref({
  show: false,
  isLeftMouseButton: true,
  isRightMouseButton: false,
  isTap: false,
  x: '0px',
  y: '0px',
})

const useMatch = () => {
  const resetMatch = () => {}

  const routes = ['/game']
  if (!isStartingGame.value && routes.some(route => window.location.hash.includes(route))) {
    // let themeQuery = ''
    // // console.log('window.location.hash: ', window.location.hash)
    // if (window.location.hash.includes('debug=')) {
    //   const queries = window.location.hash.split('?')[1]?.split('&')
    //   const includedList = ['debug']
    //   const newQueries = queries.filter(query => includedList.includes(query.split('=')[0]))
    //   themeQuery = `?${newQueries.join('&')}`
    // }
    // window.location.pathname = '/'
    // window.location.hash = `#/${themeQuery}`
    // window.location.reload()
  }

  const setIsGameOver = (value: boolean) => {
    isGameOver.value = value
  }

  const restartGame = () => {
    isGameOver.value = false
    // You might want to emit an event or call a function in GameUI to reset game state
  }

  return {
    resetMatch,
    isStartingGame,
    isGameOver: computed(() => isGameOver.value), // Expose as computed for read-only access
    setIsGameOver,
    restartGame,
    isSplashScreenVisible,
    isDbInitialized,
    isOptionsModalOpen,
    controls,
    levelType,
  }
}

export default useMatch
