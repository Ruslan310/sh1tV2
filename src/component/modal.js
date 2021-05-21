import React, {useRef} from "react";
import '../style/modal.css'
import {FormControl} from "react-bootstrap";

const Modale = (props) =>{

    const selectApteka = (item) => {
        props.selectTargApteka(item)
        props.setActive()
    }
    const startFilter = () => {
        props.setFilter(inputSearch.current.value)
    }
const inputSearch = useRef(null)

    const closeItModal = () =>{
        props.setActive()
        props.resetFilter()
        inputSearch.current.value = null
    }

    return(
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
                         ref={inputSearch}
                         onChange={startFilter}
                      />
                   </div>
                    <hr width="250" size="5"/>
                  </div>
                  <div className='scroll'>
                      {props.apteka && props.apteka.map( item => {
                            if (item.isFilter) {
                                return (
                                    <p className='scrollApteka' key={item.idApteka}
                                       onClick={(e) => selectApteka(item)}>{item.apteka}</p>
                                )
                            }
                        }
                    )}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Modale