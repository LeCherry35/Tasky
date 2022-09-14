import React from 'react'
import './styles.css'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className='todos' ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`todos__heading ${snapshot.isDraggingOver ? 'dragactive' : ''}`}>Active tasks</span>
              {todos.map((todo, id) => <SingleTodo index={id} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} othTodos={completedTodos} setOthTodos={setCompletedTodos}/>)}
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>
      
      <Droppable droppableId='CompletedTodosList'>
        {
          (provided, snapshot) => (
            <div className='todos remove' ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`todos__heading ${snapshot.isDraggingOver ? 'dragcompleted' : ''}`}>Completed tasks</span>
              {completedTodos.map((todo, id) => <SingleTodo index={id} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} othTodos={todos} setOthTodos={setTodos}/>)}
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>
    </div>
  )
}

export default TodoList