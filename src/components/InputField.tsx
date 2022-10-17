import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import './styles.css'
import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { addToodoAction } from '../store/reducers/todoReducer';
import TodoService from '../services/TodoServices';
import { useTypedSelector } from '../hooks/useTypedSelector';

const InputField: React.FC = () => {

  const [todo, setTodo] = useState('')
  const {isAuth, user} = useTypedSelector(state => state.user)
  const dispatch = useDispatch()
  // const addTodo = (todo: string) => {
  //   dispatch(addToodoAction(todo))
  //   setTodo('')
  // }
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  return (
    <form 
      className="input" 
      onKeyDown={(e) => {
        if(e.code === 'Enter') {
          // addTodo(todo)
          inputRef.current?.blur()
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
            // addTodo(todo)
            TodoService.addTodo(todo, user.id)
            inputRef.current?.blur()
          }}
        >Add</button>
        : <></>
      }
    </form>
  )
}

export default InputField