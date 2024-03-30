import React, { useContext, useEffect, useState } from 'react'
import AddForm from './AddForm';
import SearchTreeSubItem from './SearchTreeSubItem';
import ConfirmationModal from './ConfirmationModal';
import { UserContext } from '../providers/UserProvider';

const SearchTreeItem = ({item, activeItem, setActiveItem, activeSubItem, setActiveSubItem}) => {
    const { isLoggedIn } = useContext(UserContext);
    const [active, setActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        if (activeItem.title === item.title) setActive(true);
        else setActive(false);
    }, [activeItem])
    

    const changeActiveItem = (item) => {
        if (activeItem.title === item.title) setActiveItem("");
        else setActiveItem(item);
        setActiveSubItem("");
    }

    const addToCourse = async (id) => {
        const currentCategories = item.categories;
        currentCategories.push(id);

        try {
            const response = await fetch('http://127.0.0.1:3050/api/courses/' + item._id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    categories: currentCategories
                })
            })
            if (!response.ok) {
                console.log("Failed to add to course");
            } 
        } catch (error) {
            console.log(error.message);
        }
    }

    const askConfirmation = (id) => {
        setIdToDelete(id);
        setIsOpen(true);
    }

    const handleConfirm = () => {
        removeCourse(idToDelete)
        setIdToDelete(null);
        setIsOpen(false)
    }

    const removeCourse = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:3050/api/courses/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': "Application/json"
                }
            })
            if (response.ok) {
                console.log("Succesfully deleted course")
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (newTitle) => {
        try {
            const response = await fetch('http://127.0.0.1:3050/api/categories', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    title: newTitle
                })
            })
            if (!response.ok) {
                console.log("Failed to add new course");
            } else {
                const data = await response.json();
                addToCourse(data._id);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    if (isOpen) return <ConfirmationModal isOpen={isOpen} onCancel={() => setIsOpen(false)} onConfirm={handleConfirm}/>

    return (
        <li className={``}>
            <div className='flex justify-between items-center'>
                <p onClick={() => {changeActiveItem(item)}} className={`my-3 text-lightColor hover:text-primary hover:cursor-pointer ${active ? "text-primary font-bold" : ""}`}>{item.title}</p>
                <div className='flex justify-between items-center ml-5'>
                    <p>{(active ? ' - ' : ' + ')}</p>
                    { isLoggedIn() && <p className='text-lightColor hover:text-red-600 ml-5 font-bold text-xl hover:cursor-pointer' onClick={() => askConfirmation(item._id)}>x</p> }
                </div>
            </div>
            {active && (
                <ul className='list-disc pl-12'>
                    {item.categories.map((category) => (
                        <SearchTreeSubItem item={category} activeSubItem={activeSubItem} setActiveSubItem={setActiveSubItem}/>
                    ))}
                    { isLoggedIn() && <li className='my-3'><AddForm handleSubmit={handleSubmit}/></li> }
                </ul>
            )}
        </li>
    )
}

export default SearchTreeItem