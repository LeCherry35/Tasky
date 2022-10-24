import React , {FC} from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { showPanel } from '../store/reducers/authPanelReducer';

const InfoBar: FC = () => {
    
    
    const {isAuth, user} = useTypedSelector(state => state.user) 
    
const dispatch = useDispatch()

    return (
        <>
        {isAuth
            ? <div 
            className='infobar'
            onClick={() => {
                dispatch(showPanel())
        }}> {user.isActivated
            ? user.email
            : 'Please activate your account'} </div>
        : <div 
        className='infobar infobar--warning'
        onMouseEnter={() => {
            dispatch(showPanel())
        }}>Please log in</div>
        }</>
    )
}

export default InfoBar