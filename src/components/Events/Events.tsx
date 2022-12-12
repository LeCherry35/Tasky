import React, { useState } from 'react'
import DateInput from '../DateInput/DateInput'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Events.module.css'
import { addEventAsync } from '../../asyncActions/events';
import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE } from '../../configs/calendar';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Event from '../Todo/Event';
import NameInputField from '../NameInputField/NameInputField';

const Events = () => {
  const { events } = useTypedSelector(state => state.events)
  const [date,setDate] = useState<number>(0)
  const [name,setName] = useState<string>('')
  const [time,setTime] = useState<string>('')

  const dispatch = useTypedDispatch()

  const addEvent = () => {
    const startsAt = date + +time.split(':')[0] * MILISECONDS_IN_HOUR + +time.split(':')[1] * MILISECONDS_IN_MINUTE
    dispatch(addEventAsync(name, startsAt))
    setDate(0)
    setName('')
    setTime('')
  }
  return (
    <div className={s.container}>
      <NameInputField 
        placeholder='enter the name of the event' 
        setText={setName} 
        text={name} 
        onSubmit={addEvent} 
        disabled={(!date) || (!name) || !(time)} 
      />
        {name && <> 
          <div className={s.dateAndTime}>
              {date
                  ? new Date(date).toDateString() + '  '
                  : 'select date '}
              {time
                  ? time
                  : `${date ? ' select time:' : ' and time' }`}
              <input type='time' className={s.timePicker} onChange={(e) => setTime(e.target.value)}/>
          </div>
          <DateInput pickedDate={date} setPickedDate={setDate}/>
          </>}
          <div className={s.eventsContainer}>
            {events.sort((a,b) => b.startsAt - a.startsAt).map(event => (Date.now() - event.startsAt) > 0 ? <Event key={event.createdAt} event={event}/> : <></>)}
          </div>
    </div>
  )
}

export default Events