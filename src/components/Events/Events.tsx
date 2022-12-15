import React, { useState } from 'react'
import s from './Events.module.css'
import { addEventAsync } from '../../asyncActions/events';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Event from '../SingleUnits/Event';
import NameInputField from '../NameInputField/NameInputField';
import { addEventAction } from '../../store/reducers/eventReducer';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

const Events = () => {
  const { events } = useTypedSelector(state => state.events)
  const { isAuth } = useTypedSelector(state => state.user)

  const [name, setName] = useState<string>('')
  const [startsAt, setStartsAt] = useState(0)

  const dispatch = useTypedDispatch()

  const addEvent = () => {
    const createdAt = new Date().valueOf()
    if( isAuth) {
      dispatch(addEventAsync(name, createdAt, startsAt))
    } else {
      dispatch(addEventAction(name, createdAt, startsAt))
    }
    setName('')
    setStartsAt(0)
  }
  return (
    <div className={s.container}>
      <NameInputField 
        placeholder='enter the name of the event' 
        setText={setName} 
        text={name} 
        onSubmit={addEvent} 
        disabled={(!name) || !(startsAt)} 
      />
        {name && <> 
          <DateTimePicker setDateAndTime={setStartsAt}/>
          </>}
          <div className={s.eventsContainer}>
            {events.map(event => (event.startsAt - Date.now() > 0) ? <Event key={event.createdAt} event={event}/> : <></> )}
          </div>
    </div>
  )
}

export default Events