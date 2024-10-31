import React from 'react'


import './dashboard.css'
import { Link } from 'react-router-dom';

function dashboard(){
    const isAdmin=true;//i will change this based on the user status later
    return(
        <div className="dashboardContainer">
            <header className="dashboardHeader">
                <h2>All types of questions are here</h2>
            </header>
            <main className="dashboardMain">
                 <p className="upper">
                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate ad eos nam minus, 
                commodi suscipit nobis consectetur aliquid beatae molestiae. Enim voluptatibus id 
                 </p>
                 <p className="minor">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem sapiente 
                    quaerat animi dolor perspiciatis consectetur quasi? Ab perspiciatis harum
                     voluptatibus aliquid deleniti est soluta corporis officia minus, aut fugiat 
                     iste autem numquam fugit alias dolore? Itaque inventore ipsam ut quos id vero
                      libero assumenda? Qui accusantium impedit accusamus aliquam vel hic numquam 
                      fuga nesciunt repudiandae deleniti aut itaque reiciendis, nulla sequi ducimus
                       est facere eligendi adipisci, exercitationem eos consectetur enim quam. Officiis
                        ab reprehenderit blanditiis recusandae cumque, nesciunt nulla repellat quisquam, 
                        quaerat odio natus ducimus. Similique sint molestias consectetur tempore. Quibusdam cupidi
                    tate unde ducimus, doloremque esse ullam voluptate dolor laudantium!
                 </p>
            </main>
            <footer className="buttons">
               <Link to='/showQuestions'> <input type="butoon" value='Get started'onClick={()=>{

                }} /></Link>
                {
                   isAdmin&& <Link to='/addQuestions'><input type="button" value='Post questions' /></Link>

                }
            </footer>
        </div>
    )
}
export default dashboard;