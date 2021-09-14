import React, {useState} from 'react';
import {Button, FormControl} from "react-bootstrap";
import useInput from "../hooks/useInput";
import {connect} from "react-redux";
import {
    postComment,
    selectTargetPharmacy,
    setModalMessage,
    setSelectGroupAx4
} from "../redux/action";
import Modal from "./Modal";

const mapStateToProps = (state) => ({
    pharmacyList: state.comment.pharmacyList,
    groupAx4: state.comment.groupAx4,
    selectGroupAx4: state.comment.selectGroupAx4,
    textPharmacy: state.comment.textPharmacy,
    arraySituation: state.comment.arraySituation,
})

const mapDispatchToProps = ({selectTargetPharmacy, setSelectGroupAx4, setModalMessage, postComment})

const $AddComment = props => {

    const [modalPharmacy, setModalPharmacy] = useState(false)
    const [modalAx4, setModalAx4] = useState(false)

    const inputEnterTimeOff = useInput('')
    const inputEnterTimeOn = useInput('')
    const inputTextComment = useInput('')
    const [situation, setSituation] = useState('Выключение света')

    async function wrightEntered() {
        if (!props.textPharmacy.idPharmacy) props.setModalMessage('Выберите аптеку')
        if (!inputEnterTimeOff.value) props.setModalMessage('Некорректное время')
        if (inputEnterTimeOn.value && inputEnterTimeOn.value < inputEnterTimeOff.value) {
            props.setModalMessage('Некорректный интервал времени')
        }
        props.postComment({
            pharmacy: props.textPharmacy.idPharmacy,
            timeOff: inputEnterTimeOff.value,   /** должна быть (левая)*/
            timeOn: inputEnterTimeOn.value,     /** должна быть (правая)*/
            whatComment: inputTextComment.value,
            situation: situation,
            teamAh4: props.selectGroupAx4._Description
        })
        props.selectTargetPharmacy('')
        inputEnterTimeOff.onChange({target: {value: ''}})
        inputEnterTimeOn.onChange({target: {value: ''}})
        inputTextComment.onChange({target: {value: ''}})
        setSituation('Выключение света')
        props.setSelectGroupAx4('')
    }


    return (
        <div className="wrapperAddComment">
            <Modal
                setActive={setModalPharmacy}
                active={modalPharmacy}
                selectTarget={props.selectTargetPharmacy}
                search={true}
                id={"idPharmacy"}
                name={"pharmacy"}
                list={props.pharmacyList}
                title={'Аптеки'}
            />
            <Modal
                search={false}
                setActive={setModalAx4}
                active={modalAx4}
                id={"_Code"}
                name={"_Description"}
                groupAx4={props.groupAx4}
                selectTarget={props.setSelectGroupAx4}
                list={props.groupAx4}
                title={'Бригады'}
            />

            <Button variant="secondary" className="m-3" onClick={() => setModalPharmacy(true)}
            >Выберите аптеку</Button>
            {!props.textPharmacy.pharmacy ? <h6 className='mb-2'>аптека не выбрана</h6> :
                <div className='mainWrapper'>
                    <h3 className='pharmacyName'>{props.textPharmacy.pharmacy}</h3>
                    {props.textPharmacy.days1 === "00:00"
                        ? <h5>Круглосуточная</h5>
                        : <div className='d-flex justify-content-center mb-2'>
                            <h5>{props.textPharmacy.days1} - </h5>
                            <h5 className='pl-1'>{props.textPharmacy.days2}</h5>
                        </div>}
                </div>
            }
            <div>
                <FormControl onChange={(e) => setSituation(e.target.value)}
                             value={situation} className='textareaComment' as="select">
                    {props.arraySituation.map( (el, index) => {
                        return (
                            <option key = {index} value={el}>{el}</option>
                        )
                    })}

                </FormControl>
                <div>
                    <Button variant="secondary" className="m-3" onClick={() => setModalAx4(true)}
                    >Бригада АХЧ</Button>
                    {!props.selectGroupAx4
                        ? <h6 className='mb-2'>бригада не выбрана</h6>
                        : <div className='mainWrapper'>
                            <h3 className='groupName'>{props.selectGroupAx4._Description}</h3>
                        </div>
                    }
                </div>
                <div className="d-flex flex-row">
                    <FormControl {...inputEnterTimeOff} className="inputTime" type='time'/>
                    <FormControl {...inputEnterTimeOn} className="inputTime" type='time' />
                </div>
                <FormControl as="textarea" rows={2} {...inputTextComment}
                             className="textareaComment" placeholder="оставьте ваш коментарий"/>
            </div>
            <Button
                className="saveButton"
                variant="success"
                onClick={wrightEntered}
            >Сохранить коментарий</Button>
        </div>
    )
}

const AddComment = connect(mapStateToProps, mapDispatchToProps)($AddComment)

export default AddComment;