import React, { useContext, useEffect, useState } from 'react'
import SearchTreeItem from './SearchTreeItem'
import AddForm from './AddForm'
import { UserContext } from '../providers/UserProvider'

const SearchTree = ({searchItems, addItem, setSearchedItem, setSearchedSubItem}) => {
    const { isLoggedIn } =  useContext(UserContext);
    const [activeItem, setActiveItem] = useState("");
    const [activeSubItem, setActiveSubItem] = useState("");

    useEffect(() => {
        setSearchedItem(activeItem);
        setSearchedSubItem(activeSubItem);
    }, [activeItem, activeSubItem])
    
    
    return (
        <div className='h-full w-full py-28 bg-secondaryDark'>
            <ul className='px-10'>
                {searchItems && searchItems.map((item) => (
                    <SearchTreeItem item={item} activeItem={activeItem} setActiveItem={setActiveItem} activeSubItem={activeSubItem} setActiveSubItem={setActiveSubItem}/>
                ))}
                { isLoggedIn() && <li className='my-3'><AddForm handleSubmit={addItem}/></li> }
            </ul>

        </div>
    )
}

export default SearchTree