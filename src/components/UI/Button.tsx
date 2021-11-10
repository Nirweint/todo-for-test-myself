import React from 'react';

type PropsType = {
    callBack: () => void
    name: string
    className?: string
}

export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button className={props.className} onClick={onClickHandler}>
            {props.name}
        </button>
    );
}