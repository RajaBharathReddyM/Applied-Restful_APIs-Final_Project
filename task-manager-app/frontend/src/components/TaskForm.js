import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ currentTask, resetTask }) => {
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        category: 'Other',
        priority: 'Medium',
        dueDate: '',
        completed: false
    });

    // Load task data when editing
    useEffect(() => {
        if (currentTask) {
            setTask(currentTask);
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task._id) {
            await updateTask(task._id, task);
        } else {
            await createTask(task);
        }
        resetTask();
        navigate('/');
    };

    return (
        <div className="task-form-container">
            <h2>{task._id ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={handleSubmit} className="task-form">
                {/* Task Title */}
                <label>Title:</label>
                <input 
                    type="text" 
                    placeholder="Task Title" 
                    value={task.title} 
                    onChange={(e) => setTask({ ...task, title: e.target.value })} 
                    required 
                />

                {/* Task Description */}
                <label>Description:</label>
                <textarea 
                    placeholder="Task Description" 
                    value={task.description} 
                    onChange={(e) => setTask({ ...task, description: e.target.value })} 
                    required 
                />

                {/* Task Category */}
                <label>Category:</label>
                <select 
                    value={task.category} 
                    onChange={(e) => setTask({ ...task, category: e.target.value })}
                >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                </select>

                {/* Task Priority */}
                <label>Priority:</label>
                <select 
                    value={task.priority} 
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                {/* Due Date */}
                <label>Due Date:</label>
                <input 
                    type="date" 
                    value={task.dueDate ? task.dueDate.substring(0, 10) : ''} 
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                />

                {/* Task Completion Checkbox */}
                <label>
                    <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={(e) => setTask({ ...task, completed: e.target.checked })}
                    />
                    Mark as Completed
                </label>

                {/* Submit Button */}
                <button type="submit" className="btn-submit">
                    {task._id ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
