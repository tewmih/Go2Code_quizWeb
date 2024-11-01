import React,{useEffect, useState} from 'react';

import './addQuestion.css'
import SideBar from '../../components/SideBar/SideBar';
 function addQuestions(){
    const[catagory,setCatagory]=useState('');
    const[url,setUrl]=useState('');
    const [data,setData]=useState('');
    
    // function isArray(str) {
    //     const parsed = JSON.parse(str);
    //     console.log('type',typeof parsed)
    //     try {
    //           return Array.isArray(parsed) && parsed.every(item=>typeof item=='object' && item!=null)
    //         } catch (error) {
    //           return false;
    //         }
    //       }
          
    
    useEffect(()=>{
        setUrl(`/home/tew/CodeZone/Go2CodeFullStack/Go2CodeBack/Data/${catagory}.json`)

    },[catagory])
    async function submitHandler(e){
        e.preventDefault()
    
        if(!url|| !catagory || !data){
            alert('Please fill all fields');
            return;
        }
        // if(!isArray(data)){
        //     alert('Invalid JSON data..only objects are supported');
        //     return;
        // }
        try{
            const response=await fetch('http://localhost:3005/Go2Code/quiz/questions/postQuestions',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    catagory,
                    url,
                    data
                }),
            });
            console.log('resonse',response);
        
            if(!response.ok){
                throw new Error('error while creating');
            }
            const result=await response.json();
            if(result.status==='success'){
                alert('Questions added successfully');
                // setData('');
                // setUrl('');
                // setCatagory('');
            }else{
                alert('Failed to add questions');
            }
        }catch(error){
            console.error(error);
            alert('Failed to add questions catched');
        }

        
    }

    return(
        <div className="allDashboardContainer">
            <SideBar />
        <div className="addQuestionContainer">
            <h2>Add relevant and non-ambiguous questions</h2>
            <form onSubmit={submitHandler}>
                <div className="catagory">
                    <label htmlFor="catagory">Catagory: </label>
                    <select name="catagory" id="catagory"  value={catagory} onChange={(e)=>{
                        setCatagory(e.target.value);
                        
                    }}>
                        <option value="">Select Catagory</option>
                        <option value="General" >General</option>
                        <option value="Science" >Science</option>
                        <option value="History" >History</option>
                        <option value="Maths" >Maths</option>
                    </select>
                </div>
                <div className="data">
                    <label htmlFor="data">Data: </label>
                    <textarea name="data" id="data" cols="40" rows="5" value={data} onChange={(e)=>{
                        setData(e.target.value);
                    }}></textarea>
                </div>

                <div className="submit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
        </div>
    )
 }

 export default addQuestions;


 

