import React, {useState} from 'react';
import {Button, FormControl} from "react-bootstrap";
import useInput from "../hooks/useInput";
import ModalAx4 from "./ModalAx4";
import {connect} from "react-redux";
import {postComment, selectTargetPharmacy, setModalMessage, setSelectGroupAx4} from "../redux/action";

const mapStateToProps = (state) => ({
    pharmacyList: state.comment.pharmacyList,
    groupAx4: state.comment.groupAx4,
    selectGroupAx4: state.comment.selectGroupAx4,
    textPharmacy: state.comment.textPharmacy,
})

const mapDispatchToProps = ({selectTargetPharmacy, setSelectGroupAx4, setModalMessage, postComment})

const $AddComment = props => {

    const [modal, setModal] = useState(false)
    const inputEnterTimeOff = useInput('')
    const inputEnterTimeOn = useInput('')
    const inputTextComment = useInput('')
    const [situation, setSituation] = useState('Выключение света')

    async function wrightEntered() {
        if (!props.textPharmacy.idPharmacy) props.setModalMessage('Выберите аптеку')
        if (!inputEnterTimeOff.value) props.setModalMessage('Некорректное время')
        if (inputEnterTimeOn.value && inputEnterTimeOn.value < inputEnterTimeOff.value) {
            return props.setModalMessage('Некорректный интервал времени')
        }
        props.postComment({
            pharmacy: props.textPharmacy.idPharmacy,
            timeOff: inputEnterTimeOff.value,   /** должна быть (левая)*/
            timeOn: inputEnterTimeOn.value,     /** должна быть (правая)*/
            whatComment: inputTextComment.value,
            situation: situation,
            teamAh4: props.selectGroupAx4
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
            <ModalAx4 setActive={setModal} active={modal}
                      groupAx4={props.groupAx4}
                      setSelectGroupAx4={props.setSelectGroupAx4}/>
            <Button variant="secondary" className="m-3" onClick={() => props.showModalPharmacy(true)}
            >Выберите аптеку</Button>
            {!props.textPharmacy.apteka ? <h6 className='mb-2'>аптека не выбрана</h6> :
                <div className='mainWrapper'>
                    <h3 className='pharmacyName'>{props.textPharmacy.apteka}</h3>
                    {props.textPharmacy.days1 === "00:00"
                        ? <h5>Круглосуточная</h5>
                        : <div className='d-flex justify-content-center mb-2'>
                            <h5>{props.textPharmacy.days1} - </h5>
                            <h5 className='pl-1'>{props.textPharmacy.days2}</h5>
                        </div>}
                </div>
            }
            <div>
                <FormControl onChange={(e) => setSituation(e.target.value)} value={situation}
                             className='textareaComment' as="select">
                    <option value={'Выключение света'}>Выключение света</option>
                    <option value={'Реклама'}>Реклама</option>
                    <option value={'Канализация'}>Канализация</option>
                    <option value={'Потолок / стены / пол'}>Потолок / стены / пол</option>
                    <option value={'Ролет / дверь'}>Ролет / дверь</option>
                    <option value={'Пожар'}>Пожар</option>
                    <option value={'Иные'}>Иные</option>
                </FormControl>
                <div>
                    <Button variant="secondary" className="m-3" onClick={() => setModal(true)}
                    >Бригада АХЧ</Button>
                    {!props.selectGroupAx4
                        ? <h6 className='mb-2'>бригада не выбрана</h6>
                        : <div className='mainWrapper'>
                            <h3 className='groupName'>{props.selectGroupAx4}</h3>
                        </div>
                    }
                </div>
                <div className="d-flex flex-row">
                    <FormControl {...inputEnterTimeOff}
                                 style={{width: 185}} className="m-2" type='time'/>
                    <FormControl {...inputEnterTimeOn}
                                 style={{width: 186}} type='time' className="m-2"/>
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