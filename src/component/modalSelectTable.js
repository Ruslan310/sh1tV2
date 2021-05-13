import React, {useEffect, useRef, useState} from 'react';
import {Button, FormControl} from "react-bootstrap";

const ModalSelectTable = (props) => {
    const [comment, setComment] = useState('')
    const [dt_end, setDt_end] = useState('')
    const [dt_begin, setDt_begin] = useState('')

    useEffect(() => {
        if (props.selectTableComment?.comment) {
            setComment(props.selectTableComment.comment)
        }
        if (props.selectTableComment?.dt_end) {
            setDt_end(props.selectTableComment.dt_end)
        }
        if (props.selectTableComment?.dt_begin) {
            setDt_begin(props.selectTableComment.dt_begin)
        }
        console.log(comment, dt_end, dt_begin)
    }, [props.active])
    const recordChangesReport = () => {
        props.fetchPutReport({
            id: props.selectTableComment.id,
            dt_begin: dt_begin || props.selectTableComment.dt_begin,
            dt_end: dt_end || props.selectTableComment.dt_end,
            comment: comment || props.selectTableComment.comment,
            dt_date: props.selectTableComment?.date
        })
        clearInput()
        props.setActive(false)
    }

    const clearInput = () => {
        setComment('')
        setDt_end('')
        setDt_begin('')
        props.writeSelectTableRow(null)
        props.setActive(false)
    }
    const handlerInputComment = () => {
        setComment(inputComment.current.value)
        setDt_end(inputTimeOn.current.value)
        setDt_begin(inputTimeOff.current.value)
    }

    const inputTimeOn = useRef()
    const inputComment = useRef()
    const inputTimeOff = useRef()
    return (
        <div className={props.active ? 'services active' : 'services'}
             onMouseDown={clearInput}>
            <div className={props.active ? 'services_content active' : 'services_content'}
                 onMouseDown={e => e.stopPropagation()}>
                <div className='services_text'>
                    <h3 className='text-center'>{props.selectTableComment?.apteka}</h3>
                    <h5 className='text-center'>График: {props.selectTableComment?.grafik}</h5>
                    <hr width="250" size="5"/>
                    <div className='w-100 d-flex align-items-center justify-content-center mb-2'>
                        <h5 className='mr-4'>Время включения :</h5>
                    <FormControl
                        className='inputModalTime'
                        value={dt_begin}
                        onChange={handlerInputComment}
                        type='time'
                        ref={inputTimeOff}
                        placeholder='не указано'
                    />
                    </div>
                    <div className='w-100 d-flex align-items-center justify-content-center mb-2'>
                        <h5 className='mr-4'>Время включения :</h5>
                        <FormControl
                            className='inputModalTime'
                            value={dt_end}
                            onChange={handlerInputComment}
                            type='time'
                            ref={inputTimeOn}
                            placeholder='не указано'
                        />
                    </div>
                    <h5>Коментарий : </h5>
                    <hr width="270" size="5"/>
                    <FormControl
                        className='inputTitleModal'
                        value={comment}
                        onChange={handlerInputComment}
                        ref={inputComment}
                        type='text'
                        as="textarea" rows={1}
                    />
                    <hr width="270" size="5"/>
                    <Button
                        className="buttonTable" variant="success"
                            onClick={recordChangesReport}
                    >Сохранить изменения</Button>
                </div>
            </div>
        </div>
    )
};

export default ModalSelectTable;