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
    setModalMessage,
    cleanApteka,
    resetFilter,
    fetchReport
} from "../redux/action";
import TitleNavbar from "./titleNavbar";
import Info from "./Info";
import useInput from "../hooks/useInput";
import TableTrable from "./tableTrable";

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
    window: state.comment.window,
    tableReport: state.comment.tableReport,
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
    setModalMessage,
    cleanApteka,
    resetFilter,
    fetchReport
})


const $Comment = (props) => {
    // let nowDate = new Date().toISOString().substr(0, 10)
    const inputenterTimeOff = useInput('')
    const inputenterTimeOn = useInput('')
    const inputtextComment = useInput('')

    async function wrightEntered() {
        if (!props.textApteka.idApteka) {
            props.setModalMessage('Выберите аптеку')
            return null
        }
        if (!inputenterTimeOff.value) {
            props.setModalMessage('Некоректное время')
            return null
        }
        if (inputenterTimeOn.value && inputenterTimeOn.value < inputenterTimeOff.value) {
            props.setModalMessage('Некоректный интервал времени')
            return null
        }
        props.postComment({
            whatApteka: props.textApteka.idApteka,
            timeOff: inputenterTimeOff.value, /** должна быть (левая)*/
            timeOn: inputenterTimeOn.value, /** должна быть (правая)*/
            whatComment: inputtextComment.value
        })
        props.cleanApteka()
        inputenterTimeOff.onChange({target: {value: ''}})
        inputenterTimeOn.onChange({target: {value: ''}})
        inputtextComment.onChange({target: {value: ''}})
    }

    return (
        <div className="mainWrapper d-flex flex-column">
            {props.isLoader === true ? <Loader/> : null}
            <TitleNavbar/>
            {props.window === 'component' && <div className="wraperComponent">
                <BordTable/>
                <div className="wraperAddComment">
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
                            resetFilter={props.resetFilter}
                        />
                    </div>
                    {!props.textApteka.apteka ? <h6>аптека не выбрана</h6> :
                        <div className='d-flex flex-column align-items-center'>
                            <h3>{props.textApteka.apteka}</h3>
                            {props.textApteka.days1 === "00:00" ?
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
                                {...inputenterTimeOff}
                                style={{width: 191}}
                                className="m-2"
                                type='time'
                            />
                            <FormControl
                                {...inputenterTimeOn}
                                style={{width: 192}}
                                type='time'
                                className="m-2"
                            />
                        </div>
                        <FormControl
                            as="textarea" rows={2}
                            {...inputtextComment}
                            className="textareaComment"
                            placeholder="оставьте ваш коментарий"
                        />
                    </div>
                    <Button
                        className="saveButton"
                        variant="success"
                        onClick={(e) => wrightEntered(e)}
                    >Сохранить коментарий</Button>
                </div>
            </div>}
            {props.window === 'info' && <Info
                resetFilter={props.resetFilter}
            />}
            {props.window === 'trable' && <TableTrable
                // resetFilter={props.resetFilter}
            />}
        </div>
    );
};

const Comment = connect(mapStateToProps, mapDispatchToProps)($Comment)

export default Comment;