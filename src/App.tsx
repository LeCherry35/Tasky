import React from 'react';
import { useState } from 'react';
// import FullCalendar from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './App.css';
import InputField from './components/InputField';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('')

  console.log(todo)
  return (
    <div className="App">
      <span className="heading">Tasky</span>
      <InputField todo={todo} setTodo={setTodo}/>
    </div>
  );
}

export default App;
