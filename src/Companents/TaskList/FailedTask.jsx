import React from 'react';

const FailedTask = ({ tasks }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-red-700">Failed Tasks</h3>
    <ul className="space-y-4">
      {tasks.length === 0 && <li className="text-gray-400">No failed tasks.</li>}
      {tasks.map((task, idx) => (
        <li
          key={idx}
          className="bg-gradient-to-r from-red-100 to-red-50 rounded-2xl p-5 shadow-lg text-gray-800 flex flex-col border border-red-200 hover:shadow-2xl transition-all duration-200 animate-fade-in"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg text-red-800">{task.taskTitle}</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-200 text-red-700">Failed</span>
          </div>
          <div className="text-gray-600 mb-1">{task.taskDescription}</div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-1">
            <span><b>Date:</b> {task.taskDate}</span>
            {task.category && <span><b>Category:</b> {task.category}</span>}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default FailedTask;
