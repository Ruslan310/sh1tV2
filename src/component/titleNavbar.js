import React from 'react';
import {Button, FormControl, Navbar} from "react-bootstrap";
import {enterTimeStart, enterWhatTimeEnd, fetchReport} from "../redux/action";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
   reportTimeStart: state.comment.reportTimeStart,
   reportTimeEnd: state.comment.reportTimeEnd,
})

const mapDispatchToProps = ({
   enterTimeStart,
   enterWhatTimeEnd,
   fetchReport
})

const $TitleNavbar = (props) => {
   const handlerTimeStart = (e) => {
      props.enterTimeStart(e.target.value);
   }
   const handlerTimeEnd = (e) => {
      props.enterWhatTimeEnd(e.target.value)
   }

   const handlerReport = () => {
      props.fetchReport({
         dateStart: props.reportTimeStart,
         dateEnd: props.reportTimeEnd,
      })
   }

   return (
      <Navbar bg="dark" variant="dark" className="wraperNavbar">
         <FormControl onChange={(e) => handlerTimeStart(e)}
                      className='inputTitleTime' type='date'/>
         <FormControl onChange={(e) => handlerTimeEnd(e)}
                      className='inputTitleTime' type='date'/>
         <Button variant="success"
                 onClick={(e) => handlerReport(e)}
         >Отчет</Button>
         <div className='wraperNavbarText'>
            <h4>Дашборд для Насти</h4>
         </div>
      </Navbar>
   );
};

const TitleNavbar = connect(mapStateToProps, mapDispatchToProps)($TitleNavbar)

export default TitleNavbar;