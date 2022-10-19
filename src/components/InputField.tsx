import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import './styles.css'
import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { addToodoAction } from '../store/reducers/todoReducer';
import TodoService from '../services/TodoServices';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addTodoAsync } from '../asyncActions/todos';
import { useTypedDispatch } from '../hooks/useTypedDispatch';

const InputField: React.FC = () => {

  const [todo, setTodo] = useState('')
  const {isAuth, user} = useTypedSelector(state => state.user)
  const dispatch = useTypedDispatch()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  const addTodo = () => {
    const id = Date.now()
          dispatch(addTodoAsync(todo, user.id, id))
          dispatch(addToodoAction(todo, id))
          setTodo('')
          inputRef.current?.blur()
  }

  return (
    <form 
      className="input" 
      onKeyDown={(e) => {
        if(e.code === 'Enter') {
          addTodo()
        }
      }}
    >
      
      <TextareaAutosize 
        ref={inputRef}
        className='input__box' 
        placeholder='enter a task' 
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value)
        }}
      />
      {todo 
        ? <button 
          ref={submitRef} 
          className='input__submit'
          onClick={(e) => {
            e.preventDefault()
            addTodo()
          }}
        >Add</button>
        : <></>
      }
    </form>
  )
}

export default InputField