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
    [key: string] : TaskType[]
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

    // const tasksForState: Array<TaskType> = [
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false},
    // ];
    //
    // const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState);
    // let [filter, setFilter] = useState<filterTasksType>('all')

    const removeTask = (taskId: string, todoListId: string) => {

    }
    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }
    const changeStatus = ( taskId: string, isDone: boolean) => {
        const updatedTask = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(updatedTask)
    }

    let filteredTasksToTodoList = tasks;
    if (filter === 'active') {
        filteredTasksToTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasksToTodoList = tasks.filter(t => t.isDone)
    }
    const filterTasks = (filter: filterTasksType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasksToTodoList}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
                filter={filter}
                changeStatus={changeStatus}
            />
        </div>
    );
}
