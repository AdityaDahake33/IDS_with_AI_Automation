import React from 'react';

const NewTask = ({ tasks, onTaskCompleted, onTaskFailed, onTaskAccepted }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-blue-700">New Tasks</h3>
    <ul className="space-y-4">
      {tasks.length === 0 && <li className="text-gray-400">No new tasks.</li>}
      {tasks.map((task, idx) => (
        <li
          key={task.id || idx}
          className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-5 shadow-lg text-gray-800 flex flex-col border border-blue-200 hover:shadow-2xl transition-all duration-200 animate-fade-in"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg text-blue-800">{task.taskTitle}</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-700">New</span>
          </div>
          <div className="text-gray-600 mb-1">{task.taskDescription}</div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
            <span><b>Date:</b> {task.taskDate}</span>
            {task.category && <span><b>Category:</b> {task.category}</span>}
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition shadow" onClick={() => onTaskAccepted(task.id)}>Accept Task</button>
            <button className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition shadow" onClick={() => onTaskCompleted(task.id)}>Task Completed</button>
            <button className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition shadow" onClick={() => onTaskFailed(task.id)}>Task Failed</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default NewTask;
