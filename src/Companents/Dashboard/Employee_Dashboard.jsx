import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaHourglassHalf, FaClipboardList, FaEnvelope, FaUser, FaBell } from 'react-icons/fa';
import { useAuthContext } from '../../Context/AuthContext';
import NewTask from '../TaskList/NewTask';
import CompleteTask from '../TaskList/CompleteTask';
import AcceptedTask from '../TaskList/AcceptedTask';
import FailedTask from '../TaskList/FailedTask';
// REMOVED: import NetworkAnalysis from './NetworkAnalysis';

const navLinks = [
  { name: 'Dashboard', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" /></svg>
  ) },
  { name: 'Tasks', icon: (
    <FaClipboardList className="w-6 h-6" />
  ) },
  { name: 'Profile', icon: (
    <FaUser className="w-6 h-6" />
  ) },
  { name: 'Settings', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
  ) },
  { 
    name: 'Network Analysis', 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) 
  },
];

const getStatus = (task) => {
  if (task.completed) return { label: 'Completed', color: 'bg-green-100 text-green-700', icon: <FaCheckCircle className="text-green-500 mr-1" /> };
  if (task.failed) return { label: 'Failed', color: 'bg-red-100 text-red-700', icon: <FaExclamationCircle className="text-red-500 mr-1" /> };
  if (task.newTask) return { label: 'New', color: 'bg-blue-100 text-blue-700', icon: <FaHourglassHalf className="text-blue-500 mr-1" /> };
  if (task.active) return { label: 'Accepted', color: 'bg-yellow-100 text-yellow-700', icon: <FaHourglassHalf className="text-yellow-500 mr-1" /> };
  return { label: 'Unknown', color: 'bg-gray-100 text-gray-700', icon: null };
};

const EmployeeDashboard = ({ user, onLogout }) => {
  const { employees, updateTaskStatus } = useAuthContext();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [notification, setNotification] = useState(null);
  const [prevTaskCount, setPrevTaskCount] = useState(0);
  
  // Get current employee data from context
  const currentEmployee = employees.find(emp => emp.email === user?.email);
  const taskList = currentEmployee?.tasks || [];
  const newTaskCount = taskList.filter(t => t.newTask).length;

  // Check for new tasks and show notification
  useEffect(() => {
    if (newTaskCount > prevTaskCount && prevTaskCount > 0) {
      setNotification({
        type: 'success',
        message: `You have ${newTaskCount - prevTaskCount} new task(s) assigned!`,
        title: 'New Task Assigned'
      });
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    setPrevTaskCount(newTaskCount);
  }, [newTaskCount, prevTaskCount]);

  const acceptedTasks = taskList.filter(t => t.active && !t.completed && !t.failed && !t.newTask);
  const completedTasks = taskList.filter(t => t.completed);
  const failedTasks = taskList.filter(t => t.failed);
  const newTasks = taskList.filter(t => t.newTask);

  // Summary card data
  const summaryCards = [
    { label: 'New Task', value: newTasks.length, color: 'bg-blue-400', text: 'text-white' },
    { label: 'Completed', value: completedTasks.length, color: 'bg-green-400', text: 'text-white' },
    { label: 'Accepted', value: acceptedTasks.length, color: 'bg-yellow-300', text: 'text-gray-900' },
    { label: 'Failed', value: failedTasks.length, color: 'bg-red-400', text: 'text-white' },
  ];

  // Handlers for updating task status using context
  const handleTaskCompleted = (id, source) => {
    if (!currentEmployee) return;
    
    let newStatus = 'completed';
    if (source === 'new') {
      newStatus = 'completed';
    } else if (source === 'accepted') {
      newStatus = 'completed';
    }
    
    updateTaskStatus(currentEmployee.id, id, newStatus);
  };

  const handleTaskFailed = (id, source) => {
    if (!currentEmployee) return;
    
    let newStatus = 'failed';
    if (source === 'new') {
      newStatus = 'failed';
    } else if (source === 'accepted') {
      newStatus = 'failed';
    }
    
    updateTaskStatus(currentEmployee.id, id, newStatus);
  };

  const handleTaskAccepted = (id) => {
    if (!currentEmployee) return;
    updateTaskStatus(currentEmployee.id, id, 'active');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-100 flex flex-col py-8 px-4 animate-fade-in">
        <div className="flex items-center mb-10">
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Employee</span>
        </div>
        <nav className="flex-1 space-y-2 mb-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-150 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 focus:outline-none ${activeNav === link.name ? 'bg-blue-100 text-blue-700' : ''}`}
              onClick={() => setActiveNav(link.name)}
            >
              <span className="mr-3 relative">
                {link.icon}
                {link.name === 'Tasks' && newTaskCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {newTaskCount}
                  </span>
                )}
              </span>
              {link.name}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto animate-fade-in">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${
            notification.type === 'success' 
              ? 'bg-green-100 border-green-500 text-green-700' 
              : 'bg-red-100 border-red-500 text-red-700'
          } animate-slide-in-right`}>
            <div className="flex items-center gap-2">
              <FaBell className="text-lg" />
              <div>
                <div className="font-semibold">{notification.title}</div>
                <div className="text-sm">{notification.message}</div>
              </div>
              <button 
                className="ml-4 text-lg hover:opacity-70" 
                onClick={() => setNotification(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-lg text-gray-600">Hello,</div>
            <div className="text-2xl font-extrabold text-blue-700 flex items-center gap-2">
              {user?.firstName || 'Employee'} <span role="img" aria-label="wave">👋</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm shadow transition-all" onClick={onLogout}>Log Out</button>
        </div>
        {/* Summary Cards (only on Dashboard) */}
        {activeNav === 'Dashboard' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`rounded-2xl p-6 flex flex-col items-start shadow-md ${card.color} ${card.text} font-semibold text-lg min-h-[90px] hover:shadow-xl transition-all duration-200 border border-gray-100 animate-fade-in`}
              >
                <span className="text-3xl font-bold">{card.value}</span>
                <span className="text-sm mt-1">{card.label}</span>
              </div>
            ))}
          </div>
        )}
        {/* Task List (only on Tasks) */}
        {activeNav === 'Tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NewTask tasks={newTasks} onTaskCompleted={id => handleTaskCompleted(id, 'new')} onTaskFailed={id => handleTaskFailed(id, 'new')} onTaskAccepted={handleTaskAccepted} />
            <AcceptedTask tasks={acceptedTasks} onTaskCompleted={id => handleTaskCompleted(id, 'accepted')} onTaskFailed={id => handleTaskFailed(id, 'accepted')} />
            <CompleteTask tasks={completedTasks} />
            <FailedTask tasks={failedTasks} />
          </div>
        )}
        {/* Profile Section (only on Profile) */}
        {activeNav === 'Profile' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 flex flex-col items-center animate-fade-in">
              <img src={`https://i.pravatar.cc/100?u=${user?.email || 'employee'}`} alt="Employee Avatar" className="w-24 h-24 rounded-full border-4 border-blue-300 mb-4" />
              <div className="flex items-center text-blue-700 font-bold text-2xl mb-2"><FaUser className="mr-2" />{user?.firstName || 'Employee'}</div>
              <div className="flex items-center text-gray-600 text-lg mb-2"><FaEnvelope className="mr-2" />{user?.email || 'N/A'}</div>
              {/* Add more details here if available */}
              <div className="text-gray-500 text-sm mt-2">Employee Profile</div>
            </div>
          </div>
        )}
        {activeNav === 'Network Analysis' && (
          <div className="p-6 w-full">
            // REMOVED: Network Analysis rendering section
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;
