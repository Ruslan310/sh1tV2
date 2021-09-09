import React from 'react';
import '../style/loader.css'
const Loader = () => {
    return (
        <div className='loaderWrapper'>
            <div className="loader-spinner">
                <div className="loader">
                    <div> </div>
                    <div> </div>
                    <div> </div>
                    <div> </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;