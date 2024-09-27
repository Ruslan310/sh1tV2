import React from 'react';

const FilterForTableComments = ({setArray, array, styleComp, open, close, active}) => {

    const handleSelect = (el) => {
        setArray(el)
        close()
    }

    console.log(open)
    return (
            <div className={ open ? `filterAll activeFilter ${styleComp}` : `filterAll ${styleComp}`}>
                <p className='filterSituationSelect' onClick={()=> setArray('Все')}>Все</p>
                { array && array.map((el, index) =>
                    <p key={index} className='filterSituationSelect' onClick={()=> handleSelect(el)}>{el}</p>)}
            </div>
    )
}

export default FilterForTableComments;