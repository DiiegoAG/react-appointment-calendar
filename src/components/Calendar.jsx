import React, { useEffect, useState } from 'react'
import { DayCard } from '../components/DayCard'
import '../Calendar.css'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import useFetch from '../hooks/useFetch'

export function Calendar () {
    const [localAppointments, setLocalAppointment] = useLocalStorageState('appointments', [])
    const [onlineAppointments, setOnlineAppointments] = useState([])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        useFetch('https://altomobile.blob.core.windows.net/api/test.json')
            .then((res) => {
                setOnlineAppointments(current => [...current, res])
            })
    }, [])

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

    const renderDays = () => {
        return [...emptyDays, ...daysArray].map((day, index) => (
            <DayCard key={index} day={day} month={date.getMonth()} year={date.getFullYear()} setAppointment={postAppointment}></DayCard>
        ))
    }

    const postAppointment = (appointment) => {
        const newList = [...localAppointments, appointment]
        setLocalAppointment(newList)
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
                <div className='appointments-button-container' onClick={handleAppointmentsBar}>
                    <button>Appointments</button>
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
        </div>
    );
}
