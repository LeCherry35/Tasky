import React from 'react'
import './styles.css'
import { Todo } from '../types/Todo'
import { deleteAllAsync } from '../asyncActions/todos';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { clearTodosAction } from '../store/reducers/todoReducer';

const ClearButton: React.FC = () => {
  const {isAuth, user} = useTypedSelector(state => state.user)

  const deleteAll = () => {
    if (isAuth) dispatch(deleteAllAsync(user.id))
    dispatch(clearTodosAction())

  }

  const dispatch = useTypedDispatch()
  return (
    <button className='clear-button' onClick={() => {
      deleteAll()
    }}>Clear all</button>
  )
}

export default ClearButton