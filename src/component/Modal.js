import React, {useState} from "react";
import {FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {resetFilter, setFilter} from "../redux/action";


const mapDispatchToProps = ({ setFilter, resetFilter })

const $Modal = (props) => {

    const [inputSearch, setInputSearch] = useState('')

    const selectPharmacy = item => {
        props.selectTarget(item)
        closeItModal()
    }
    const startFilter = e => {
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
                        <h3 className='textModalTitle'>{props.title}</h3>
                        {props.search
                            ? <div className="d-flex flex-row align-items-center">
                                <FormControl
                                    style={{width: 292}}
                                    type='text'
                                    placeholder="поиск аптек"
                                    value={inputSearch}
                                    onChange={startFilter}
                                />
                                </div>
                            : null
                        }
                        <hr width="250" size="5"/>
                    </div>
                    <div className='scroll'>
                        {props.list && props.list.map(item => {
                                if (props.search ? item.isFilter : true) {
                                    return (
                                        <p className='scrollPharmacy' key={item[props.id]}
                                           onClick={() => selectPharmacy(item)}>{item[props.name]}</p>
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

const Modal = connect(null, mapDispatchToProps)($Modal)

export default Modal