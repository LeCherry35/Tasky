import React from 'react';
import { useState } from 'react';
import { Todo } from './model'
// import FullCalendar from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './App.css';
import InputField from './components/InputField';
import { preventDefault } from '@fullcalendar/react';
import TodoList from './components/TodoList';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
      setTodo('')
      
    }
  }

  return (
    <div className="App">
      <span className="heading">Tasky</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
