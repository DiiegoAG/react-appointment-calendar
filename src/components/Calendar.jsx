import React, { useEffect, useState } from 'react'
import { DayCard } from '../components/DayCard'
import '../Calendar.css'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import useFetch from '../hooks/useFetch'
import Sidebar from './Sidebar'
import '../Sidebar.css'
import moment from 'moment';


export function Calendar () {
    const [localAppointments, setLocalAppointment] = useLocalStorageState('appointments', [])
    const [onlineAppointments, setOnlineAppointments] = useState([])
    const [date, setDate] = useState(new Date())
    const [sidebar, setSidebar] = useState(false);
    const [appointments, setAppointments] = useState(localAppointments)
    const [currentDay, setCurrentDay] = useState()
    let [appointemtsFiltered, setAppointmentsFiltered] = useState([])

    useEffect(() => {
        useFetch('https://altomobile.blob.core.windows.net/api/test.json')
        .then((res) => {
            setOnlineAppointments(current => current.concat(res))
        })
        .catch(() => console.log('Hola')) //catch is not working
    }, [])

    useEffect(() => {
        setAppointments([...localAppointments, ...onlineAppointments]);
      }, [localAppointments, onlineAppointments]);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const daysArray = [...Array(daysInMonth(date.getMonth(), date.getFullYear())).keys()].map(i => i + 1)
    const emptyDays = Array(startDay).fill(null)

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }

    const handleAppointmentsBar = (mode = true) => {
        setSidebar(mode);
    }

    const renderDays = () => {
        return [...emptyDays, ...daysArray].map((day, index) => {
            const hasAppointments = dayHasAppointments(`${date.getFullYear()}-${date.getMonth() + 1}-${day}`)

            return (
                <DayCard key={index} day={day} month={date.getMonth()} year={date.getFullYear()} setAppointment={postAppointment} sidebarState={handleAppointmentsBar} findAppointments={findAppointments} setCurrentDay={setCurrentDay} hasAppointments={hasAppointments}></DayCard>
            )
        })
    }

    const dayHasAppointments = (date) => {
        return appointments.some((appointment) => {
            return moment(appointment.time, 'YYYY-MM-DD').isSame(date, 'day')
        })
    }

    const postAppointment = (appointment) => {
        const newList = [...localAppointments, appointment]
        setLocalAppointment(newList)
    }

    const findAppointments = (date) => {
        const result = appointments.filter(appointment => moment(appointment.time, 'YYYY-MM-DD').isSame(date, 'day')).sort((a, b) => {
            return moment(a.time).isBefore(moment(b.time)) ? -1 : 1;
        });
        setAppointmentsFiltered(result.sort())
    }


    return (
        <div className="calendario">
            <div className="header">
                <div className="arrows-container">
                    <button onClick={handlePrevMonth}>&lt;</button>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="title-container">
                    <h2>{date.toLocaleDateString('en-EN', { month: 'long', year: 'numeric' })}</h2>
                </div>
            </div>
            <div className="days-of-week">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                    <div key={day} className="day-name">{day}</div>
                ))}
            </div>
            <div className="days">
                {renderDays()}
            </div>
            <Sidebar isOpen={sidebar} setIsOpen={handleAppointmentsBar} appointments={appointemtsFiltered} date={currentDay}/>
        </div>
    );
}
