import React, { useState } from 'react'
import s from './Events.module.css'
import { addEventAsync } from '../../asyncActions/events';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import NameInputField from '../NameInputField/NameInputField';
import { addEventAction } from '../../store/reducers/eventReducer';
import EventList from '../EventList/EventList';
import EventTimePicker from '../DateTimePicker/EventTimePicker'

const Events = () => {
  const { isAuth } = useTypedSelector(state => state.user)

  const [name, setName] = useState<string>('')
  const [startsAt, setStartsAt] = useState<number>(0)
  const [endsAt, setEndsAt] = useState<number>(0)

  const dispatch = useTypedDispatch()

  const addEvent = () => {
    const createdAt = new Date().valueOf()
    
    if( isAuth) {
      dispatch(addEventAsync(name, createdAt, startsAt, endsAt))
    } else {
      dispatch(addEventAction(name, createdAt, startsAt, endsAt))
    }
    setName('')
    setStartsAt(0)
    setEndsAt(0)
  }
  return (
    <div className={s.container}>
      <NameInputField 
        placeholder='Enter the name of the event' 
        setText={setName} 
        text={name} 
        onSubmit={addEvent} 
        disabled={(!name) || !(startsAt) || startsAt < new Date().valueOf() || startsAt >= endsAt} 
      />
      {name && <EventTimePicker setStartsAt={setStartsAt} setEndsAt={setEndsAt} />}

      <EventList />
    </div>
  )
}

export default Events