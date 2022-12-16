import React, { useEffect, useState } from 'react'
import s from './TodoList.module.css'
import ActiveTodo from '../SingleUnits/ActiveTodo';
import { Droppable } from 'react-beautiful-dnd';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CompletedTodo from '../SingleUnits/CompletedTodo';
import NameInputField from '../NameInputField/NameInputField';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { addTodoAsync } from '../../asyncActions/todos';
import { addToodoAction } from '../../store/reducers/todoReducer';
import DateTimePicker from '../DateTimePicker/DateTimePicker';



const TodoList: React.FC = () => {
  
  const [completedIsHidden,setCompletedIsHidden] = useState<boolean>(true)
  const [newTodo,setNewTodo] = useState('')
  const [deadline,setDeadline] = useState(0)
  const [isDeadlineInputShown, setIsDeadlineInputShown] = useState(false)

  const {todos, completedTodos} = useTypedSelector(state => state.todos)
  const {isAuth} =useTypedSelector(state => state.user)
  const toggleRemoved = () => {
    setCompletedIsHidden(!completedIsHidden)
  }

  const dispatch = useTypedDispatch()

  useEffect(() => {
    if(todos.length === 0 && completedTodos.length !== 0) {
      setCompletedIsHidden(false)
    } 
  }, [todos.length, completedTodos.length])
  
  const addTodo = () => {
    const createdAt = Date.now()
    if (isAuth) dispatch(addTodoAsync(newTodo, new Date(deadline).valueOf(), createdAt))
    dispatch(addToodoAction(newTodo, new Date(deadline).valueOf(), createdAt))
    setNewTodo('')
    setDeadline(0)
    setIsDeadlineInputShown(false)
  }

  return (
    <div className={s.container}>
    {/* <InputField /> */}
    <NameInputField 
      placeholder='Enter a task' 
      text={newTodo} 
      setText={setNewTodo} 
      onSubmit={addTodo}
      disabled={!newTodo}
    />
    <div className={s.deadlineContainer}>
      {newTodo && <div className={s.deadlineInfo} onClick={() => setIsDeadlineInputShown(b => !b) }>deadline{isDeadlineInputShown ? ':' : '?'}</div>}
      {isDeadlineInputShown && <DateTimePicker setDateAndTime={setDeadline}/>}
    </div>
    
    <div className={s.todosContainer}>
      
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className={`${s.todos} ${todos.length !== 0 ? s.shown : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`${s.todos__heading} ${snapshot.isDraggingOver ? 'dragactive' : ''}`}>
                Active tasks
                <span className={s.arrow} onClick={() => {toggleRemoved()}}>{completedIsHidden && completedTodos.length !== 0 ? <MdOutlineArrowForwardIos/> : ''}</span>
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
            <div className={`${s.todos} ${!completedIsHidden && completedTodos.length !== 0 ? s.shown : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`${s.todos__heading} ${snapshot.isDraggingOver ? 'dragcompleted' : ''}`}>
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
    </div>
  )
}

export default TodoList