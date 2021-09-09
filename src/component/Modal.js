import React, {useState} from "react";
import {FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {resetFilter, selectTargetPharmacy, setFilter} from "../redux/action";

const mapStateToProps = (state) => ({ pharmacyList: state.comment.pharmacyList })

const mapDispatchToProps = ({
    selectTargetPharmacy, setFilter, resetFilter
})

const $Modal = (props) => {

    const [inputSearch, setInputSearch] = useState('')

    const selectPharmacy = item => {
        props.selectTargetPharmacy(item)
        props.setActive()
    }
    const startFilter = e => {
        console.log(e.target.value)
        setInputSearch(e.target.value)
        props.setFilter(e.target.value)
    }

    const closeItModal = () => {
        props.setActive()
        props.resetFilter()
        setInputSearch('')
    }

    return (
        <div className={props.active ? 'services active' : 'services'}
             onClick={closeItModal}>
            <div className={props.active ? 'services_content active' : 'services_content'}
                 onClick={e => e.stopPropagation()}>
                <div className='services_text'>
                    <div className="d-flex flex-column align-items-center font-weight-bold">
                        <h3 className='textModalTitle'>Аптеки</h3>
                        <div className="d-flex flex-row align-items-center">
                            <FormControl
                                style={{width: 292}}
                                type='text'
                                placeholder="поиск аптек"
                                value={inputSearch}
                                onChange={startFilter}
                            />
                        </div>
                        <hr width="250" size="5"/>
                    </div>
                    <div className='scroll'>
                        {props.pharmacyList && props.pharmacyList.map(item => {
                                if (item.isFilter) {
                                    return (
                                        <p className='scrollPharmacy' key={item.idPharmacy}
                                           onClick={() => selectPharmacy(item)}>{item.apteka}</p>
                                    )
                                }
                                return null
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Modal = connect(mapStateToProps, mapDispatchToProps)($Modal)

export default Modal