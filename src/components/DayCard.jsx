import moment from 'moment';
moment.locale('en')

export function DayCard ({index, day, month, year, setAppointment}) {
    const handleClick = () => {
        const dateFormat = 'YYYY-MM-DDTHH:mm:ss'
        let name = window.prompt("Name of event")
        let time = window.prompt("Time in 24 hour format", "13:00")

    return (
        <div key={index} className={`day ${day ? '' : 'empty'}`} onClick={handleClick}>
            <a>{day}</a>
        </div>
    )
}
