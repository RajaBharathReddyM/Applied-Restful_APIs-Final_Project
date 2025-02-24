import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await getTasks();
        setTasks(data);
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map(task => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => onEdit(task)}>Edit</button>
                    <button onClick={() => deleteTask(task._id).then(fetchTasks)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;