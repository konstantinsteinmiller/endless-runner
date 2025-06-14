<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue'
import GameOverScreen from '@/components/GameOverScreen.vue'
import Player from '@/components/atoms/Player.vue'
import Enemy from '@/components/atoms/Enemy.vue'
import Obstacle from '@/components/atoms/Obstacle.vue'

import useMatch from '@/use/useMatch.ts'
import { useGameLoop } from '@/use/useGameLoop'
import { usePlayer } from '@/use/usePlayer'
import useInput from '@/use/useInput'
import { useCollisionDetection } from '@/use/useCollisionDetection'
import { useParallaxBackground } from '@/use/useParallaxBackground'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  GROUND_Y,
  SCROLL_SPEED_FOREGROUND,
  ENEMY_SPAWN_INTERVAL,
  OBSTACLE_SPAWN_INTERVAL,
  MAX_ENEMIES_ON_SCREEN,
  MAX_OBSTACLES_ON_SCREEN,
} from '@/utils/constants.ts'
import Background from '@/components/atoms/Background.vue'

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
}
const enemiesList: Ref<GameEntity[]> = ref([])
const obstaclesList: Ref<GameEntity[]> = ref([])

let enemySpawnTimer: number = 0
let obstacleSpawnTimer: number = 0

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

  // Update Player
  updatePlayer(deltaTime)

  // Update Backgrounds
  updateBackground(deltaTime)

  // Update Enemies
  enemiesList.value.forEach(enemy => {
    enemy.x -= SCROLL_SPEED_FOREGROUND
  })
  enemiesList.value = enemiesList.value.filter(enemy => enemy.x + enemy.width > 0) // Remove off-screen

  // Update Obstacles
  obstaclesList.value.forEach(obstacle => {
    obstacle.x -= SCROLL_SPEED_FOREGROUND
  })
  obstaclesList.value = obstaclesList.value.filter(obstacle => obstacle.x + obstacle.width > 0) // Remove off-screen

  // Spawn Enemies
  enemySpawnTimer += deltaTime
  if (enemySpawnTimer > ENEMY_SPAWN_INTERVAL && enemiesList.value.length < MAX_ENEMIES_ON_SCREEN) {
    enemiesList.value.push({
      id: Date.now() + Math.random(),
      x: GAME_WIDTH + Math.random() * 200, // Spawn just off-screen
      y: GROUND_Y - ENEMY_HEIGHT,
      width: ENEMY_WIDTH,
      height: ENEMY_HEIGHT,
    })
    enemySpawnTimer = 0
  }

  // Spawn Obstacles
  obstacleSpawnTimer += deltaTime
  if (obstacleSpawnTimer > OBSTACLE_SPAWN_INTERVAL && obstaclesList.value.length < MAX_OBSTACLES_ON_SCREEN) {
    obstaclesList.value.push({
      id: Date.now() + Math.random(),
      x: GAME_WIDTH + Math.floor(Math.random() * 300), // Spawn just off-screen
      y: GROUND_Y - OBSTACLE_HEIGHT,
      width: OBSTACLE_WIDTH,
      height: OBSTACLE_HEIGHT,
    })
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
  // Reset game specific states
  enemiesList.value = []
  obstaclesList.value = []
  enemySpawnTimer = 0
  obstacleSpawnTimer = 0
  stopFlying()
  isJumping.value = false // Ensure game loop resumes
  isFlying.value = false // Ensure game loop resumes
  isGameRunning.value = true // Ensure game loop resumes
}

// Handle Restart Game from GameOverScreen
const onRestartGame = () => {
  restartGame()

  resetGameState()
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
      :x="enemy.x"
      :y="enemy.y"
    )

    Obstacle(
      v-for="obstacle in obstaclesList"
      :key="obstacle.id"
      :x="obstacle.x"
      :y="obstacle.y"
    )

    // Game Over Screen
    GameOverScreen(v-if="isGameOver" @restart="onRestartGame")

    .absolute.top-4.left-4.text-white.text-sm.z-50
      div Player Y: {{ playerY.toFixed(2) }}
      div Is Flying: {{ isFlying }}
      div Enemies: {{ enemiesList.length }}
      div Obstacles: {{ obstaclesList.length }}
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
