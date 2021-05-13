import React, {useState} from 'react';
import {connect} from "react-redux";
import '../style/table.css'
import {fetchPutReport, fetchReport, writeSelectTableRow} from "../redux/action";
import ModalSelectTable from "./modalSelectTable";

const mapStateToProps = (state) => ({
   tableReport: state.comment.tableReport,
   selectTableComment: state.comment.selectTableComment,
})

const mapDispatchToProps = ({
   writeSelectTableRow, fetchPutReport,fetchReport
})

const $BordTable = (props) => {

   const [active, setActive] = useState(false)

   const selectComment = (post) => {
      console.log(post)
      props.writeSelectTableRow(post)
      setActive(true)
   }
   return (
      <div>
         <ModalSelectTable
            active={active}
            setActive={setActive}
            selectTableComment={props.selectTableComment}
            fetchPutReport={props.fetchPutReport}
            fetchReport={props.fetchReport}
            writeSelectTableRow={props.writeSelectTableRow}
         />
      <table className='table ml-3 w-45'>
         <thead>
         <tr>
            <th>Дата</th>
            <th>Аптека</th>
            <th>График</th>
            <th>Выключили</th>
            <th>Включили</th>
            <th>Коментарий</th>
         </tr>
         </thead>
         <tbody>
         {props.tableReport && props.tableReport.map(post => {
               return (
                  <tr key={post.id} onDoubleClick={(e) => selectComment(post)}>
                     <td style={{width: 110}}>{post.dt_date}</td>
                     <td className='tableTd'>{post.apteka}</td>
                     <td style={{width: 110}}>{post.grafik}</td>
                     <td style={{width: 100}}>{post.dt_begin}</td>
                     <td style={{width: 100}}>{post.dt_end}</td>
                     <td style={{width: 200}}>{post.comment === 'null' ? ' ' : post.comment}</td>
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