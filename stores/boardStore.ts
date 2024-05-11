import { defineStore } from 'pinia'
import boardData from '~/data/board.json'
import {useStorage} from '@vueuse/core'

export const useBoardStore = defineStore('boardStore', () => {
  const board = useStorage('board', boardData);

  const getTask = computed(() => {
    // get task by id
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find(task => task.id === taskId);
        if (task) {
          return task;
        }
      }
    }
  })

  function addTask(columnIndex: number, taskName: string) {
    board.value.columns[columnIndex].tasks.push({
      id: Date.now().toString(),
      name: taskName,
      description: ''
    
    });
  }

  function deleteTask(taskId: number) {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId.toString());
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        return;
      }
    }
  }

  function moveTask({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}: {fromTaskIndex: number, toTaskIndex: number, fromColumnIndex: number, toColumnIndex: number}){
    const task = board.value.columns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0];
    board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
    //board.value.columns[toColumnIndex].tasks.push(task);
  }
  
  function addColumn(columnName: string) {
    board.value.columns.push({
      id: Date.now().toString(),
      name: columnName,
      tasks: [],
    });
  }

  function moveColumn(fromIndex: number, toIndex: number) {
    const column = board.value.columns.splice(fromIndex, 1)[0];
    board.value.columns.splice(toIndex, 0, column);
  }

  function deleteColumn(index: number) {
    board.value.columns.splice(index, 1);
  }

  return {
    board,
    addColumn,
    deleteColumn,
    getTask,
    addTask,
    deleteTask,
    moveTask,
    moveColumn
  }
})
