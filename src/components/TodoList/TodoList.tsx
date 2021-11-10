import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../UI/Button";
import {filterTasksType, TaskType} from "../../App";
import {Input} from "../UI/Input";

type TodoListPropsType = {
    tasks: Array<TaskType>
    filter: filterTasksType
    removeTask: (id: string) => void
    filterTasks: (value: filterTasksType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    let [titleValue, setTitleValue] = useState('')

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }
    const filterTasksHandler = (value: filterTasksType) => {
        props.filterTasks(value)
    }
    const addTaskHandler = (title: string) => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        }
        setTitleValue('')
    }
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }
    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(titleValue)
            setTitleValue('')
        }
    }
    const onClickChangeStatusHandler = (taskId: string, isDone: boolean) => {
        props.changeStatus(taskId, isDone)
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
            <h3>What to learn</h3>
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
