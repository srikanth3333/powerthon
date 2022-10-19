import React from 'react'
import Lottie from 'react-lottie';
import animationData from './lotie/excel.json'

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};
function Excel() {
    return (
        <>
        
          <div style={{minHeight:'80vh',alignItems: 'center',justifyContent: 'center',display:'flex'}}>
            <div>
                <h1 style={{textAlign:'center',fontSize:'1.5em'}}>Please wait while we fetch data for you...</h1>
                    <Lottie 
                            options={defaultOptions}
                            height={400}
                            width={400}
                    />
              </div>
          </div>
        </>
    )
}

export default Excel;
