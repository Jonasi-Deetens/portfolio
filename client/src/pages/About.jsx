import React from 'react'
import developer2 from '../assets/developer2.svg'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <main className='py-20 w-9/12 m-auto' >
        <section>
            <h2>Hello and welcome to my coding portfolio!</h2>
            <p>I'm Jonasi Deetens, a passionate software developer dedicated to crafting innovative solutions through code. With a blend of creativity and technical expertise, I thrive on turning ideas into functional, user-friendly applications. Whether it's developing web applications, building mobile apps, or diving into the realm of machine learning, I'm constantly exploring new technologies and pushing the boundaries of what's possible in the digital world.</p>
            <p>In this portfolio, you'll find a showcase of some of my most notable projects, each demonstrating my skills in software development, problem-solving, and attention to detail. Whether it's a sleek web interface, a robust backend system, or an elegant algorithm, I take pride in delivering solutions that not only meet but exceed expectations.</p>
            <p>Thank you for taking the time to explore my portfolio. I'm excited to share my journey with you and discuss how we can collaborate to bring your ideas to life through code. Feel free to reach out—I'm always eager to connect with fellow developers, entrepreneurs, and tech enthusiasts alike.</p>
            <br />
            <p>Happy coding!</p>
            <p>- Jonasi Deetens</p>
        </section>
        <img className='m-auto' width={200} src={developer2} alt={"cartoon image of a person standing up with a lightbulb"} />
        <section>
            <h2>Background</h2>
            <p>I pursued a degree in Computer Science from Howest Brugge, where I gained a solid foundation in algorithms, data structures, and software engineering principles. During my time at school, I immersed myself in various programming languages and frameworks, honing my skills through hands-on projects and internships.</p>
            <p>Sadly enough during one of my internship I had a bad experience, where I lost my interest in coding and development alike because of bad mentorship and business mentality. Which set me back a few years where I spend my time working on a beachbar.</p>
            <p>As I progressed in that career, I took on roles of increasing responsibility, but I still felt the need for tackling complex challenges and embracing emerging technologies. From building scalable web applications with React and Node.js to delving into the intricacies of machine learning with Python and TensorFlow, I kept comming back to try and learn new technical languages.</p>
            <p>Because of that lingering intereset, I finally decided to throw my career in a new way and follow a training at BeCode Gent. Where my interest grew even larger. From learning front end development to learning backend development. Now looking for a job or internship where I can further learn and develop these skills.</p>
            <p>Outside of my professional endeavors, I'm an avid gamer, and since last year, I also grown a passion for climbing. I believe that the best way to grow as a coder is to surround oneself with a supportive community of peers who inspire and challenge each other to reach new heights (literally when climbing).</p>
            <p>Today, I stand as a junior developer with a diverse skill set and a passion for innovation. I'm excited to continue my journey, exploring new technologies, solving complex problems, and making a meaningful impact through code.</p>
        </section>
        <section>
            <h2>Skills & Expertise</h2>
            <p className='text-center'>To see everything I've learned, you can click on the following link, to go to the courses page. There I have listed everything I've seen so far with some example codes.</p>
            <Link className='flex justify-center' to="/Courses"><button className='my-10'>Courses</button></Link>
            <p className='text-center'>You can check on some of my latest projects on my project page as well.</p>
            <Link className='flex justify-center' to="/Projects"><button className='my-10'>Projects</button></Link>
        </section>
        <section className='mb-10'>
            <h2>Socials</h2>
            <p className='text-center'>Github:<Link className='link' to="https://github.com/Jonasi-Deetens/">Jonasi-Deetens</Link></p>
            <p className='text-center'>LinkedIn:<Link className='link' to="https://www.linkedin.com/in/jonasi-deetens-41bba4a8/">@JonasiDeetens</Link></p>
        </section>
    </main>
  )
}

export default About