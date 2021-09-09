import React from 'react';

const FilterPharmacy = (props) => {
    let pharmacy = [...new Set(props.tableReport.map(el => el.apteka).sort())]

    return (
        <div className='filterPharmacy'>
            <p className='filterSituationSelect' onClick={()=> props.setFilterPharmacy('Все')}>Все</p>
            {pharmacy.map((el, index) => {
                return (
                    <p key={index} className='filterSituationSelect' onClick={()=> props.setFilterPharmacy(el)}>{el}</p>
                )
            })}
        </div>
    )
}

export default FilterPharmacy;