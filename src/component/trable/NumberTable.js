import React, {useEffect} from 'react';
import '../../style/trable.css'

const NumberTable = ({problemNumber, addNewNumber}) => {

    const clearNumber = (num) => addNewNumber({id: num.id})
    return (
        <div className='tableContainer'>
            {problemNumber && problemNumber.map(num => {
                return (
                    <div key={num.id}>
                        <div  className='postNumber'>
                            <p className='problemNumber'>{num.comment}</p>
                            <span className='iconDelete' onClick={() =>clearNumber(num)}> </span>
                        </div>
                        <hr className='brClass'/>
                    </div>
                )
            })}
        </div>
    );
};

export default NumberTable;