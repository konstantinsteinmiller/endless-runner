import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import useUserDb from '@/use/useUserDb'

const userSoundVolume: Ref<number> = ref(0.7)
const userMusicVolume: Ref<number> = ref(0.05)
const userLanguage: Ref<string> = ref(navigator?.language?.split('-')[0] || 'en')

const userTutorialsDoneMap: Ref<any> = ref('{}')
const tutorialPhase: Ref<string> = ref('')
const allowTutorial: Ref<boolean> = ref(true)

const { storeUser } = useUserDb({
  userSoundVolume,
  userMusicVolume,
  userLanguage,
})

const useUser = () => {
  const setSettingValue = (name: string, value: any) => {
    if (name === 'language') {
      value = `'${value}'`
    }
    eval(`user${name[0].toUpperCase()}${name.slice(1)}.value = ${value}`)

    storeUser({
      userSoundVolume: +userSoundVolume.value,
      userMusicVolume: +userMusicVolume.value,
      userLanguage: userLanguage.value,
    })
  }

  return {
    userSoundVolume,
    userMusicVolume,
    userLanguage,
    userTutorialsDoneMap,
    tutorialPhase,
    allowTutorial,
    setSettingValue,
  }
}

export default useUser
