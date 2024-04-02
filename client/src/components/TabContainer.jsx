import React, { useContext, useState } from 'react'
import AddForm from './AddForm';
import { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConfirmationModal from './ConfirmationModal';
import { UserContext } from '../providers/UserProvider.jsx';

const TabContainer = ({category, language}) => {
    const [activeTab, setActiveTab] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const { isLoggedIn } = useContext(UserContext);

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
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/categories/' + category._id, {
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

    const askConfirmation = (id) => {
        setIdToDelete(id);
        setIsOpen(true);
    }

    const handleConfirm = () => {
        removeSubCategory(idToDelete)
        setIdToDelete(null);
        setIsOpen(false)
    }

    const removeSubCategory = async (id) => {
        try {
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/subcategories/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': "Application/json"
                }
            })
            if (response.ok) {
                console.log("Succesfully deleted subcategory")
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (newTitle) => {
        try {
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/subcategories', {
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
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/subcategories/' + activeTab._id, {
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

    if (isOpen) return <ConfirmationModal isOpen={isOpen} onCancel={() => setIsOpen(false)} onConfirm={handleConfirm}/>

    return (
        <section className='w-10/12 m-auto overflow-auto'>
            <section className='h-fit px-2 pt-2 bg-secondaryDark rounded-t-md flex flex-wrap'>
                {category.subcategories.map((subcategory) => (
                    <div onClick={() => changeActiveTab(subcategory)} className={`w-fit border-r border-secondaryDark px-5 py-2 text-center rounded-t-xl hover:cursor-pointer flex items-center ${( activeTab && activeTab.title === subcategory.title) ? "bg-primary" : "bg-ctaDark"}`}>
                        <p>{subcategory.title}{isLoggedIn() && <span className='text-lightColor hover:text-red-600 ml-5 font-bold text-xl' onClick={() => askConfirmation(subcategory._id)}>x</span>}</p>
                    </div>
                ))}
                {isLoggedIn() && 
                    <div className='w-fit h-full p-2 text-center rounded-t-xl bg-ctaDark flex items-center'>
                        <AddForm handleSubmit={handleSubmit}/>
                    </div>
                }
            </section>
            <section className='bg-secondaryDark border border-primary'>
                {activeTab && (
                    <section className='overflow-hidden'>
                        {isLoggedIn() && 
                            <form onSubmit={updateCode} className='w-full h-full flex justify-center'>
                                <textarea className='w-full min-h-96 p-5 m-auto' name="example" id="example" placeholder='Add example code here...' value={activeTab.code} onChange={handleCodeChange}></textarea>
                                <button type='submit'>Update Example</button>
                            </form>
                        }
                        <SyntaxHighlighter language={language} style={vscDarkPlus}>
                            {activeTab.code}
                        </SyntaxHighlighter>
                    </section>
                )}
            </section>
        </section>
    )
}

export default TabContainer