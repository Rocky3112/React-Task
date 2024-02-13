import { useState, useEffect } from 'react';

const Problem1 = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState('active');
    const [show, setShow] = useState('all');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('tasks');
        };
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newTask = { name: taskName, status: taskStatus };
        setTasks([...tasks, newTask]);
        setTaskName('');
        
    };

    const handleClick = (all) => {
        setShow(all);
    };

    const filteredTasks = tasks.filter(task => {
        if (show === 'all') return true;
        return task.status === show;
    });
    const statusOrder = { 'active': 1, 'completed': 2 };
    filteredTasks.sort((a, b) => {
        if (a.status !== b.status) {
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return tasks.indexOf(a) - tasks.indexOf(b);
    });

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleFormSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" value={taskName} onChange={e => setTaskName(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" value={taskStatus} onChange={e => setTaskStatus(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
