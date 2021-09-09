import React from 'react';
import {Modal} from "react-bootstrap";
import {setModalMessage} from "../redux/action";
import {useDispatch, useSelector} from "react-redux";

const ModalMessage = () => {
    const dispatch = useDispatch()
    const modalMessage = useSelector(state => state.comment.modalMessage)

    return (
        <Modal
            size="sm"
            show={!!modalMessage}
            onHide={() => dispatch(setModalMessage(''))}
            aria-labelledby="contained-modal-title-vcenter">
            <p className='testMessage'>{modalMessage}</p>
        </Modal>
    )
}

export default ModalMessage;