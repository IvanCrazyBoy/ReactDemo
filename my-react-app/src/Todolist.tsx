import * as React from 'react';
import { useState } from 'react';

// 定义任务的类型
type Task = {
    id: number;
    text: string;
    completed: boolean;
};

const TodoList= () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editedTaskText, setEditedTaskText] = useState<string>('');

    const addTask = () => {
        if (newTask.trim()!== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id!== id);
        setTasks(updatedTasks);
    };

    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id? { ...task, completed:!task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const startEditing = (id: number) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setEditingTaskId(id);
            setEditedTaskText(taskToEdit.text);
        }
    };

    const saveEdit = () => {
        if (editedTaskText.trim()!== '' && editingTaskId!== null) {
            const updatedTasks = tasks.map(task =>
                task.id === editingTaskId? { ...task, text: editedTaskText } : task
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
            setEditedTaskText('');
        }
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
        setEditedTaskText('');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button
                    onClick={addTask}
                    className="p-2 bg-blue-500 text-white rounded-r"
                >
                    Add
                </button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={`flex items-center mb-2 ${task.completed? 'line-through text-gray-500' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="mr-2"
                        />
                        {editingTaskId === task.id? (
                            <>
                                <input
                                    type="text"
                                    value={editedTaskText}
                                    onChange={(e) => setEditedTaskText(e.target.value)}
                                    className="mr-2 p-1 border border-gray-300"
                                />
                                <button onClick={saveEdit} className="mr-2 bg-green-500 text-white p-1">
                                    Save
                                </button>
                                <button onClick={cancelEdit} className="bg-red-500 text-white p-1">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{task.text}</span>
                                <button
                                    onClick={() => startEditing(task.id)}
                                    className="ml-2 text-yellow-500"
                                >
                                    Edit
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="ml-auto text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;