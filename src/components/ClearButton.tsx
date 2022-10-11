import React from 'react'
import './styles.css'
import { Todo } from '../types/Todo'

interface Props {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const ClearButton: React.FC<Props> = ({setTodos, setCompletedTodos}) => {
  return (
    <button className='clear-button' onClick={() => {
        setTodos([])
        setCompletedTodos([])
        localStorage.clear()
    }}>Clear all</button>
  )
}

export default ClearButton