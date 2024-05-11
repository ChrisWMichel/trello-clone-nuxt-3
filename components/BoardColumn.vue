<template>
  <div>
    <UContainer 
      class="column" 
      draggable="true"
      @dragstart.self="pickupColumn($event, columnIndex)"
      @dragenter.prevent 
      @dragover.prevent 
      @drop.stop="dropItem($event, {
        toColumnIndex: columnIndex
      })"
      >
      <div class="column-header">
        <div>         
          <UInput type="text" placeholder="Add a new task" v-model="column.name" v-if="editNameState"/>
          <h2 v-else >{{ column.name }}</h2>
        </div>
        <div>
          <UButton icon="i-heroicons-pencil" @click="editNameState = !editNameState" color="yellow" class="p-1"></UButton>
          <UButton icon="i-heroicons-trash" @click="deleteColumn(columnIndex)" color="red" class="p-1 ml-2"></UButton>
        </div>
      </div>
      <ul>
        <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
          <UCard 
          class="mb-4" 
          @click="goToTask(task.id)" 
          draggable="true"
          @dragstart="pickupTask($event, {
            fromTaskIndex: taskIndex,
            fromColumnIndex: columnIndex
          })"
          @drop.stop="dropItem($event, {
            toColumnIndex: columnIndex,
            toTaskIndex: taskIndex
          })"
          >
            <strong>{{ task.name }}</strong>
            <p>{{ task.description }}</p>
          </UCard>
        </li>
      </ul>
      <UInput 
        type="text" 
        icon="i-heroicons-plus-circle-solid" 
        placeholder="Add a new task" 
        @keyup.enter="addTask" 
        v-model="newTaskName" 
        />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import {useBoardStore} from '~/stores/boardStore'
const router = useRouter()

const props = defineProps({
  column: {
    type: Object,
    required: true,
    default: () => ({ name: '', tasks: []}),
  },
  columnIndex: {
    type: Number,
    required: true,
  },
})

const editNameState = ref(false)
const boardStore = useBoardStore()
const newTaskName = ref('')

function addTask() {
  boardStore.addTask(props.columnIndex, newTaskName.value)
  newTaskName.value = ''
}

function deleteColumn(index: number) {
  boardStore.deleteColumn(index)
}

function goToTask(taskId: string) {
  router.push(`/tasks/${taskId}`)
}

function pickupColumn(event: DragEvent, fromColumnIndex: number) {
  if(event.dataTransfer){
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('type', 'column')
    event.dataTransfer.setData('columnIndex', props.columnIndex.toString())
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
  }
}

function pickupTask(event: DragEvent, {fromTaskIndex, fromColumnIndex}: {fromTaskIndex: number, fromColumnIndex: number}) {
  //event.dataTransfer?.setData('taskId', taskId)
  if(event.dataTransfer){
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('type', 'task')
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
    event.dataTransfer.setData('from-task-index', fromTaskIndex.toString())
  }
}

function dropItem(event: DragEvent, {toColumnIndex, toTaskIndex}: {toColumnIndex: number, toTaskIndex?: number}) {
  if(event.dataTransfer){
    const type = event.dataTransfer.getData('type')
    const fromColumnIndex = event.dataTransfer.getData('from-column-index')
    if(type === 'task'){
      
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')
      
      boardStore.moveTask({
        fromColumnIndex: parseInt(fromColumnIndex),
        toTaskIndex,
        fromTaskIndex: parseInt(fromTaskIndex),
        toColumnIndex,
      })
    } else if(type === 'column'){
      const fromColumnIndex = event.dataTransfer.getData('columnIndex')
      boardStore.moveColumn(parseInt(fromColumnIndex), toColumnIndex)
    }
   
  }
}
</script>

<style>

</style>