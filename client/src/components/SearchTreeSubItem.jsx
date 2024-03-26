import React, { useEffect, useState } from 'react'

const SearchTreeSubItem = ({item, activeSubItem, setActiveSubItem}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (activeSubItem.title === item.title) setActive(true);
        else setActive(false);
    }, [activeSubItem])
    

    const changeActiveSubItem = (item) => {
        if (activeSubItem.title === item.title) {
            setActiveSubItem("");
        } else setActiveSubItem(item);
    }
    return (
        <li className={``}>
            <p onClick={() => {changeActiveSubItem(item)}} className={`my-3 text-lightColor hover:text-primary hover:cursor-pointer ${active ? "text-primary font-bold" : ""}`}>{item.title}</p>
        </li>
    )
}

export default SearchTreeSubItem