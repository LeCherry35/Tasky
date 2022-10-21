import React from 'react';
import { useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTypedSelector } from './hooks/useTypedSelector';
import LoginForm from './components/LoginForm';
import InfoBar from './components/InfoBar';
import { dragEndAction } from './store/reducers/todoReducer';
import { checkAuth } from './asyncActions/user';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import ClearButton from './components/ClearButton';

const App: React.FC = () => {

  const {todos, completedTodos} = useTypedSelector(state => state.todos)
  const dispatch = useTypedDispatch()

  const onDragEnd = (result:DropResult) => {
    dispatch(dragEndAction(result))
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  }, [])
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <InfoBar />
        <LoginForm />
        <span className="heading">Tasky</span>
        <InputField />
        <TodoList />
        {(todos.length !== 0 || completedTodos.length !== 0) && <ClearButton />}
      </div>

    </DragDropContext>
  );
}

export default App;
