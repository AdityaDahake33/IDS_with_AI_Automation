import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import NetworkAnalysis from './NetworkAnalysis';  // ADDED IMPORT

const initialTaskState = {
  taskTitle: '',
  taskDescription: '',
  taskDate: '',
  category: '',
  newTask: true,
  active: true,
  completed: false,
  failed: false,
};

const AdminDashboard = ({ onLogout }) => {
  const { employees, addTaskToEmployee } = useAuthContext();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState(initialTaskState);
  const [selectedEmpId, setSelectedEmpId] = useState('');

  const summaryData = [
    { title: 'Total Users', value: employees.length, icon: (
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-2a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6-2a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" /></svg>
    ) },
    { title: 'Active Tasks', value: employees.reduce((total, emp) => total + (emp.tasks?.filter(t => t.active || t.newTask).length || 0), 0), icon: (
      <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm6 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" /></svg>
    ) },
    { title: 'New Tasks', value: employees.reduce((total, emp) => total + (emp.tasks?.filter(t => t.newTask).length || 0), 0), icon: (
      <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
    ) },
    { title: 'Completed Tasks', value: employees.reduce((total, emp) => total + (emp.tasks?.filter(t => t.completed).length || 0), 0), icon: (
      <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ) },
  ];

  const navLinks = [
    { name: 'Dashboard', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" /></svg>
    ) },
    { name: 'Network Analysis',  // ADDED NAV ITEM
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
    { name: 'Users', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-2a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" /></svg>
    ) },
    { name: 'Tasks', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm6 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" /></svg>
    ) },
    { name: 'Settings', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
    ) },
  ];

  const recentActivities = [
    { id: 1, activity: 'Added new user John Doe', time: '2 mins ago' },
    { id: 2, activity: 'Task "Design Review" marked as complete', time: '10 mins ago' },
    { id: 3, activity: 'Updated performance metrics', time: '1 hour ago' },
    { id: 4, activity: 'Removed user Jane Smith', time: '2 hours ago' },
  ];

  // Handle create task form submit
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!selectedEmpId) return;
    
    const selectedEmp = employees.find(emp => emp.id === parseInt(selectedEmpId));
    addTaskToEmployee(parseInt(selectedEmpId), taskForm);
    
    // Show success message
    alert(`Task "${taskForm.taskTitle}" has been successfully assigned to ${selectedEmp?.firstName}!`);
    
    setShowTaskModal(false);
    setTaskForm(initialTaskState);
    setSelectedEmpId('');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-100 flex flex-col py-8 px-4 animate-fade-in">
        <div className="flex items-center mb-10">
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Admin</span>
        </div>
        <nav className="flex-1 space-y-2 mb-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-150 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 focus:outline-none ${activeNav === link.name ? 'bg-blue-100 text-blue-700' : ''}`}
              onClick={() => { setActiveNav(link.name); setSelectedEmployee(null); }}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </button>
          ))}
        </nav>
        {/* Employee User Cards in Sidebar (optional, can remove if only in main) */}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto animate-fade-in">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, <span className="font-semibold text-blue-600">Admin</span></span>
            <img src={`https://i.pravatar.cc/40?img=3`} alt="Admin Avatar" className="w-10 h-10 rounded-full border-2 border-blue-200" />
            <button className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm shadow transition-all" onClick={onLogout}>Log Out</button>
          </div>
        </div>
        {/* Network Analysis Panel */}
        {activeNav === 'Network Analysis' && (
          <div className="p-6 w-full" style={{ maxWidth: '95%' }}>
            <NetworkAnalysis />
          </div>
        )}
        {/* Main Content Sections */}
        {activeNav === 'Dashboard' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {summaryData.map((card) => (
                <div key={card.title} className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 hover:shadow-xl transition-all duration-200 border border-gray-100 animate-fade-in">
                  <div className="bg-blue-50 rounded-full p-3">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{card.value}</div>
                    <div className="text-gray-500 text-sm">{card.title}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <ul className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="py-3 flex items-center justify-between hover:bg-blue-50 px-2 rounded-lg transition-all duration-150">
                    <span className="text-gray-700">{activity.activity}</span>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {activeNav === 'Users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {employees.map(emp => (
              <div
                key={emp.id}
                className="bg-blue-50 rounded-2xl p-6 shadow-lg flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-all duration-200 cursor-pointer animate-fade-in"
                onClick={() => setSelectedEmployee(emp)}
              >
                <img src={`https://i.pravatar.cc/80?u=${emp.email}`} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-blue-300 mb-3" />
                <div className="font-bold text-blue-700 text-xl mb-1">{emp.firstName}</div>
                <div className="text-gray-600 text-sm mb-1">{emp.email}</div>
                {/* Add more details if needed */}
              </div>
            ))}
          </div>
        )}
        {activeNav === 'Tasks' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">All Employee Tasks</h2>
              <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-all" onClick={() => setShowTaskModal(true)}>Create Task</button>
            </div>
            <div className="space-y-8">
              {employees.map(emp => (
                <div key={emp.id} className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 animate-fade-in">
                  <div className="flex items-center mb-4 gap-6">
                    <img src={`https://i.pravatar.cc/80?u=${emp.email}`} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-blue-300" />
                    <div>
                      <div className="font-bold text-blue-700 text-2xl mb-1">{emp.firstName}</div>
                      <div className="text-gray-600 text-lg mb-1">{emp.email}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-700">Tasks</h3>
                    {(!emp.tasks || emp.tasks.length === 0) && <div className="text-gray-400">No tasks assigned.</div>}
                    {emp.tasks && emp.tasks.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {emp.tasks.map((task, idx) => (
                          <div
                            key={task.id || idx}
                            className="min-w-[260px] max-w-xs bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-5 shadow text-gray-800 flex flex-col border border-blue-200 animate-fade-in"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-lg text-blue-800">{task.taskTitle}</span>
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-700">{task.completed ? 'Completed' : task.failed ? 'Failed' : task.newTask ? 'New' : task.active ? 'Accepted' : 'Task'}</span>
                            </div>
                            <div className="text-gray-600 mb-1">{task.taskDescription}</div>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-1">
                              <span><b>Date:</b> {task.taskDate}</span>
                              {task.category && <span><b>Category:</b> {task.category}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Create Task Modal */}
            {showTaskModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <form onSubmit={handleCreateTask} className="bg-white rounded-3xl shadow-2xl border border-blue-200 p-10 w-full max-w-2xl animate-fade-in relative flex flex-col">
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold" onClick={() => setShowTaskModal(false)}>&times;</button>
                  <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">Create Task</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                      <label className="block text-gray-700 mb-1 font-semibold">Assign to Employee</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={selectedEmpId} onChange={e => setSelectedEmpId(e.target.value)} required>
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>{emp.firstName} ({emp.email})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 font-semibold">Task Title</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={taskForm.taskTitle} onChange={e => setTaskForm(f => ({ ...f, taskTitle: e.target.value }))} required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-1 font-semibold">Description</label>
                      <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[60px]" value={taskForm.taskDescription} onChange={e => setTaskForm(f => ({ ...f, taskDescription: e.target.value }))} required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 font-semibold">Date</label>
                      <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={taskForm.taskDate} onChange={e => setTaskForm(f => ({ ...f, taskDate: e.target.value }))} required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 font-semibold">Category</label>
                      <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={taskForm.category} onChange={e => setTaskForm(f => ({ ...f, category: e.target.value }))} />
                    </div>
                  </div>
                  <button type="submit" className="mt-8 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold shadow-lg text-lg transition-all">Create Task</button>
                </form>
              </div>
            )}
          </div>
        )}
        {/* Employee Details Modal/Card */}
        {activeNav === 'Users' && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl border border-blue-200 p-8 w-full max-w-2xl animate-fade-in relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold" onClick={() => setSelectedEmployee(null)}>&times;</button>
              <div className="flex flex-col items-center mb-6">
                <img src={`https://i.pravatar.cc/100?u=${selectedEmployee.email}`} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-blue-300 mb-4" />
                <div className="font-bold text-blue-700 text-2xl mb-1">{selectedEmployee.firstName}</div>
                <div className="text-gray-600 text-lg mb-1">{selectedEmployee.email}</div>
                {/* Add more details if needed */}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-700">All Tasks</h3>
                {(!selectedEmployee.tasks || selectedEmployee.tasks.length === 0) && <div className="text-gray-400">No tasks assigned.</div>}
                {selectedEmployee.tasks && selectedEmployee.tasks.length > 0 && (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {selectedEmployee.tasks.map((task, idx) => (
                      <div
                        key={task.id || idx}
                        className="min-w-[260px] max-w-xs bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-5 shadow text-gray-800 flex flex-col border border-blue-200 animate-fade-in"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-lg text-blue-800">{task.taskTitle}</span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-700">{task.completed ? 'Completed' : task.failed ? 'Failed' : task.newTask ? 'New' : task.active ? 'Accepted' : 'Task'}</span>
                        </div>
                        <div className="text-gray-600 mb-1">{task.taskDescription}</div>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-1">
                          <span><b>Date:</b> {task.taskDate}</span>
                          {task.category && <span><b>Category:</b> {task.category}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
