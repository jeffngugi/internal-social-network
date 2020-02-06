import React from 'react'

const ErrorAlert = (errors) => {
  
    return (
       
        Object.entries(errors).length === 0 ? null : <div className="alert alert-warning" role="alert">
        {errors}
    </div>
    )
}

export default ErrorAlert
