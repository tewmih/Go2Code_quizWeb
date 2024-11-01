import React, { useEffect } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserAvatar from '../../Utility/Avator/AvatorFile';
import SideBar from '../../components/SideBar/SideBar';
function Dashboard() {
    const isAdmin = true; // This will be changed based on the user status later
    let token=''
    token=localStorage.getItem('token');



    return (
        <div className="allDashboardContainer">
          
        <SideBar />
        <div className="dashboardContainer">
            <header className="dashboardHeader">
                <h2>All Types of Questions Are Here</h2>
           
            </header>
            <main className="dashboardMain">
                <section className="upper">
                    <p>
                    Welcome to Go2Code Quiz Dashboard!

Get ready to challenge yourself and enhance your knowledge acro
ss various subjects! Our quiz app provides a platform for learni
ng and testing your skills in a fun and engaging way. With quizz
es available in Math, History, General Knowledge, and Science, y
ou can customize your learning experience to suit your preferen
ces.
                    </p>
                </section>
                <section className="minor">
                    <p>
                    Start Your Quiz Journey Today!

Whether you're looking to prepare for an exam, refresh yo
ur memory on a specific topic, or simply have fun, our quizz
es are designed to cater to your needs. Track your progress, 
review your answers, and earn badges as you master each subject.

In this digital age, learning should be interactive and enjoya
ble. Our quiz app not only allows you to test your knowledge but
 also offers detailed feedback on your performance. Dive into qu
 izzes across math equations, historical events, scientific conc
 epts, and general trivia. Join our community of learners who ar
 e passionate about expanding their horizons. Ready to get start
 ed? Click on "Take a Quiz" to begin your journey!
                    </p>
                </section>
            </main>
            <footer className="buttons">
                <Link to='/showQuestions'>
                    <input type="button" value='Get Started' />
                </Link>
                {isAdmin && (
                    <Link to='/addQuestions'>
                        <input type="button" value='Post Questions' />
                    </Link>
                )}
            </footer>
        </div>
        </div>
    );
}

export default Dashboard;
