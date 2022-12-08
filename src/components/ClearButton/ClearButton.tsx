import React from 'react'
import { deleteAllAsync } from '../../asyncActions/todos';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { clearTodosAction } from '../../store/reducers/todoReducer';
import s from './ClearButton.module.css'

const ClearButton: React.FC = () => {
  const {isAuth} = useTypedSelector(state => state.user)

  const deleteAll = () => {
    if (isAuth) dispatch(deleteAllAsync())
    dispatch(clearTodosAction())

  }

  const dispatch = useTypedDispatch()
  return (
    <button className={s.clearButton} onClick={() => {
      deleteAll()
    }}>Clear all</button>
  )
}

export default ClearButton