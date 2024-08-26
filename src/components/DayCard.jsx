import moment from 'moment';
moment.locale('en')

export function DayCard ({index, day, month, year, setAppointment}) {
    const currentFormat = 'YYYY-MM-DD'
    const now = moment().format(currentFormat)
    const dateFromDay = moment(`${year}-${month + 1}-${day}`, currentFormat).format(currentFormat)

    const handleClick = () => {
        const dateFormat = 'YYYY-MM-DDTHH:mm:ss'
        let name = window.prompt("Name of event")
        let time = window.prompt("Time in 24 hour format", "13:00")
        let date = moment(`${year}-${month}-${day} ${time}`, dateFormat).format(dateFormat)

        if (!name && !time) {
            return
        }

        setAppointment({
            time: moment(date).format('YYYY-MM-DDTh:mm:ss'),
            name: name
        })
    }

    return (
        <div key={index} className={`day${day ? '' : 'empty'}${now == dateFromDay ? ' current-day' : '' }`} onDoubleClick={handleClick}>
            <a>{day}</a>
        </div>
    )
}
