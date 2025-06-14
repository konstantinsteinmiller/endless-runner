<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue'
import GameOverScreen from '@/components/GameOverScreen.vue'
import Player from '@/components/atoms/Player.vue'
import Enemy from '@/components/atoms/Enemy.vue'
import enemy from '@/components/atoms/Enemy.vue'
import Obstacle from '@/components/atoms/Obstacle.vue'
import obstacle from '@/components/atoms/Obstacle.vue'

import useMatch from '@/use/useMatch.ts'
import { useGameLoop } from '@/use/useGameLoop'
import { usePlayer } from '@/use/usePlayer'
import useInput from '@/use/useInput'
import { useCollisionDetection } from '@/use/useCollisionDetection'
import { useParallaxBackground } from '@/use/useParallaxBackground'
import {
  ENEMY_HEIGHT,
  ENEMY_SPAWN_INTERVAL,
  ENEMY_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
  GROUND_Y,
  MAX_ENEMIES_ON_SCREEN,
  MAX_OBSTACLES_ON_SCREEN,
  OBSTACLE_SPAWN_INTERVAL,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  SCROLL_SPEED_FOREGROUND,
  TOTAL_ENEMY_TYPES,
} from '@/utils/constants.ts'
import Background from '@/components/atoms/Background.vue'
import { ENEMY_TYPES, OBSTACLE_TYPES, TOTAL_OBSTACLES_TYPES } from '@/utils/enums.ts'
import Score from '@/components/atoms/Score.vue'

// Match State
const { isGameOver, setIsGameOver, restartGame } = useMatch()
const isGameRunning: Ref<boolean> = ref(true)

// Player
const { playerX, playerY, isJumping, isFlying, stopFlying, updatePlayer } = usePlayer()

const { cleanup } = useInput()

// Enemies and Obstacles
interface GameEntity {
  id: number
  x: number
  y: number
  width: number
  height: number
  type?: number
}
const enemiesList: Ref<GameEntity[]> = ref([])
const obstaclesList: Ref<GameEntity[]> = ref([])

let enemySpawnTimer: number = 0
let obstacleSpawnTimer: number = 0
let obstaclesDodgedTotal: number = 0
let enemiesDodgedTotal: number = 0
let timePlayed = ref<number>(0)

const speed = computed(() => {
  const steps = timePlayed.value / 5000
  return 1.0 + Math.floor(steps) * 0.1 // Increase speed by 10% every 5 seconds
})
const maxObstaclesOnScreen = computed(() => Math.floor(speed.value * MAX_OBSTACLES_ON_SCREEN))
const maxEnemiesOnScreen = computed(() => {
  return Math.floor(speed.value * MAX_ENEMIES_ON_SCREEN)
})

// Collision Detection
const { checkCollision } = useCollisionDetection()

// Parallax Background
const { updateBackground } = useParallaxBackground(isGameRunning)

// Game Loop Update Function
const updateGame = (deltaTime: number) => {
  if (isGameOver.value) {
    isGameRunning.value = false
    return
  }

  timePlayed.value += deltaTime

  // Update Player
  updatePlayer(deltaTime)

  // Update Backgrounds
  updateBackground(deltaTime)

  // Update Enemies
  enemiesList.value.forEach(enemy => {
    enemy.x -= SCROLL_SPEED_FOREGROUND * 1.1 * speed.value // Adjust speed based on game speed
  })
  enemiesList.value = enemiesList.value.filter(entity => {
    const didDodgeEntity = entity.x + entity.width < 0
    if (didDodgeEntity) {
      enemiesDodgedTotal++
    }
    return entity.x + entity.width > 0 // isEntityOutOfBounds
  }) // Remove off-screen

  // Update Obstacles
  obstaclesList.value.forEach(obstacle => {
    obstacle.x -= SCROLL_SPEED_FOREGROUND * speed.value // Adjust speed based on game speed
  })
  obstaclesList.value = obstaclesList.value.filter(entity => {
    const didDodgeEntity = entity.x + entity.width < 0
    if (didDodgeEntity) {
      obstaclesDodgedTotal++
    }
    return entity.x + entity.width > 0 // isEntityOutOfBounds
  }) // Remove off-screen

  // Spawn Enemies
  enemySpawnTimer += deltaTime
  if (
    enemySpawnTimer > ENEMY_SPAWN_INTERVAL - speed.value * 50 &&
    enemiesList.value.length < maxEnemiesOnScreen.value
  ) {
    const MAX_ENEMY_Y = GROUND_Y - ENEMY_HEIGHT
    const unclampedRandomInt = Math.floor(Math.random() * TOTAL_ENEMY_TYPES) + 1
    const type = unclampedRandomInt.clamp(0, TOTAL_ENEMY_TYPES)
    const enemyDimensions = ENEMY_TYPES[type]

    const enemy = {
      id: Date.now() + Math.random(),
      x: GAME_WIDTH + Math.random() * 200, // Spawn just off-screen
      y: Math.floor(Math.random() * MAX_ENEMY_Y),
      width: enemyDimensions.width,
      height: enemyDimensions.height,
      type, // Random type for variety
    }
    enemiesList.value.push(enemy)
    enemySpawnTimer = 0
  }

  // Spawn Obstacles
  obstacleSpawnTimer += deltaTime
  if (
    obstacleSpawnTimer > OBSTACLE_SPAWN_INTERVAL - speed.value * 50 &&
    obstaclesList.value.length < maxObstaclesOnScreen.value
  ) {
    const unclampedRandomInt = Math.floor(Math.random() * TOTAL_OBSTACLES_TYPES) + 1
    const type = unclampedRandomInt.clamp(0, TOTAL_ENEMY_TYPES)
    const obstacleDimensions = OBSTACLE_TYPES[type]
    const MAX_OBSTACLE_Y = GROUND_Y - obstacleDimensions.height
    const obstacle = {
      id: Date.now() + Math.random(),
      x: GAME_WIDTH + Math.floor(Math.random() * 300), // Spawn just off-screen
      y: Math.floor(Math.random() * MAX_OBSTACLE_Y),
      width: obstacleDimensions.width,
      height: obstacleDimensions.height,
      type, // Random type for variety
    }
    obstaclesList.value.push(obstacle)
    obstacleSpawnTimer = 0
  }

  // Collision Detection
  const playerBounds = {
    x: playerX.value,
    y: playerY.value,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  }

  enemiesList.value.forEach(enemy => {
    if (checkCollision(playerBounds, enemy)) {
      setIsGameOver(true)
    }
  })

  obstaclesList.value.forEach(obstacle => {
    if (checkCollision(playerBounds, obstacle)) {
      setIsGameOver(true)
    }
  })
}

// Initialize Game Loop
useGameLoop({ onUpdate: updateGame, isRunning: isGameRunning })

const resetGameState = () => {
  cleanup()
  enemiesList.value = []
  obstaclesList.value = []
  enemySpawnTimer = 0
  obstacleSpawnTimer = 0
  obstaclesDodgedTotal = 0
  enemiesDodgedTotal = 0
  timePlayed.value = 0

  stopFlying()
  isJumping.value = false
  isFlying.value = false
  isGameRunning.value = true

  useInput()
}

// Handle Restart Game from GameOverScreen
const onRestartGame = () => {
  setTimeout(() => {
    resetGameState()
    restartGame()
  })
}

onMounted(() => {})

onUnmounted(() => {
  cleanup()
})
const gameWidth = computed(() => {
  return GAME_WIDTH
})
const gameHeight = computed(() => {
  return GAME_WIDTH
})
</script>

<template lang="pug">
  .game-container.relative.overflow-hidden(:style="{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }")
    // Parallax Background Layers
    // Far Background (slowest)
    Background

    // Game Elements
    Player(
      :x="playerX"
      :y="playerY"
    )

    Enemy(
      v-for="enemy in enemiesList"
      :key="enemy.id"
      :entity="enemy"
      :time="timePlayed"
      :speed="speed"
    )

    Obstacle(
      v-for="obstacle in obstaclesList"
      :key="obstacle.id"
      :entity="obstacle"
      :time="timePlayed"
      :speed="speed"
    )

    // Game Over Screen
    GameOverScreen(v-if="isGameOver" @restart="onRestartGame")

    .absolute.top-4.left-4.text-white.text-sm.z-50
      //div Player Y: {{ playerY.toFixed(2) }}
      //div Is Flying: {{ isFlying }}
      //div Enemies: {{ enemiesList.length }}
      //div Obstacles: {{ obstaclesList.length }}
    Score(
      :obstaclesTotal="obstaclesDodgedTotal"
      :enemiesTotal="enemiesDodgedTotal"
      :time="timePlayed"
      :speed="speed"
    )
</template>

<style scoped lang="sass">
.game-container
  width: v-bind(gameWidth)
  height: v-bind(gameHeight)
  background-color: #87CEEB
  margin: 0 auto

  .background-layer
    transition: transform linear 0s // No transition for smooth scrolling
// These specific styles might be needed if Tailwind's defaults don't suffice
// For example, if you want specific background images for each layer
// background-image: url('/path/to/image.png')
// background-repeat: repeat-x // Important for endless scrolling images
// background-size: cover // Or contain, depending on your image

// Adjust these if Player, Enemy, Obstacle components have their own dimensions that override Tailwind
// .player, .enemy, .obstacle
//   position: absolute
//   box-sizing: border-box // Ensure padding/border don't affect computed width/height
</style>
