import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTypedSelector } from './hooks/useTypedSelector';
import LoginForm from './components/LoginForm';
import InfoBar from './components/InfoBar';
import { clearTodosAction, dragEndAction } from './store/reducers/todoReducer';
import { checkAuth } from './asyncActions/user';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import ClearButton from './components/ClearButton';
import Calendar from './components/Calendar/Calendar';
import { getTodosAsync } from './asyncActions/todos';
import SideButton from './components/SideButton/SideButton';


const App: React.FC = () => {

  const {todos, completedTodos} = useTypedSelector(state => state.todos)
  const {isAuth} = useTypedSelector(state => state.user)
  const dispatch = useTypedDispatch()
  const onDragEnd = (result:DropResult) => {
    dispatch(dragEndAction(result))
  }

  useEffect(() => {
    if(isAuth) {
      dispatch(getTodosAsync())
    } else {
      dispatch(clearTodosAction())
    }
  },[isAuth, dispatch])

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  }, [dispatch])
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <BrowserRouter>
        
          <InfoBar />
          <LoginForm />
          <span className="heading">Tasky</span>
          <InputField />
          <Routes>
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/' element={<TodoList />}/>
          </Routes>
          {(todos.length !== 0 || completedTodos.length !== 0) && <ClearButton />}
          {window.location.pathname === '/' ? <SideButton name='calendar' location='/calendar'/> : <SideButton name='todos' location='/'/>}
    </BrowserRouter>
      </div>
  </DragDropContext>
  );
}

export default App;
