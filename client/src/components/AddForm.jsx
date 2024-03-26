import React from 'react'

const AddForm = ({handleSubmit}) => {
    const submitForm = (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;

        handleSubmit(title);
    }

    return (
        <form className='flex  mr-2' onSubmit={submitForm}>
            <input className='w-1/2 p-2 border-lightColor border' placeholder='...' type="text" name="title" id="title" />
            <button className='p-2 hover:bg-primary hover:rounded-none' type='submit'>Add</button>
        </form>
    )
}

export default AddForm