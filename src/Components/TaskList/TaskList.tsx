import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  handleTodo: (x: string, y: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (x: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleTodo, startEditTodo, deleteTodo } = props

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <ul className={styles.tasks}>
        {todos.map((todo) => {
          return (
            <li className={styles.task} key={todo.id}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={todo.done}
                onChange={(e) => handleTodo(todo.id, e.target.checked)}
              />
              <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                  🖊
                </button>
                <button
                  className={styles.taskBtn}
                  onClick={() => {
                    deleteTodo(todo.id)
                  }}
                >
                  🗑
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
