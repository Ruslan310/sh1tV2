import React, {useRef} from 'react';
import {connect} from "react-redux";
import {FormControl} from "react-bootstrap";
import {resetFilter, setFilter} from "../redux/action";

const mapStateToProps = (state) => ({
    aptekaFiltered: state.comment.aptekaFiltered,
})
const mapDispatchToProps = ({
    resetFilter, setFilter
})

const $Info = (props) => {

    const filterInfo = () => {
        if (intupInfo.current.value.length < 3) {
            props.resetFilter()
        } else {
            props.setFilter(intupInfo.current.value)
        }
    }
    const intupInfo = useRef(null)

    return (
        <div className='d-flex flex-column text-center infoTableWrapper'>
            <h2>Даты открытия аптек</h2>
            <FormControl
                className='inputinfoForm'
                type='text'
                placeholder="поиск аптек"
                ref={intupInfo}
                onChange={filterInfo}
            />
            <table className='table'>
                <thead>
                <tr>
                    <th>Аптека</th>
                    <th>Дата открытия</th>
                    <th>Телефон</th>
                    <th>Город</th>
                </tr>
                </thead>
                <tbody>
                {props.aptekaFiltered && props.aptekaFiltered.map(item => {
                        if (item.isFilter) {
                            return (
                                <tr key={item.idApteka}>
                                    <td className='tableTd'>{item.apteka}</td>
                                    <td>{item.apteka_date_open}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.town}</td>
                                </tr>
                            )
                        }
                    }
                )}
                </tbody>
            </table>
        </div>
    );
};
const Info = connect(mapStateToProps, mapDispatchToProps)($Info)

export default Info;