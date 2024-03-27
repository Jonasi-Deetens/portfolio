import React from 'react'

const ConfirmationModal = ({isOpen, onCancel, onConfirm}) => {
    if (!isOpen) return null;

    return (
        <div className='w-2/3 m-auto'>
            <div className='flex flex-col items-center justify-center'>
                <p className='mb-5'>Are you sure you want to delete it?</p>
                <div>
                    <button onClick={onConfirm}>
                        Yes
                    </button>
                    <button onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal