import React, {useState} from 'react';
import {connect} from "react-redux";
import '../style/table.css'
import {fetchPutReport, fetchReport, setModalMessage, writeSelectTableRow} from "../redux/action";
import ModalSelectTable from "./modalSelectTable";

const mapStateToProps = (state) => ({
    tableReport: state.comment.tableReport,
    selectTableComment: state.comment.selectTableComment,
    modalMessage: state.comment.modalMessage,
})

const mapDispatchToProps = ({
    writeSelectTableRow, fetchPutReport, fetchReport, setModalMessage
})

const $BordTable = (props) => {

    const [active, setActive] = useState(false)

    const selectComment = (post) => {
        props.writeSelectTableRow(post)
        setActive(true)
    }
    return (
        <div className='wraperTable'>
            <ModalSelectTable
                active={active}
                setActive={setActive}
                selectTableComment={props.selectTableComment}
                fetchPutReport={props.fetchPutReport}
                fetchReport={props.fetchReport}
                writeSelectTableRow={props.writeSelectTableRow}
                modalMessage={props.modalMessage}
                setModalMessage={props.setModalMessage}
            />
            <table className='table'>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Аптека</th>
                    <th className="colCell">График</th>
                    <th className="colCell">Выключили</th>
                    <th className="colCell">Включили</th>
                    <th className="colCell">Длительность</th>
                    <th className="commentCell">Коментарий</th>
                </tr>
                </thead>
                <tbody>
                {props.tableReport && props.tableReport.map(post => {
                        return (
                            <tr key={post.id} onDoubleClick={(e) => selectComment(post)}>
                                <td>{post.dt_date}</td>
                                <td className="aptekaCell">{post.apteka}</td>
                                <td className="colCell">{post.grafik}</td>
                                <td className="colCell">{post.dt_begin}</td>
                                <td className="colCell">{post.dt_end}</td>
                                <td className="colCell">{post.diff}</td>
                                <td className="commentCell">{post.comment}</td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
        </div>
    );
};

const BordTable = connect(mapStateToProps, mapDispatchToProps)($BordTable)

export default BordTable;