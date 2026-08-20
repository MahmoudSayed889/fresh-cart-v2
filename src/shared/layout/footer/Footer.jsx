import React from 'react'

export default function Footer() {
  return <>

    <footer className=' bg-secondary-subtle'>
      <div className="container py-5">
        <h6 className=' h3 '>Get the FreshCart app</h6>
        <p className=' text-muted'>We will send you a link, open it on your phone to download the app</p>


        <div className="row w-100 mx-auto gap-1 justify-content-between">
          <div className="col-md-9 p-0">
            <input type="email" id="" className=' form-control' placeholder='Email' />
          </div>
          <div className="col-md-2 p-0">
            <button className='btn btn-success w-100 text-capitalize'>share app link</button>
          </div>
        </div>
      </div>
    </footer>
  </>
}
