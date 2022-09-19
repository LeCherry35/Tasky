import React from 'react';
import { useState } from 'react';
import { Todo } from './model'
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import ClearButton from './components/ClearButton';

const App: React.FC = () => {

  const initTodosJSON: string | null = localStorage.getItem('todos')
  const initTodos: Todo[] = initTodosJSON ? JSON.parse(initTodosJSON) : []
  const initCompletedTodosJSON: string | null = localStorage.getItem('completedTodos')
  const initCompletedTodos: Todo[] = initCompletedTodosJSON ? JSON.parse(initCompletedTodosJSON) : []


 
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>(initTodos)
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(initCompletedTodos)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
      setTodo('')
      
    }
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    let add, 
      active = todos,
      completed = completedTodos
    
    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = completed[source.index]
      completed.splice(source.index, 1)
    }
    
    if (destination.droppableId === 'TodosList') {
      add.isDone = false
      active.splice(destination.index, 0, add)
    } else {
      add.isDone = true
      completed.splice(destination.index, 0, add)
    }
    setCompletedTodos(completed)
    setTodos(active)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasky</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
        { todos.length !== 0 || completedTodos.length !== 0 
          ? <ClearButton setTodos={setTodos} setCompletedTodos={setCompletedTodos}/>
          : <></>}
      </div>

    </DragDropContext>
  );
}

export default App;
