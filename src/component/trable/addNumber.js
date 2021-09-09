import React from 'react';
import {Button, FormControl} from "react-bootstrap";
import useInput from "../../hooks/useInput";

const AddNumber = (props) => {

    const inputProblemNumber = useInput('')
    const addNumber = () =>{
        if (!inputProblemNumber.value.trim()){
            inputProblemNumber.onChange({target: {value: ''}})
            return props.setModalMessage('Введены некоректные данные')
        }
        props.addNewNumber({ number: inputProblemNumber.value })
        inputProblemNumber.onChange({target: {value: ''}})
    }

    return (
        <div className='wrapperAddNumber'>
            <FormControl
                {...inputProblemNumber}
                as="textarea"
                placeholder='Введите номер'
                rows={2}
            />
            <Button className='buttonProblemAdd' variant="info" onClick={addNumber}>Создать запись</Button>
        </div>
    );
};

export default AddNumber;