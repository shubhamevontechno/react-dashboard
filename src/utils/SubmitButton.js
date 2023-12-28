import React, { Children } from 'react'

const SubmitButton = ({ loading, onClick, children }) => {
  return (
    <>
        <button
            className='btn btn-primary'
            onClick={onClick}
            disabled={loading}
        >
            {loading ? 'Loading...' : children}
        </button>
    </>
  )
}

export default SubmitButton