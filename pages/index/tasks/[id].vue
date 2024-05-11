<template>
  <div class="task-wrapper">
    <div class="task-view" >
     <section v-if="task" class="flex flex-col justify-center w-full">
        <UFormGroup label="Task Name" class="w-full mb-5">
          <UInput type="text" v-model="task.name" />
        </UFormGroup>
        <UFormGroup label="Description" class="w-full mb-4">
          <UTextarea type="text" v-model="task.description" />
        </UFormGroup>
        <UButton icon="i-heroicons-trash" @click="deleteTask" color="red" class="flex items-center justify-center p-1 ml-2 w-[25%]">Delete Task</UButton>
     </section>
     <section v-else>
        <h3>Task not found</h3>
     </section>
    </div>
    
  </div>
</template>

<script setup>
import {useBoardStore} from '~/stores/boardStore'

const boardStore = useBoardStore()
const route = useRoute()
const router = useRouter()

const task = computed(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  return boardStore.getTask(id);
})
const taskId = computed(() => {
  return Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
})

function deleteTask() {
  boardStore.deleteTask(taskId.value)
  router.push('/')
}

</script>

<style>

</style>