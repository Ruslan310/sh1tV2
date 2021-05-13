import React  from "react";
import '../style/modal.css'
import {FormControl} from "react-bootstrap";

const Modale = (props) =>{

    const selectApteka = (item) => {
        props.selectTargApteka(item)
        props.setActive()
    }
    const startFilter = (e) => {
        props.setFilter(e.target.value)
    }

  return(
        <div className={props.active ? 'services active' : 'services'}
             onClick={props.setActive}>
            <div className={props.active ? 'services_content active' : 'services_content'}
                 onClick={e => e.stopPropagation()}>
                <div className='services_text'>
                  <div className="d-flex flex-column align-items-center font-weight-bold">
                    <h3>Аптеки</h3>
                   <div className="d-flex flex-row align-items-center">
                      <FormControl
                         style={{width: 292}}
                         type='text'
                         placeholder="поиск аптек"
                         onChange={(e)=>startFilter(e)}
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