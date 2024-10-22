"use client";
import React, { useState } from "react";

const page = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (task) {
      setTasks([...tasks, { task, description, completed: false }]);
      setTask("");
      setDescription("");
    }
  };

  const handleDelete = (index) => {
    let taskCopy = [...tasks];
    taskCopy.splice(index, 1);
    setTasks(taskCopy);
  };

  const toggleCompletion = (index) => {
    let taskCopy = [...tasks];
    taskCopy[index].completed = !taskCopy[index].completed;
    setTasks(taskCopy);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditTask(tasks[index].task);
    setEditDescription(tasks[index].description);
  };

  const saveEdit = (index) => {
    let taskCopy = [...tasks];
    taskCopy[index] = {
      ...taskCopy[index],
      task: editTask,
      description: editDescription,
    };
    setTasks(taskCopy);
    setEditingIndex(null);
  };

  let renderTask = <h2>No tasks for you</h2>;
  if (tasks.length > 0) {
    renderTask = tasks.map((task, index) => {
      return (
        <li key={index} className="flex items-center justify-between mb-3">
          <div className="flex justify-between w-2/3">
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="border border-gray-400 p-2 rounded mr-2"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border border-gray-400 p-2 rounded mr-2"
                />
                <button
                  onClick={() => saveEdit(index)}
                  className="bg-blue-600 rounded p-2 text-white font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <h2
                  className={`font-bold ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.task}
                </h2>
                <p>{task.description}</p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                toggleCompletion(index);
              }}
              className="bg-green-600 rounded p-2 text-white font-bold mr-2"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => {
                startEditing(index);
              }}
              className="bg-yellow-600 rounded p-2 text-white font-bold mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(index);
              }}
              className="bg-red-600 rounded p-2 text-white font-bold"
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="text-5xl bg-black text-white p-5 text-center font-bold">
        Pranshu's to-do list
      </h1>
      <form className="text-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a task..."
          className="m-4 p-4 text-lg rounded-lg border-black border-2"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter task description..."
          className="m-4 p-4 text-lg rounded-lg border-black border-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-black p-4 rounded text-white">Add task</button>
      </form>

      <div className="bg-slate-300 p-5">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
