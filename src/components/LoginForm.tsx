import React, {FC, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AuthService from '../services/AuthServises'

// const registration = (email: string, password: string) => {
//     return (dispatch: (arg: any) => {}) => {
//         dispatch({ type: 'START_LOADING' }); 
//         AuthService.registration(email, password).then(response => {
//             dispatch({ type: 'WRITE_TOKEN', payload: 'token___' }); 
//             dispatch({ type: 'STOP_LOADING' });
//         })
//     }
// }

const LoginForm: FC = () => {
    
        const dispatch = useDispatch();
        const [email,setEmail] = useState<string>('')
        const [password,setPassword] = useState<string>('')
        const {isAuth, user} = useTypedSelector(state => state.user)
        const {shown} = useTypedSelector(state => state.authPanel) 
    
        const login = async (email: string, password: string) => {
            try {
                const response = await AuthService.login(email, password)
                console.log(response);
                localStorage.setItem('token', response.data.accessToken)
                dispatch({type: 'SET_USER', payload: response.data.user})
            } catch (e: any) {
                console.log(e.response?.data?.message);
                
            }

    }
    const register = async (email: string, password: string) => {
        try {
            const response = await AuthService.registration(email, password)   
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: 'SET_USER', payload: response.data.user}) 
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }    
    }

    const logout = async () => {
        const response = await AuthService.logout()   
        localStorage.removeItem('token')
        dispatch({type: 'UNSET_USER'})
    }

    return (
        <div 
            className={shown ? "user user--shown" : 'user'}
            onMouseLeave={() => {
                dispatch({type: 'HIDE_PANEL'})
            }}>
            {isAuth 
            ?<> <button onClick={() => {
                logout()
            }}>LOG OUT</button></>
            : <>
            <form className='user__box'>
                <input
                    className='user__input'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}    
                    value={(email)}
                    type='text'
                />
                <input
                    className='user__input'
                    placeholder='Pass'
                    onChange={e => setPassword(e.target.value)}    
                    value={(password)}
                    type='text'
                />
                <button className='user__button' onClick={(e) => {
                    e.preventDefault()
                    register(email, password)
                    console.log('reg');
                    
                    dispatch({type: 'HIDE_PANEL'})
                }}>REG</button>
                <button className='user__button' onClick={(e) => {
                    e.preventDefault()
                    login(email, password)
                    dispatch({type: 'HIDE_PANEL'})
                }}>LOG</button>

            </form>
            </>}
        </div>
    )
}

export default LoginForm