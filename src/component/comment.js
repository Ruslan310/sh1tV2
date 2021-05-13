import {Button, FormControl, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import Modale from "./modal";
import Loader from "./loader";
import BordTable from "./bordTable";
import {

    enterApteks,
    enterTextComment,
    enterWhatTimeOff,
    enterWhatTimeOn,
    fetchApteks,
    CloseApteks,
    ShowApteks,
    selectTarget,
    setFilter,
    postComment,
    setModalMessage
} from "../redux/action";
import TitleNavbar from "./titleNavbar";
import {useRef} from "react";

const mapStateToProps = (state) => ({
    aptekaFiltered: state.comment.aptekaFiltered,
    showApteka: state.comment.showApteka,
    textApteka: state.comment.textApteka,
    textComment: state.comment.textComment,
    enterTimeOn: state.comment.enterTimeOn,
    enterTimeOff: state.comment.enterTimeOff,
    isLoader: state.comment.isLoader,
    error: state.comment.error,
    postCommentDate: state.comment.postCommentDate,
    modalMessage: state.comment.modalMessage,
})

const mapDispatchToProps = ({
    fetchApteks,
    CloseApteks,
    ShowApteks,
    enterApteks,
    enterTextComment,
    enterWhatTimeOn,
    enterWhatTimeOff,
    selectTarget,
    setFilter,
    postComment,
    setModalMessage
})


const $Comment = (props) => {

    const commentHandler = (e) => {
        props.enterTextComment(e.target.value)
    }
    const commentTimeOnHandler = (e) => {
        props.enterWhatTimeOn(e.target.value)
    }
    const commentTimeOffHandler = (e) => {
        props.enterWhatTimeOff(e.target.value)
    }

    const wrightEntered = (e) => {
        if (!props.textApteka.idApteka) {
            props.setModalMessage('Выберите аптеку')
            return null
        }
        if (!props.enterTimeOff) {
            props.setModalMessage('Некоректное время')
            return null
        }
        if (props.enterTimeOn < props.enterTimeOff) {
            props.setModalMessage('Некоректный интервал времени')
            return null
        }
        props.postComment({
            whatApteka: props.textApteka.idApteka,
            timeOff: props.enterTimeOff, /** должна быть (левая)*/
            timeOn: props.enterTimeOn, /** должна быть (правая)*/
            whatComment: props.textComment
        })
        ///ref зачистка
    }

    const enterTimeOff = useRef()
    const enterTimeOn = useRef()
    const textComment = useRef()

    return (
        <div className="mainWrapper d-flex flex-column align-items-center">
            {props.isLoader === true ? <Loader/> : null}
            <TitleNavbar/>
            <div className="d-flex flex-row w-100">
                <BordTable/>
                <div className="d-flex flex-column align-items-center w-50">
                    <Modal
                        size="sm"
                        show={!!props.modalMessage}
                        onHide={() => props.setModalMessage('')}
                        aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Body>{props.modalMessage}</Modal.Body>
                    </Modal>
                    <div className="m-3">
                        <Button
                            onClick={props.ShowApteks}
                            variant="secondary"
                        >Выберите аптеку</Button>
                        <Modale
                            apteka={props.aptekaFiltered}
                            active={props.showApteka}
                            setActive={props.CloseApteks}
                            selectTargApteka={props.selectTarget}
                            setFilter={props.setFilter}
                        />
                    </div>
                    {!props.textApteka.apteka ? <h6>аптека не выбрана</h6> :
                        <div className='d-flex flex-column align-items-center'>
                            <h3>{props.textApteka.apteka}</h3>
                                {props.textApteka.days1==="00:00" ?
                                    <h5>Круглосуточная</h5> :
                                <div className='d-flex justify-content-center'>
                                    <h5>{props.textApteka.days1} - </h5>
                                    <h5 className='pl-1'>{props.textApteka.days2}</h5>
                                </div>}
                        </div>
                    }
                    <div>
                        <div className="d-flex flex-row align-items-center">
                            <FormControl
                                style={{width: 191}}
                                className="m-2"
                                placeholder="Выключили свет"
                                ref={enterTimeOff}
                                type='time'
                                onChange={(e) => commentTimeOffHandler(e)}
                            />
                            <FormControl
                                style={{width: 192}}
                                type='time'
                                className="m-2"
                                placeholder="Включили свет"
                                onChange={(e) => commentTimeOnHandler(e)}
                            />
                        </div>
                        <FormControl
                            as="textarea" rows={2}
                            style={{width: 400}}
                            className="m-2"
                            placeholder="оставьте ваш коментарий"
                            onChange={(e) => commentHandler(e)}
                        />
                    </div>
                    <Button
                        className="m-3"
                        variant="success"
                        onClick={(e) => wrightEntered(e)}
                    >Сохранить коментарий</Button>
                </div>
            </div>
        </div>
    );
};

const Comment = connect(mapStateToProps, mapDispatchToProps)($Comment)

export default Comment;