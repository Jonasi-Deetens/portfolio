import React, { useState } from 'react'
import AddForm from './AddForm';
import { useEffect } from 'react';

const TabContainer = ({category}) => {
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        setActiveTab(category.subcategories[0]);
    }, [category])
    

    const changeActiveTab = (subcategory) => {
        if (activeTab.title === subcategory.title) {
            setActiveTab("");
        } else setActiveTab(subcategory);
    }

    const updateCategory = async (id) => {
        const currentSubcategories = category.subcategories;
        currentSubcategories.push(id);

        try {
            const response = await fetch('http://127.0.0.1:3050/api/categories/' + category._id, {
                method: "PATCH",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify({
                    subcategories: currentSubcategories
                })
            })
            if (response.ok) {
                console.log("Succesfully updated category")
            }
        } catch (error) {
            console.log(error.message);
        }
    } 

    const handleSubmit = async (newTitle) => {
        try {
            const response = await fetch('http://127.0.0.1:3050/api/subcategories', {
                method: "POST",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify({
                    title: newTitle
                })
            })
            if (response.ok) {
                const data = await response.json();
                updateCategory(data._id);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateCode = async (e) => {
        e.preventDefault();
        const newExample = e.target.elements.example.value;
        try {
            const response = await fetch('http://127.0.0.1:3050/api/subcategories/' + activeTab._id, {
                method: "PATCH",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify({
                    code: newExample
                })
            })
            if (!response.ok) {
                console.log("Failed to add text to subcategory")
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleCodeChange = (e) => {
        setActiveTab({ ...activeTab, code: e.target.value });
    };

    return (
        <section className='w-10/12 m-auto'>
            <section className='h-fit px-2 pt-2 bg-secondaryDark border border-secondaryDark border-b-0 rounded-t-md flex'>
                {category.subcategories.map((subcategory) => (
                    <div onClick={() => changeActiveTab(subcategory)} className={`w-fit border-r border-secondaryDark px-5 py-2 text-center rounded-t-xl hover:bg-primary hover:cursor-pointer flex items-center ${activeTab.title === subcategory.title ? "bg-primary" : "bg-ctaDark"}`}>
                        <p>{subcategory.title}</p>
                    </div>
                ))}
                <div className='w-fit h-full p-2 text-center rounded-t-xl bg-ctaDark flex items-center'>
                    <AddForm handleSubmit={handleSubmit}/>
                </div>
            </section>
            <section className='bg-secondaryDark border border-primary'>
                {activeTab && (
                    <form onSubmit={updateCode} className='w-full h-full flex justify-center'>
                    <textarea className='w-full min-h-96 p-5 m-auto' name="example" id="example" placeholder='Add example code here...' value={activeTab.code} onChange={handleCodeChange}></textarea>
                    <button type='submit'>Update Example</button>
                    </form>
                )}
            </section>
        </section>
    )
}

export default TabContainer