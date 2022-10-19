import React from 'react'
import Lottie from 'react-lottie';
import animationData from './lotie/error.json'

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};
function ErrorComponent() {
    return (
        <>
        
          <div style={{minHeight:'100vh',alignItems: 'center',justifyContent: 'center',display:'flex'}}>
            <div>
                <h1 style={{textAlign:'center',fontSize:'1.5em'}}>Not found what your are searching for please contact <b>ADMINISTRATOR</b></h1>
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

export default ErrorComponent
