import React, { useState } from 'react'
import s from './Todos.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import NameInputField from '../NameInputField/NameInputField';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { addTodoAsync } from '../../asyncActions/todos';
import { addToodoAction } from '../../store/reducers/todoReducer';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import TodoList from '../TodoList/TodoList';

const Todos = () => {

  const [newTodo,setNewTodo] = useState('')
  const [deadline,setDeadline] = useState(0)
  const [isDeadlineInputShown, setIsDeadlineInputShown] = useState(false)
  const dispatch = useTypedDispatch()
  const {isAuth} =useTypedSelector(state => state.user)

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
      <TodoList />
    </div>
  )
}

export default Todos