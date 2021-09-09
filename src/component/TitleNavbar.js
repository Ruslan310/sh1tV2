import React from 'react';
import {Button, FormControl} from "react-bootstrap";
import {
    fetchGetTrable, fetchReport, resetFilter,
    selectWindow, openExportMenu
} from "../redux/action";
import {connect} from "react-redux";
import useInput from "../hooks/useInput";


const mapStateToProps = (state) => ({
    window: state.comment.window,
})

const mapDispatchToProps = ({
    fetchReport, selectWindow, resetFilter, fetchGetTrable, openExportMenu
})

const $TitleNavbar = (props) => {
    let nowDate = new Date().toISOString().substr(0, 10)
    const TimeStart = useInput(nowDate)
    const TimeEnd = useInput(nowDate)

    const handlerReport = () => {
        props.resetFilter()
        props.selectWindow('component')
        props.fetchReport({
            dateStart: TimeStart.value,
            dateEnd: TimeEnd.value,
        })
    }
    const handlerProblem = () =>{
        props.fetchGetTrable()
        props.selectWindow('problem')
    }

    let textTitle
    if (props.window === 'component') textTitle = 'Аварийные ситуации'
    if (props.window === 'info') textTitle = 'Информация по аптекам'
    if (props.window === 'problem') textTitle = 'Проблемы ТТ'

    return (
        <div className="wrapperNavbar">
            <div className='d-flex'>
                <Button variant='info' className='ml-3' onClick={props.openExportMenu}>Excel</Button>
                <FormControl {...TimeStart} className='inputTitleTime ml-3' type='date'/>
                <FormControl {...TimeEnd} className='inputTitleTime' type='date'/>
                <Button variant={props.window === 'component' ? "warning" : "outline-warning"}
                        onClick={handlerReport}
                >Аварийные ситуации</Button>
                <Button className='ml-3' onClick={handlerProblem}
                        variant={props.window === 'problem' ? "warning" : "outline-warning"}
                >Проблемы ТТ</Button>
                <Button className='ml-3' onClick={() => props.selectWindow('info')}
                        variant={props.window === 'info' ? "warning" : "outline-warning"}
                >Инфо по аптекам</Button>
            </div>
            <p className='wrapperNavbarText'>{textTitle}</p>
        </div>
    );
};

const TitleNavbar = connect(mapStateToProps, mapDispatchToProps)($TitleNavbar)

export default TitleNavbar;