import React from "react";
import '../style/modal.css'

const ModalAx4 = (props) => {

    const selectGroup = (item) => {
        props.setSelectGroupAx4(item._Description)
        closeModal()
    }
    const closeModal = () => props.setActive(false)
    return (
        <div className={props.active ? 'services active' : 'services'}
             onClick={closeModal}>
            <div className={props.active ? 'services_content active' : 'services_content'}
                 onClick={e => e.stopPropagation()}>
                <div className='services_text'>
                    <div className="d-flex flex-column align-items-center font-weight-bold">
                        <h3 className='textModalTitle'>Бригады АХЧ</h3>
                        <hr width="250" size="5"/>
                    </div>
                    <div className='scroll'>
                        {props.groupAx4 && props.groupAx4.map(item => {
                                return (
                                    <p className='scrollPharmacy' key={item._Code}
                                       onClick={() => selectGroup(item)}>{item._Description}</p>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAx4