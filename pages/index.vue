<template>
  <div class="board-wrapper">
    <main class="board">
      <!-- <h1>{{ boardStore.board.name }}</h1> -->
        <BoardColumn 
        v-for="(column, columnIndex) in boardStore.board.columns" 
        :key="column.id" 
        :column="column" 
        :columnIndex="columnIndex"
        class="mx-2"
        />
        
      <UContainer class="column">
        <UInput 
        type="text" 
        icon="i-heroicons-plus-circle-solid" 
        placeholder="Add a new column" 
        @keyup.enter="addColumn" 
        v-model="newColumnName" 
        />
      </UContainer>
    </main>
    <div class="task-bg" v-show="isModalOpen" @click.self="closeModal">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useBoardStore} from '~/stores/boardStore'
const route = useRoute()
const router = useRouter()

const boardStore = useBoardStore()
const newColumnName = ref('')
const isModalOpen = computed(() => {
  return route.name === 'index-tasks-id'
  
})

function addColumn() {
  boardStore.addColumn(newColumnName.value)
  newColumnName.value = ''
}

function closeModal() {
  router.push('/')
}

</script>

<style>

</style>