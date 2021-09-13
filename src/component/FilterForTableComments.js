import React from 'react';

const FilterForTableComments = ({setArray, array, styleComp}) => {

    return (
        <div className={ `filterAll ${styleComp}`}>
            <p className='filterSituationSelect' onClick={()=> setArray('Все')}>Все</p>
            { array && array.map((el, index) =>
                <p key={index} className='filterSituationSelect' onClick={()=> setArray(el)}>{el}</p>)}
        </div>
    )
}

export default FilterForTableComments;