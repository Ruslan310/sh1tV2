import React, {useEffect, useState} from 'react';
import {Button, FormControl} from "react-bootstrap";

const ModalSelectTable = ({
                              active,
                              setActive,
                              selectTableComment,
                              fetchPutReport,
                              writeSelectTableRow,
                              groupAx4}) => {

    const [comment, setComment] = useState('')
    const [dt_end, setDt_end] = useState('')
    const [dt_begin, setDt_begin] = useState('')
    const [teamAh4, setTeamAh4] = useState('')



    const handlerInputTimeOff = e => setDt_end(e.target.value)
    const handlerInputComment = e => setComment(e.target.value)
    const handlerInputTimeOn = e => setDt_begin(e.target.value)

    useEffect(() => {
        if (selectTableComment?.comment) setComment(selectTableComment.comment)
        if (selectTableComment?.dt_end) setDt_end(selectTableComment.dt_end)
        if (selectTableComment?.dt_begin) setDt_begin(selectTableComment.dt_begin)
        if (selectTableComment?.teamAh4) setTeamAh4(selectTableComment.teamAh4)
    }, [selectTableComment])

    const recordChangesReport = () => {
        fetchPutReport({
            id: selectTableComment.id,
            dt_begin: dt_begin,
            dt_end: dt_end,
            comment: comment,
            dt_date: selectTableComment?.date,
            teamAh4: teamAh4
        })
        clearInput()
        setActive(false)
    }

    const clearInput = () => {
        setComment('')
        setDt_end('')
        setDt_begin('')
        setTeamAh4('')
        writeSelectTableRow(null)
        setActive(false)
    }

    const clearSetTimeOn = () =>{
        fetchPutReport({
            id: selectTableComment.id,
            dt_begin: dt_begin || selectTableComment.dt_begin,
            dt_end: null,
            comment: comment || selectTableComment.comment,
            dt_date: selectTableComment?.date,
            teamAh4: teamAh4
        })
        setActive(false)
        clearInput()
    }

    return (
        <div className={active ? 'services active' : 'services'}
             onMouseDown={clearInput}>
            <div className={active ? 'services_content active' : 'services_content'}
                 onMouseDown={e => e.stopPropagation()}>
                <div className='services_text'>
                    <p className='modalTitle'>{selectTableComment?.apteka}</p>
                    <p className='modalTitle'>График: {selectTableComment?.grafik}</p>
                    <hr width="250" size="5"/>
                    <div className='d-flex'>
                        <div className='blockModalCorrection'>
                            <h5 className='mr-4'>Время выключения :</h5>
                            <h5 className='mr-4'>Время включения :</h5>
                        </div>
                        <div className='blockModalCorrection'>
                            <FormControl
                                className='inputModalTime'
                                value={dt_begin}
                                onChange={handlerInputTimeOn}
                                type='time'
                                placeholder='не указано'
                            />
                            <FormControl
                                className='inputModalTime'
                                value={dt_end}
                                onChange={handlerInputTimeOff}
                                type='time'
                                placeholder='не указано'
                            />
                        </div>
                        <div className='blockModalCorrection butBloc'>
                            <Button variant="light" onClick={clearSetTimeOn}>I</Button>
                        </div>
                    </div>
                    <h5>Коментарий : </h5>
                    <hr width="270" size="5"/>

                    <FormControl onChange={(e) => setTeamAh4(e.target.value)} value={teamAh4}
                                 className='inputTitleModal' as="select">
                        <option value=''>бригада не выбрана</option>
                        {groupAx4 && groupAx4.map( el => <option key={el._Code} value={el._Description}>{el._Description}</option>)}
                    </FormControl>

                    <FormControl
                        className='inputTitleModal'
                        value={comment}
                        onChange={handlerInputComment}
                        type='text'
                        as="textarea" rows={2}
                    />
                    <hr width="270" size="5"/>


                    <Button className="buttonTable" variant="success"
                        onClick={recordChangesReport}
                    >Сохранить изменения</Button>
                </div>
            </div>
        </div>
    )
};

export default ModalSelectTable;