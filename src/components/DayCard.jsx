import { useState } from 'react';
import moment from 'moment';
moment.locale('en')

export function DayCard ({index, day, month, year, setAppointment, sidebarState, findAppointments, setCurrentDay, hasAppointments}) {
    const [clickTimeout, setClickTimeout] = useState(null);

    const currentFormat = 'YYYY-MM-DD'
    const now = moment().format(currentFormat)
    const dateFromDay = moment(`${year}-${month + 1}-${day}`, currentFormat).format(currentFormat)

    const handleClick = () => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        }

        const timeout = setTimeout(() => {
            const date = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD')
            setCurrentDay(date)
            findAppointments(date)
            sidebarState(true);
            setClickTimeout(null);
        }, 200);

        setClickTimeout(timeout);
    }

    const handleDoubleClick = () => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        }
        sidebarState(false)
        const dateFormat = 'YYYY-MM-DDTHH:mm:ss'
        let name = window.prompt("Name of event")
        let time = window.prompt("Time in 24 hour format", "13:00")
        let date = moment(`${year}-${month + 1}-${day} ${time}`, dateFormat).format(dateFormat)

        if (!name && !time) {
            return
        }

        setAppointment({
            time: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
            name: name
        })
    };

    return (
        <div key={index} className={`day${day ? '' : 'empty'}${now == dateFromDay ? ' current-day' : '' }`} onDoubleClick={handleDoubleClick} onClick={handleClick}>
            <a className={`${hasAppointments && ' has-appointments'}`}>{day}</a>
        </div>
    )
}
