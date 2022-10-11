import React from 'react';
import { useEffect } from 'react';
import { Todo } from './types/Todo'
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import ClearButton from './components/ClearButton';
import { useTypedSelector } from './hooks/useTypedSelector';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AuthResponse } from './models/response/AuthResponse';
import { API_URL } from './http';
import InfoBar from './components/InfoBar';
import { dragEndAction } from './store/reducers/todoReducer';

const App: React.FC = () => {



  // const initTodosJSON: string | null = localStorage.getItem('todos')
  // const initTodos: Todo[] = initTodosJSON ? JSON.parse(initTodosJSON) : []
  // const initCompletedTodosJSON: string | null = localStorage.getItem('completedTodos')
  // const initCompletedTodos: Todo[] = initCompletedTodosJSON ? JSON.parse(initCompletedTodosJSON) : []


 
  // const [todo, setTodo] = useState<string>('')
  // const [todos, setTodos] = useState<Todo[]>(initTodos)
  // const [completedTodos, setCompletedTodos] = useState<Todo[]>(initCompletedTodos)

  const {todos, completedTodos} = useTypedSelector(state => state.todos)
  const dispatch = useDispatch()

  const onDragEnd = (result:DropResult) => {
    dispatch(dragEndAction(result))
  }

  const checkAuth = async () => {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    console.log(response);
    localStorage.setItem('token', response.data.accessToken)
    dispatch({type: 'SET_USER', payload: response.data.user})
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      checkAuth()
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
        {/* { todos.length !== 0 || completedTodos.length !== 0 
          ? <ClearButton setTodos={setTodos} setCompletedTodos={setCompletedTodos}/>
          : <></>} */}
      </div>

    </DragDropContext>
  );
}

export default App;
