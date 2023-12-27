import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import connect, { ExtraInfoType } from '../../HOC/connect'

interface TaskInputProps {
  addTodo: (x: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

function TaskInput(props: TaskInputProps) {
  const [name, setName] = useState<string>('')
  const { addTodo, currentTodo, editTodo, finishEditTodo, debug, log } = props

  log(debug)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      if (name.trim() === '') {
        console.log('Please enter a name')
      }
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>Todo List Typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔' : 'Add'}</button>
      </form>
    </div>
  )
}

// console.log(connect(TaskInput))

export default connect<TaskInputProps>((props) => {
  const {} = props
})
