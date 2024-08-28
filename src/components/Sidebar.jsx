import moment from 'moment';
import '../Sidebar.css';

const Sidebar = ({isOpen, setIsOpen, appointments, date}) => {
    const toggleSidebar = () => {
        setIsOpen(false);
    };

    const renderAppointments = () => {
        if (! appointments.length)
            return <div className='row-flex'>
                <i className="fa-solid fa-magnifying-glass"></i> There is nothing, yet!
            </div>

        return appointments.map((appointment, index) => (
            <div key={index}>
                <div className='appointment-card'>
                    <div className='row-flex'>
                        <i className="fa-solid fa-pencil"></i>
                        <b>{appointment.name}</b><br/>
                    </div>
                    <div className='row-flex'>
                        <i className="fa-regular fa-clock"></i>
                        {moment(appointment.time, "YYYY-MM-DDTH:mm:ss").format("MMMM Do YYYY, h:mm a")}
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className={`${isOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar">
                <button onClick={toggleSidebar} className="close-button">
                    &times;
                </button>
                <h3>Appointmets for<br/>{date}</h3>
                {renderAppointments()}
            </div>
        </div>
    );
};

export default Sidebar;
