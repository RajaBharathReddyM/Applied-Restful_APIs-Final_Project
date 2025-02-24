import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await getTasks();
        setTasks(data);
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <button onClick={() => navigate('/add')}>➕ Add Task</button>

            {tasks.length === 0 && <p>No tasks available.</p>}

            {tasks.map(task => (
                <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => navigate(`/edit/${task._id}`)}>✏️ Edit</button>
                    <button onClick={() => deleteTask(task._id).then(fetchTasks)}>🗑️ Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Home;
