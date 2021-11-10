import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
    value?: string
    placeholder?: string
    type?: string
    checked?: boolean
    className?: string
}

export const Input = ({value, callBack,onKeyPress,checked,className, ...props}: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e)
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && value && onKeyPress(e)

    }

    return (
        <input
            type={props.type}
            value={value}
            onChange={onChangeHandler}
            placeholder={props.placeholder}
            onKeyPress={onEnterPressHandler}
            checked={checked}
            className={className}
        />
    );
}