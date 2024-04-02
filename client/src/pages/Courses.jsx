import React, { useEffect, useState } from 'react'
import SearchTree from '../components/SearchTree'
import TabContainer from '../components/TabContainer';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");
    const [searchedSubItem, setSearchedSubItem] = useState("");
    const [showAside, setShowAside] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/courses', {
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

        let ws;
        const connectWebSocket = () => {
            ws = new WebSocket("wss://portfolioserver-vjpfi8hb.b4a.run/ws");
            ws.onopen = () => {
                console.log("WebSocket connected");
            };
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.event === "update") {
                console.log("message received");
                fetchCourses();
                }
            };
            ws.onclose = () => {
                console.log("WebSocket disconnected. Reconnecting...");
                connectWebSocket(); 
            };
        };

        fetchCourses();
        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [])

    const addCourse = async (newTitle) => {
        try {
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/api/courses', {
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

    const showMenu = () => {
        setShowAside(!showAside);
    }
    
    return (
        <div className='flex'>
            <aside className='w-auto min-h-svh relative'>
                <div className={`${showAside ? "block" : "hidden"} h-full`}>
                    <SearchTree searchItems={courses} addItem={addCourse} setSearchedItem={setSearchedItem} setSearchedSubItem={setSearchedSubItem}/>
                </div>
                <p onClick={showMenu} className="bg-secondaryDark p-2 lg:p-5 rounded-r-md absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-12 hover:shadow-md hover:bg-primary hover:text-secondaryDark hover:cursor-pointer">{showAside ? "<" : ">"}</p>
            </aside>
            <main className='h-svh w-full overflow-auto pt-20 pb-36'>
                <section>
                    <h2 className='pb-5'>{searchedItem.title}</h2>
                    <h3 className='text-center mb-10'>{searchedSubItem.title}</h3>
                    {searchedSubItem && 
                        <TabContainer category={searchedSubItem} language={searchedItem.language} />
                    }
                </section>
            </main>
        </div>
    )
}

export default Courses