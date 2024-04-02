import React, { useContext, useEffect, useState } from 'react'
import ConfirmationModal from './ConfirmationModal';
import { UserContext } from '../providers/UserProvider';

const SearchTreeSubItem = ({item, activeSubItem, setActiveSubItem}) => {
    const { isLoggedIn } = useContext(UserContext);
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
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/categories/' + id, {
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
        <li className='flex justify-between items-center'>
            <p onClick={() => {changeActiveSubItem(item)}} className={`my-3 text-lightColor hover:text-primary hover:cursor-pointer ${active ? "text-primary font-bold" : ""}`}>{item.title}</p>
            { isLoggedIn() && <p className='text-lightColor hover:text-red-600 ml-5 font-bold text-xl hover:cursor-pointer' onClick={() => askConfirmation(item._id)}>x</p> }
        </li>
    )
}

export default SearchTreeSubItem