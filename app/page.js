'use client'
import React, { useState } from 'react'

const page = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const handleSubmit = (e) => {
    setTasks([...tasks, { task, description }]);
    setTask('');
    setDescription('');
  }

  const handleDelete = (index) => {
    let taskCopy = [...tasks];
    taskCopy.splice(index, 1);
    setTasks(taskCopy);
  }

  let renderTask = <h2>No tasks for you</h2>
  if (tasks.length > 0) {
    renderTask = tasks.map((task, index) => {
      return (
        <li key={index} className='flex items-center justify-between mb-3'>
          <div className='flex justify-between w-2/3' >
            <h2 className='font-bold'>{task.task}</h2>
            <p>{task.description}</p>
          </div>
          <button
            onClick={() => { handleDelete(index) }}
            className='bg-red-600 rounded p-2 text-white font-bold'>Delete</button>
        </li>
      )
    })
  }
  return (
    <>
      <h1 className='text-5xl bg-black text-white p-5 text-center font-bold'>
        Pranshu's to-do list
      </h1>
      <form className='text-center' action={handleSubmit}>
        <input
          type="text"
          placeholder='Add a task...'
          className='m-4 p-4 text-lg rounded-lg border-black border-2'
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder='Enter task description...'
          className='m-4 p-4 text-lg rounded-lg border-black border-2'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button className='bg-black p-4 rounded text-white'>Add task</button>
      </form>

      <div className='bg-slate-300 p-5'>
        <ul>{renderTask}</ul>
      </div>
    </>
  )
}

export default page