import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks, updateTask } from '../api';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    // Fetch the task data when component loads
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await getTasks();
                const selectedTask = data.find(task => task._id === id);
                console.log("Fetched Task Data:", selectedTask); // Debugging line
                if (selectedTask) {
                    setTask(selectedTask);
                }
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        fetchTask();
    }, [id]);

    const resetTask = () => navigate('/');

    return (
        <div className="container">
            <h2>Edit Task</h2>
            {task ? <TaskForm currentTask={task} resetTask={resetTask} /> : <p>Loading task...</p>}
        </div>
    );
};

export default EditTask;
