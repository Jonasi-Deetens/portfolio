import React, { useEffect, useState } from 'react'
import ConfirmationModal from './ConfirmationModal';

const SearchTreeSubItem = ({item, activeSubItem, setActiveSubItem}) => {
    const [active, setActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        if (activeSubItem.title === item.title) setActive(true);
        else setActive(false);
    }, [activeSubItem])
    

    const changeActiveSubItem = (item) => {
        if (activeSubItem.title === item.title) {
            setActiveSubItem("");
        } else setActiveSubItem(item);
    }

    const askConfirmation = (id) => {
        setIdToDelete(id);
        setIsOpen(true);
    }

    const handleConfirm = () => {
        removeCategory(idToDelete)
        setIdToDelete(null);
        setIsOpen(false)
    }

    const removeCategory = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:3050/api/categories/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': "Application/json"
                }
            })
            if (response.ok) {
                console.log("Succesfully deleted category")
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if (isOpen) return <ConfirmationModal isOpen={isOpen} onCancel={() => setIsOpen(false)} onConfirm={handleConfirm}/>

    return (
        <li className={``}>
            <p onClick={() => {changeActiveSubItem(item)}} className={`my-3 text-lightColor hover:text-primary hover:cursor-pointer ${active ? "text-primary font-bold" : ""}`}>{item.title}</p>
            <span className='text-lightColor hover:text-red-600 ml-5 font-bold text-xl' onClick={() => askConfirmation(item._id)}>x</span>
        </li>
    )
}

export default SearchTreeSubItem