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
    setFilterGroup,
    writeSelectTableRow
} from "../redux/action";
import ModalSelectTable from "./ModalSelectTable";
import { addTurnGO, addTurnOnOff } from "../redux/helpFunction";
import FilterForTableComments from "./FilterForTableComments";

const mapStateToProps = (state) => ({
    tableReport: state.comment.tableReport,
    selectTableComment: state.comment.selectTableComment,
    groupAx4: state.comment.groupAx4,
    filterSituation: state.comment.filterSituation,
    filterPharmacy: state.comment.filterPharmacy,
    filterGroupAx4: state.comment.filterGroupAx4,
    arraySituation: state.comment.arraySituation,
})

const mapDispatchToProps = ({
    writeSelectTableRow,
    fetchPutReport,
    fetchReport,
    setIconOnOff,
    setIconGo,
    setFilterSituation,
    setFilterGroup,
    setFilterPharmacy
})

const $BordTable = (props) => {

    const [active, setActive] = useState(false)
    const [openFilterSituation, setOpenFilterSituation] = useState(false)
    const [openFilterPharmacy, setOpenFilterPharmacy] = useState(false)
    const [openFilterTeamAh4, setOpenFilterTeamAh4] = useState(false)

    const selectComment = (post) => {
        props.writeSelectTableRow(post)
        setActive(true)
    }

    const lightOnOrNot = async post => props.setIconOnOff( await addTurnOnOff({turn: post.isTurnOnOff, id: post.id}) )
    const lightGoNotGo = async post => props.setIconGo( await addTurnGO({turn: post.isTurnGo, id: post.id}) )

    const handlerBlurSituation = () => setTimeout( ()=> {setOpenFilterSituation(false)},200)
    const handlerBlurPharmacy = () => setTimeout( ()=> {setOpenFilterPharmacy(false)},200)
    const handlerBlurGroup = () => setTimeout( ()=> {setOpenFilterTeamAh4(false)},200)

    let pharmacy = [...new Set(props.tableReport?.map(el => el.apteka).sort())]
    let group = props.groupAx4?.map(el => el._Description).sort()


    const isFilterTable = (filter, arr) => filter === 'Все' ? arr : arr === filter


    console.log('Situation', openFilterSituation)
    console.log('Pharmacy', openFilterPharmacy)
    console.log('TeamAh4', openFilterTeamAh4)

    return (
        <div className='wrapperTable'>

            <FilterForTableComments
                open = { openFilterSituation }
                close = { setOpenFilterTeamAh4 }
                setArray = {props.setFilterSituation}
                array = {props.arraySituation}
                styleComp={'situation'}/>
            <FilterForTableComments
                open = { openFilterPharmacy }
                close = { setOpenFilterPharmacy }
                setArray = {props.setFilterPharmacy}
                array = {pharmacy}
                styleComp={'pharmacy'}/>
            <FilterForTableComments
                open = { openFilterTeamAh4 }
                close = { setOpenFilterTeamAh4 }
                setArray = {props.setFilterGroup}
                array = {group}
                styleComp={'groupAx4'}/>

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
                    <th className='groupCell'
                        onBlur={ handlerBlurSituation } tabIndex={0}
                        onClick={()=>setOpenFilterSituation(true)}
                    >Авар. ситуация</th>
                    <th className="colCell">Категория</th>
                    <th onClick={()=> setOpenFilterPharmacy(true)}
                        onBlur={ handlerBlurPharmacy }  tabIndex={0}>Аптека</th>
                    <th className="colCell">График</th>
                    <th className="colCell">Выкл</th>
                    <th className="colCell">Вкл</th>
                    <th className="colCell"> </th>
                    <th className="colCellD">Разница</th>
                    <th className='groupCell'
                        onClick={()=> setOpenFilterTeamAh4(true)}
                        onBlur={ handlerBlurGroup }  tabIndex={0}>Бригада</th>
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

                        if( isFilterTable( props.filterSituation, post.situation )
                            && isFilterTable( props.filterPharmacy, post.apteka )
                            && isFilterTable( props.filterGroupAx4,post.teamAh4 )) {

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
                                    <td onClick={()=>setOpenFilterTeamAh4(true)}>{post.teamAh4}</td>
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