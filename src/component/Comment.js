import {connect} from "react-redux";
import Modal from "./Modal";
import Loader from "./loader";
import BordTable from "./BordTable";
import {showModalPharmacy, setFilter, closeExportMenu, setLoader, setModalMessage} from "../redux/action";
import TitleNavbar from "./TitleNavbar";
import Info from "./info/Info";
import Problem from "./trable/Problem";
import ImportExel from "./importToExel/importExel";
import React from "react";
import ModalMessage from "./ModalMessage";
import AddComment from "./AddComment";

const mapStateToProps = (state) => ({
    showModelPharmacy: state.comment.showModelPharmacy,
    isLoader: state.comment.isLoader,
    modalMessage: state.comment.modalMessage,
    window: state.comment.window,
    tableReport: state.comment.tableReport,
    menuExportExel: state.comment.menuExportExel,
})

const mapDispatchToProps = ({showModalPharmacy, setFilter, closeExportMenu, setLoader, setModalMessage})

const $Comment = (props) => {
    return (
        <div className="mainWrapper">
            {props.isLoader === true && <Loader/>}
            <TitleNavbar/>
            <ModalMessage/>
            <Modal active={props.showModelPharmacy}
                   setActive={props.showModalPharmacy}/>
            <ImportExel
                tableReport={props.tableReport}
                menuExportExel={props.menuExportExel}
                closeExportMenu={props.closeExportMenu}
                setLoader={props.setLoader}
                setModalMessage={props.setModalMessage}
            />
            {props.window === 'component' &&
                 <div className="wrapperBordTable">
                    <div className="wrapperComponent">
                        <BordTable/>
                        <AddComment showModalPharmacy={props.showModalPharmacy}/>
                    </div>
                 </div>}
            {props.window === 'info' && <Info/>}
            {props.window === 'problem' && <Problem/>}
        </div>
    )
}

const Comment = connect(mapStateToProps, mapDispatchToProps)($Comment)

export default Comment