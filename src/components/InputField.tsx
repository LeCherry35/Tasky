import React from 'react'
import './styles.css'
import { useRef } from 'react'

interface Props{
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void
} 
const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

  const submitRef = useRef<HTMLButtonElement>(null)
  return (
    <form 
      className="input" 
      onSubmit={(e) => {
        handleAdd(e)
      }}
      onFocus={(e) => {
        if(e.target.classList.contains('input__box')) {
          e.target.classList.add('input__box_focus')
          submitRef.current?.classList.add('input__submit_focus')
        }
      }}
      onBlur={(e) => {
        setTimeout(() => {
          if(e.target.classList.contains('input__box')) {
            e.target.classList.remove('input__box_focus')
            submitRef.current?.classList.remove('input__submit_focus')
          }
        }, 300)
      }}
    >
      <input 
        type="input" 
        value={todo}
        placeholder='enter a task' 
        className='input__box' 
        onChange={(e) => {
          setTodo(e.target.value)
          if(todo) {
            if(submitRef.current != undefined) {submitRef.current.disabled = false}
          } else {
            if(submitRef.current != undefined) {submitRef.current.disabled = true}
          }
        }} 
      />
      <button ref={submitRef} className="input__submit" type='submit'>Go</button>
    </form>
  )
}

export default InputField