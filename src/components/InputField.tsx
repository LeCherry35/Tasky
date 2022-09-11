import React from 'react'
import './styles.css'

interface Props{
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>
} 
const InputField: React.FC<Props> = ({todo, setTodo}) => {
  return (
    <form action="" className="input">
      <input type="input" placeholder='enter a task' className='input__box' onChange={(e) => setTodo(e.target.value)}/>
      <button className="input__submit" type='submit'>Go</button>
    </form>
  )
}

export default InputField