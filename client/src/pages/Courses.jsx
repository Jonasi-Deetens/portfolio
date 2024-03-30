import React, { useEffect, useState } from 'react'
import SearchTree from '../components/SearchTree'
import TabContainer from '../components/TabContainer';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");
    const [searchedSubItem, setSearchedSubItem] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3050/api/courses', {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json"
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchCourses();
    }, [])

    const addCourse = async (newTitle) => {
        try {
            const response = await fetch('http://127.0.0.1:3050/api/courses', {
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
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div className='flex'>
            <aside className='min-h-svh w-auto'>
                <SearchTree searchItems={courses} addItem={addCourse} setSearchedItem={setSearchedItem} setSearchedSubItem={setSearchedSubItem}/>
            </aside>
            <main className='w-full py-20'>
                <section>
                    <h2 className=''>{searchedItem.title}</h2>
                    <h3 className='text-center my-10'>{searchedSubItem.title}</h3>
                    {searchedSubItem && 
                        <TabContainer category={searchedSubItem} />
                    }
                </section>
            </main>
        </div>
    )
}

export default Courses