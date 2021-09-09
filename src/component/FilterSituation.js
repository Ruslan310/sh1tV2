import React from 'react';

const FilterSituation = (props) => {

    let arr = [
        'Все',
        'Выключение света',
        'Реклама',
        'Канализация',
        'Потолок / стены / пол',
        'Ролет / дверь',
        'Пожар',
        'Иныее'

    ]
    return (
            <div className='filterSituation'>
                {arr.map((el, index) => {
                    return (
                        <p key={index} className='filterSituationSelect' onClick={()=> props.setFilterSituation(el)}>{el}</p>
                    )
                })}
            </div>
    )
}

export default FilterSituation;