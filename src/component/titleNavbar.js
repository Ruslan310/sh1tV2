import React from 'react';
import {Button, FormControl, Navbar} from "react-bootstrap";
import {
    fetchReport,
    resetFilter,
    selectWindow,
    writeReportForExel
} from "../redux/action";
import {connect} from "react-redux";
import Excel from "./reportExel";
import useInput from "../hooks/useInput";

const mapStateToProps = (state) => ({
    reportForExel: state.comment.reportForExel,
    tableReport: state.comment.tableReport,
    window: state.comment.window,
})

const mapDispatchToProps = ({
    fetchReport,
    writeReportForExel,
    selectWindow,
    resetFilter
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
    const obj = {
        columns: ['Дата', 'Аптека', 'График', 'Выключили', 'Включили', 'Коментарий'],
        data: [
            [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
        ]
    }

    let textTitle

    if (props.window === 'component') {
        textTitle = 'Выключение света'
    }
    if (props.window === 'info') {
        textTitle = 'Информация по аптекам'
    }
    if (props.window === 'trable') {
        textTitle = 'Проблемы ТТ'
    }

    return (
        <Navbar bg="dark" variant="dark" className="wraperNavbar">
            <div className='d-flex'>
                <Excel dataSet={obj.data}
                       writeReportForExel={props.writeReportForExel}
                       tableReport={props.tableReport}
                />
                <FormControl {...TimeStart}
                             className='inputTitleTime ml-3' type='date'/>
                <FormControl {...TimeEnd}
                             className='inputTitleTime' type='date'/>
                <Button variant="success"
                        onClick={handlerReport}
                >Выключение света</Button>
                <Button className='ml-3'
                        variant="warning"
                        onClick={() => props.selectWindow('trable')}
                >Проблемы ТТ</Button>
                <Button className='ml-3'
                        variant="warning"
                        onClick={() => props.selectWindow('info')}
                >Инфо по аптекам</Button>
            </div>
            <p className='wraperNavbarText'>{textTitle}</p>
        </Navbar>
    );
};

const TitleNavbar = connect(mapStateToProps, mapDispatchToProps)($TitleNavbar)

export default TitleNavbar;