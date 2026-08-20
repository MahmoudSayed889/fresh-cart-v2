import React from 'react'
import { ClipLoader } from 'react-spinners'
import SpinnerStyle from './Spinner.module.css'

export default function Spinner() {
    return <>
        <div className={`${SpinnerStyle.layer} d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0 z-1`}>
            <ClipLoader
                loading
                size={55}
                color='#fff'
                speedMultiplier={1}
            />
        </div>
    </>
}
