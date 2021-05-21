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
            window: props.window,
        })
    }
    const infoClick = () => {
        props.selectWindow('info')
    }
    const obj = {
        columns: ['Дата', 'Аптека', 'График', 'Выключили', 'Включили', 'Коментарий'],
        data: [
            [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
        ]
    }
    return (
        <Navbar bg="dark" variant="dark" className="wraperNavbar">
            <div className='d-flex'>
                <FormControl {...TimeStart}
                             className='inputTitleTime' type='date'/>
                <FormControl {...TimeEnd}
                             className='inputTitleTime' type='date'/>
                <Button variant="success"
                        onClick={handlerReport}
                >Отчет</Button>
                <div className='ml-3'>
                    <Button className='mr-3'
                            variant="warning"
                            onClick={infoClick}
                    >Инфо по аптекам</Button>
                    <Excel dataSet={obj.data}
                           writeReportForExel={props.writeReportForExel}
                           tableReport={props.tableReport}
                    />
                </div>
            </div>
                <p className='wraperNavbarText'>Дашборд Аптек</p>
        </Navbar>
    );
};

const TitleNavbar = connect(mapStateToProps, mapDispatchToProps)($TitleNavbar)

export default TitleNavbar;