import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../UI/Button";
import {filterTasksType, TaskType} from "../../App";
import {Input} from "../UI/Input";

type TodoListPropsType = {
    tasks: Array<TaskType>
    id: string
    title: string
    filter: filterTasksType
    removeTask: (id: string, todoListId: string) => void
    filterTasks: (value: filterTasksType, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    let [titleValue, setTitleValue] = useState('')

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId, props.id)
    }
    const filterTasksHandler = (value: filterTasksType) => {
        props.filterTasks(value, props.id)
    }
    const addTaskHandler = (title: string) => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        }
        setTitleValue('')
    }
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }
    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(titleValue, props.id)
            setTitleValue('')
        }
    }
    const onClickChangeStatusHandler = (taskId: string, isDone: boolean) => {
        props.changeStatus(taskId, isDone, props.id)
    }

    const filterStatusChangeStyle = (filter: filterTasksType) => {
        return props.filter === filter ? "active" : ""
    }
    const checkboxStatusStyle = (isDone: boolean) => {
        return isDone ? 'done' : ''
    }
    const liTasksList = props.tasks.map((t) => {
        return (
            <li key={t.id} className={checkboxStatusStyle(t.isDone)}>
                <Input

                    type="checkbox"
                    checked={t.isDone}
                    callBack={(e: ChangeEvent<HTMLInputElement>) => {
                        onClickChangeStatusHandler(t.id, e.currentTarget.checked)
                    }}
                />
                <span>{t.title}</span>
                <Button callBack={() => {
                    removeTaskHandler(t.id)
                }} name={"x"}/>
            </li>
        )
    })

    return (
        <div>
            <h3>
                {props.title}
                <Button callBack={() => {props.removeTodoList(props.id)}} name={"x"}/>
            </h3>
            <div>
                <Input
                    callBack={onInputChangeHandler}
                    onKeyPress={addTaskOnEnterHandler}
                    value={titleValue}
                    placeholder={"Enter your value..."}
                />
                <Button callBack={() => {
                    addTaskHandler(titleValue)
                }} name={'+'}/>
            </div>
            <ul>
                {liTasksList}
            </ul>
            <div>
                <Button className={filterStatusChangeStyle('all')} callBack={() => {
                    filterTasksHandler('all')
                }} name={"All"}/>
                <Button className={filterStatusChangeStyle('active')} callBack={() => {
                    filterTasksHandler('active')
                }} name={"Active"}/>
                <Button className={filterStatusChangeStyle('completed')} callBack={() => {
                    filterTasksHandler('completed')
                }} name={"Completed"}/>
            </div>
        </div>
    );
};
