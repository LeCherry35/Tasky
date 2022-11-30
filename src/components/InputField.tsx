import React, { useState } from 'react'
import './styles.css'
import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { addToodoAction } from '../store/reducers/todoReducer';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addTodoAsync } from '../asyncActions/todos';
import { useTypedDispatch } from '../hooks/useTypedDispatch';

const InputField: React.FC = () => {

  const [todo, setTodo] = useState('')
  const [deadline, setDeadline] = useState('')
  const {isAuth} = useTypedSelector(state => state.user)
  const dispatch = useTypedDispatch()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  const addTodo = () => {
    const createdAt = Date.now()
    if (isAuth) dispatch(addTodoAsync(todo, Date.parse(deadline), createdAt))
    dispatch(addToodoAction(todo, Date.parse(deadline), createdAt))
    setTodo('')
    setDeadline('')
    inputRef.current?.blur()
  }

  return (
    <><form 
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
    {todo && <div className='input__date__container'><label className='input__date_text' htmlFor='date'>Deadline:   </label> <input id='date' className='input__date' type="datetime-local" placeholder='lll' value={deadline} onChange={(e) => {
      setDeadline(e.target.value)
    }}></input></div>}</>
  )
}

export default InputField