import React, {useState} from 'react';
import {connect} from "react-redux";
import '../style/table.css'
import {
    fetchPutReport,
    fetchReport,
    setFilterSituation,
    setFilterPharmacy,
    setIconGo,
    setIconOnOff,
    writeSelectTableRow
} from "../redux/action";
import ModalSelectTable from "./ModalSelectTable";
import {addTurnGO, addTurnOnOff} from "../redux/helpFunction";
import FilterSituation from "./FilterSituation";
import FilterPharmacy from "./FilterPharmacy";

const mapStateToProps = (state) => ({
    tableReport: state.comment.tableReport,
    selectTableComment: state.comment.selectTableComment,
    groupAx4: state.comment.groupAx4,
    filterSituation: state.comment.filterSituation,
    filterPharmacy: state.comment.filterPharmacy,
})

const mapDispatchToProps = ({writeSelectTableRow, fetchPutReport, fetchReport, setIconOnOff, setIconGo, setFilterSituation, setFilterPharmacy})

const $BordTable = (props) => {

    const [active, setActive] = useState(false)
    const [openFilterSituation, setOpenFilterSituation] = useState(false)
    const [openFilterPharmacy, setOpenFilterPharmacy] = useState(false)

    const selectComment = (post) => {
        props.writeSelectTableRow(post)
        setActive(true)
    }

    const lightOnOrNot = async post => props.setIconOnOff( await addTurnOnOff({turn: post.isTurnOnOff, id: post.id}) )
    const lightGoNotGo = async post => props.setIconGo( await addTurnGO({turn: post.isTurnGo, id: post.id}) )


    const handlerBlurSituation = () => setTimeout( ()=> {setOpenFilterSituation(false)},200)
    const handlerBlurPharmacy = () => setTimeout( ()=> {setOpenFilterPharmacy(false)},200)

    return (
        <div className='wrapperTable'>
            { openFilterSituation && <FilterSituation setFilterSituation = {props.setFilterSituation}/> }
            { openFilterPharmacy && <FilterPharmacy setFilterPharmacy = {props.setFilterPharmacy} tableReport={props.tableReport}/> }
            <ModalSelectTable
                active={active}
                setActive={setActive}
                selectTableComment={props.selectTableComment}
                fetchPutReport={props.fetchPutReport}
                fetchReport={props.fetchReport}
                writeSelectTableRow={props.writeSelectTableRow}
                groupAx4={props.groupAx4}
            />
            <table className='table'>
                <thead>
                <tr>
                    <th className='dataTitle'>Дата</th>
                    <th className='groupCell' onBlur={ handlerBlurSituation } tabIndex={0}
                        onClick={()=>setOpenFilterSituation(true)}
                    >Авар. ситуация</th>
                    <th className="colCell">Категория</th>
                    <th onClick={()=> setOpenFilterPharmacy(true)} onBlur={ handlerBlurPharmacy }  tabIndex={0}>Аптека</th>
                    <th className="colCell">График</th>
                    <th className="colCell">Выкл</th>
                    <th className="colCell">Вкл</th>
                    <th className="colCell"> </th>
                    <th className="colCellD">Разница</th>
                    <th className='groupCell'>Бригада</th>
                    <th className="commentCell">Коментарий</th>
                </tr>
                </thead>
                <tbody>
                {props.tableReport && props.tableReport.map(post => {
                        let classNameForTitleApt = 'pharmacyTitle'
                        let classNameForColl = null
                        let classNameForCategory = {color: " "}
                        if (post.isTurnGo) {
                            classNameForColl = 'hatchColl'
                            classNameForTitleApt = 'pharmacyTitle'
                        }
                        if (post.isRedTitle && !post.isTurnOnOff && !post.dt_end && !post.isTurnGo) classNameForTitleApt = "redColor"
                        if (post.category === 1) classNameForCategory = {color: "red"}
                        if (post.category === 2) classNameForCategory = {color: "#F19300"}
                        if (post.category === 3) classNameForCategory = {color: "#f1da5b"}
                        if (post.category === 4) classNameForCategory = {color: "#92caf1"}

                        let isFilterSituation = props.filterSituation === 'Все' ? post.situation : post.situation === props.filterSituation
                        let isFilterPharmacy = props.filterPharmacy === 'Все' ? post.apteka : post.apteka === props.filterPharmacy

                        if(isFilterSituation && isFilterPharmacy) {
                            return (
                                <tr key={post.id}

                                    style={post.isTurnGo ? {background: 'hatchColl'} : null}
                                    className={classNameForColl}
                                    onDoubleClick={() => selectComment(post)}>
                                    <td className='dataTitle'>
                                        <p>{post.dt_date.time}</p>
                                        <p>{post.dt_date.date}</p>
                                    </td>
                                    <td>{post.situation}</td>
                                    <td style={classNameForCategory} className='categoryColl'>{post.category}</td>
                                    <td className="pharmacyCell">
                                        <div className='titleNameTable'>
                                        <span className={classNameForTitleApt}
                                        >{post.apteka}</span>
                                            <span className='tableSpanPhone'>{post.phone}</span>
                                        </div>
                                        <hr className='bordHr'/>
                                        <span className='tableSpanKurPhone'>{post.CounselName} ~ </span>
                                        <span className='tableSpanKurPhone'>{post.kurPhone}</span>
                                    </td>
                                    <td className="colForBorder">{post.grafik}</td>
                                    <td className="colCell">{post.dt_begin}</td>
                                    <td className="colCell">{post.dt_end}</td>
                                    <td className="colCellImg" onDoubleClick={e => e.stopPropagation()}>
                                        <p className={post.isTurnOnOff ? 'light lightOff' : 'light lightOn'}
                                           onClick={() => lightOnOrNot(post)}> </p>
                                        <p className={post.isTurnGo ? 'light lightGo' : 'light lightNotGo'}
                                           onClick={() => lightGoNotGo(post)}> </p>
                                    </td>
                                    <td className="colCell">{post.diff}</td>
                                    <td>{post.teamAh4}</td>
                                    <td className="commentCell">{post.comment}</td>
                                </tr>
                            )
                        } else return null
                    }
                )}
                </tbody>
            </table>
        </div>
    )
}

const BordTable = connect(mapStateToProps, mapDispatchToProps)($BordTable)

export default BordTable;