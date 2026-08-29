import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map(todo => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))
        .reduce((acc, cur, index) => [...acc, <hr key={`separator-${index}`} />, cur], [])}
    </>
  )
}

export default TodoList
