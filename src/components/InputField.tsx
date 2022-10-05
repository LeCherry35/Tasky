import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import './styles.css'
import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const InputField: React.FC = () => {

  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const addTodo = (todo: string) => {
    dispatch({type: 'ADD_TODO', payload: {id: Date.now(), todo: todo, isDone: false}})
    setTodo('')
  }
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  return (
    <form 
      className="input" 
      onKeyDown={(e) => {
        if(e.code === 'Enter') {
          addTodo(todo)
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
            addTodo(todo)
            inputRef.current?.blur()
          }}
        >Add</button>
        : <></>
      }
    </form>
  )
}

export default InputField