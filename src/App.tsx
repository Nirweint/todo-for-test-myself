import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: filterTasksType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export type filterTasksType = 'all' | 'active' | 'completed'

export function App() {

    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const updatedTask = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks({...tasks, [todoListId]: updatedTask})
    }
    const filterTasks = (filter: filterTasksType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }

    return (
        <div className="App">
            {todoLists.map(tl => {

                let filteredTasksToTodoList: Array<TaskType> = tasks[tl.id]

                if (tl.filter === "active") {
                    filteredTasksToTodoList = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    filteredTasksToTodoList = tasks[tl.id].filter(t => t.isDone)
                }

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={filteredTasksToTodoList}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}
