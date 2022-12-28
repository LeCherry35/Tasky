import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTypedSelector } from './hooks/useTypedSelector';
import LoginForm from './components/LoginForm/LoginForm';
import { clearTodosAction, dragEndAction } from './store/reducers/todoReducer';
import { checkAuth } from './asyncActions/user';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import Calendar from './components/Calendar/Calendar';
import { getTodosAsync } from './asyncActions/todos';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import Events from './components/Events/Events';
import { getEventsAsync } from './asyncActions/events';
import Todos from './components/Todos/Todos';
// import SingleDay from './components/SingleDay/SingleDay';


const App: React.FC = () => {
  const {isAuth} = useTypedSelector(state => state.user)
  const dispatch = useTypedDispatch()
  const onDragEnd = (result:DropResult) => {
    dispatch(dragEndAction(result))
  }

  useEffect(() => {
    if(isAuth) {
      dispatch(getTodosAsync())
      dispatch(getEventsAsync())
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
        <div className="bg">Tasky</div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/' element={<Todos />}/>
          <Route path='/auth' element={<LoginForm/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/events' element={<Events/>} />
          {/* <Route path='/day/' element={<SingleDay day={1672178400000}/>} /> */}



        </Routes>
    </BrowserRouter>
      </div>
  </DragDropContext>
  );
}

export default App;
