import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {FormControl} from "react-bootstrap";
import {resetFilter, setFilter} from "../../redux/action";

const mapStateToProps = (state) => ({
    pharmacyList: state.comment.pharmacyList,
    window: state.comment.window,
})
const mapDispatchToProps = ({
    resetFilter, setFilter
})

const $Info = ({ pharmacyList, window, resetFilter, setFilter }) => {

    const [inputInfo, setInputInfo] = useState('')
    const filterInfo = (e) => {
        setInputInfo(e.target.value)
        if (e.target.value.length < 3) {
            resetFilter()
        } else {
            setFilter(e.target.value)
        }
    }
    let checked = window !== 'info'
    useEffect( () => {
            setInputInfo('')
            resetFilter()
    },[checked, resetFilter])

    return (
        <div className='d-flex flex-column text-center infoTableWrapper'>
            <h2 className='dateOpenApt'>Даты открытия аптек</h2>
            <FormControl
                className='inputInfoForm'
                type='text'
                placeholder="поиск аптек"
                value={inputInfo}
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
                {pharmacyList && pharmacyList.map(item => {
                        if (item.isFilter) {
                            return (
                                <tr key={item.idPharmacy}>
                                    <td className='tableTd'>{item.pharmacy}</td>
                                    <td>{item.pharmacy_date_open}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.town}</td>
                                </tr>
                            )
                        } return null
                    }
                )}
                </tbody>
            </table>
        </div>
    );
};
const Info = connect(mapStateToProps, mapDispatchToProps)($Info)

export default Info;