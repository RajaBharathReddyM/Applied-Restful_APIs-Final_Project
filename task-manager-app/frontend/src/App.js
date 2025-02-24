import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

function App() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Task Manager App</h1>
            
            {/* Navigation Links */}
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/add"> Add Task</Link>
            </nav>

            {/* Define Routes for Pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddTask />} />
                <Route path="/edit/:id" element={<EditTask />} />
            </Routes>
        </div>
    );
}

export default App;
