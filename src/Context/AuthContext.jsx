import React, { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../Utils/LocalStoreage'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const [admin, setAdmin] = useState([])

  useEffect(() => {
    const { employees, admin } = getLocalStorage()
    setEmployees(employees || [])
    setAdmin(admin || [])
  }, [])

  // Function to add a new task to an employee
  const addTaskToEmployee = (employeeId, task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      newTask: true,
      active: false,
      completed: false,
      failed: false
    }
    
    setEmployees(prevEmployees => {
      const updatedEmployees = prevEmployees.map(emp => 
        emp.id === parseInt(employeeId)
          ? { ...emp, tasks: [...(emp.tasks || []), newTask] }
          : emp
      )
      
      // Update localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees))
      return updatedEmployees
    })
  }

  // Function to update task status
  const updateTaskStatus = (employeeId, taskId, status) => {
    setEmployees(prevEmployees => {
      const updatedEmployees = prevEmployees.map(emp => {
        if (emp.id === parseInt(employeeId)) {
          const updatedTasks = emp.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                newTask: status === 'new',
                active: status === 'active',
                completed: status === 'completed',
                failed: status === 'failed'
              }
            }
            return task
          })
          return { ...emp, tasks: updatedTasks }
        }
        return emp
      })
      
      // Update localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees))
      return updatedEmployees
    })
  }

  // Function to get employee by ID
  const getEmployeeById = (employeeId) => {
    return employees.find(emp => emp.id === parseInt(employeeId))
  }

  // Function to get employee by email
  const getEmployeeByEmail = (email) => {
    return employees.find(emp => emp.email === email)
  }

  return (
    <AuthContext.Provider value={{ 
      employees, 
      admin, 
      addTaskToEmployee, 
      updateTaskStatus, 
      getEmployeeById, 
      getEmployeeByEmail 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider