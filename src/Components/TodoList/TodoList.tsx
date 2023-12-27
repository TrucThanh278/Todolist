import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

type HandleNewTodo = (todo: Todo[]) => Todo[]

const syncDataToLocalStorage = (handler: HandleNewTodo) => {
  const oldTodos = JSON.parse(localStorage.getItem('todos') || '[]')
  const newTodos = handler(oldTodos)
  localStorage.setItem('todos', JSON.stringify(newTodos))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  //Khi app được mounted lần đầu tiên thì nó sẽ data của todos trong localStorage ra
  useEffect(() => {
    const oldTodos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(oldTodos)
  }, [])

  const addTodo = (nameTodo: string) => {
    const todo: Todo = {
      done: false,
      name: nameTodo,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])

    // Sau khi add todoItem mới vào todos thì set todos mới vào trong local storage
    // Lần đầu lấy ra todos trong local storage thì có thể nó chưa có nên cho nó là mảng rỗng
    const handler = (oldTodos: Todo[]) => {
      return [...oldTodos, todo]
    }
    syncDataToLocalStorage(handler)
  }

  const handleCheckbox = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  // Đưa todoitem đang ở taskList lên ô input để edit
  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  // Lúc này đang chỉnh sửa todoitem trên ô input, sửa đến đâu set currentTodo đến đó
  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  // Lúc này là nhấn nút ✔ để hoàn thành edit todoitem và clear ô input
  const finishEditTodo = () => {
    const handler = (oldTodos: Todo[]) => {
      return oldTodos.map((todo: Todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncDataToLocalStorage(handler)
  }

  const deleteTodo = (id: string) => {
    const handler = (prev: Todo[]) => {
      const findedIndexTodo = prev.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...prev]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return prev
    }
    if (currentTodo) setCurrentTodo(null)
    setTodos(handler)
    syncDataToLocalStorage(handler)
  }

  console.log(todos)
  // console.log( React.ComponentType)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          doneTaskList={false}
          todos={notDoneTodos}
          handleTodo={handleCheckbox}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList={true}
          todos={doneTodos}
          handleTodo={handleCheckbox}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
