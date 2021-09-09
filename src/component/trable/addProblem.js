import React from 'react';
import {Button, FormControl} from "react-bootstrap";
import useInput from "../../hooks/useInput";


const AddProblem = (props) => {
    const inputProblemComment = useInput('')

    const addProblem = () =>{
        if (!inputProblemComment.value.trim()){
            inputProblemComment.onChange({target: {value: ''}})
            return props.setModalMessage('Введены некоректные данные')
        }
            props.addNewProblemComment({
                newPost: inputProblemComment.value
            })
        inputProblemComment.onChange({target: {value: ''}})
    }

    return (
        <div className='wrapperAddProblem'>
            <FormControl
                {...inputProblemComment}
                className='inputDateProblem'
                as="textarea"
                placeholder=' Введите текст проблемы'
                rows={3}
            />
            <Button className='buttonProblemAdd' variant="info" onClick={addProblem}>Сообщить о проблеме</Button>
        </div>
    );
};

export default AddProblem;