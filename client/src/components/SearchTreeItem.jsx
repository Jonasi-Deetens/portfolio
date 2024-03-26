import React, { useEffect, useState } from 'react'
import AddForm from './AddForm';
import SearchTreeSubItem from './SearchTreeSubItem';

const SearchTreeItem = ({item, activeItem, setActiveItem, activeSubItem, setActiveSubItem}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (activeItem.title === item.title) setActive(true);
        else setActive(false);
    }, [activeItem])
    

    const changeActiveItem = (title) => {
        if (activeItem.title === title) setActiveItem("");
        else setActiveItem(title);
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

    return (
        <li className={``}>
            <p onClick={() => {changeActiveItem(item)}} className={`my-3 text-lightColor hover:text-primary hover:cursor-pointer ${active ? "text-primary font-bold" : ""}`}>{item.title}  <span className='float-end pr-10'>{(active ? ' - ' : ' + ')}</span></p>
            {active && (
                <ul className='list-disc pl-12'>
                    {item.categories.map((category) => (
                        <SearchTreeSubItem item={category} activeSubItem={activeSubItem} setActiveSubItem={setActiveSubItem}/>
                    ))}
                    <li className='my-3'><AddForm handleSubmit={handleSubmit}/></li>
                </ul>
            )}
        </li>
    )
}

export default SearchTreeItem