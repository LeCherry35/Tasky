import React, { useEffect, useState } from 'react'
import './styles.css'
import ActiveTodo from './ActiveTodo';
import { Droppable } from 'react-beautiful-dnd';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import { useTypedSelector } from '../hooks/useTypedSelector';
import CompletedTodo from './CompletedTodo';



const TodoList: React.FC = () => {
  
  const {todos, completedTodos} = useTypedSelector(state => state.todos)
  const [completedIsHidden,setCompletedIsHidden] = useState<boolean>(true)
  
  const toggleRemoved = () => {
    setCompletedIsHidden(!completedIsHidden)
  }
  useEffect(() => {
    if(todos.length === 0 && completedTodos.length !== 0) {
      setCompletedIsHidden(false)
    } 
  }, [todos.length, completedTodos.length])
  
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className={`todos ${todos.length !== 0 ? 'shown' : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`todos__heading ${snapshot.isDraggingOver ? 'dragactive' : ''}`}>
                Active tasks
                <span className='arrow' onClick={() => {toggleRemoved()}}>{completedIsHidden && completedTodos.length !== 0 ? <MdOutlineArrowForwardIos/> : ''}</span>
              </span>
              
              {todos.map((todo, id) => <ActiveTodo index={id} todo={todo} key={todo.createdAt}/>)}
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>
      
      <Droppable droppableId='CompletedTodosList'>
        {
          (provided, snapshot) => (
            <div className={`todos ${!completedIsHidden && completedTodos.length !== 0 ? 'shown' : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`todos__heading ${snapshot.isDraggingOver ? 'dragcompleted' : ''}`}>
                {!completedIsHidden ? 'Completed tasks' : ''}
                {!completedIsHidden && todos.length !== 0 ? <span className='arrow' onClick={() => {toggleRemoved()}}><MdOutlineArrowBackIos/></span> : ''}
              </span>
              {completedTodos.map((todo, id) => <CompletedTodo index={id} todo={todo} key={todo.createdAt}/>)}
              {provided.placeholder}
            </div>
          )
        }

      </Droppable>
    </div>
  )
}

export default TodoList