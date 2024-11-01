
import React from "react"
import './SideBar.css'
import { Link } from "react-router-dom";
import UserAvatar from "../../Utility/Avator/AvatorFile";
import { useSelector } from "react-redux";


function SideBar(){
    let isAdmin = true;
    let url=useSelector((state) => state.user.url)||JSON.parse(localStorage.getItem('user')).url;
    let name=useSelector((state) => state.user.name)||JSON.parse(localStorage.getItem('user')).name;
    return(
        <div className="left">
            <div className="upper">
                <UserAvatar url={url}/>
                <p>{name}</p>
                <h4>Welcome to Quiz App</h4>
            </div>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to='/showQuestions'>All Questions</Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link to='/addQuestions'>Add Questions</Link>
                        </li>
                    )}
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </ul>
            </div>
          </div>
        
    )
}

export default SideBar;