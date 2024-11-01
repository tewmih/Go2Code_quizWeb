import React, { useState, useEffect } from "react";
import Card from "../../components/Card/card";
import CustomDialog from "../../Utility/DialogBox/DialogBox";
import './question.css';
import SideBar from "../../components/SideBar/SideBar";

function Question() {
  const [error, setError] = useState('');
  const [score, setScore] = useState(null);
  const [userAnswer, setUserAnswer] = useState([]);
  const [allInOne, setAllInOne] = useState([
    {
      "question": 'question not found?',
      "choices": ['choice not found'],
      "answer": 'no answer available',
    },
  ]);
  const [url, setUrl] = useState(`/home/tew/CodeZone/Go2CodeFullStack/Go2CodeBack/Data/General.json`);
  const [field, setField] = useState('General');
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    setUrl(`/home/tew/CodeZone/Go2CodeFullStack/Go2CodeBack/Data/${field}.json`);
  }, [field]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/Go2Code/quiz/questions/getQuestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: { field }, url }),
        });
        
        if (!response.ok) throw new Error('Failed to fetch data');
      
        const result = await response.json();
        setAllInOne(JSON.parse(result.data.fileContent));
      } catch (error) {
        setError('Server error');
        console.error(error);
      }
    };

    fetchData();
    setRemainingTime(10 * 60); // Reset the timer each time data is fetched
  }, [url]);

  // Countdown Timer Logic
  useEffect(() => {
    if (remainingTime <= 0) {
      evaluateAnswers();
      setMessage(`Your score: ${score !== null ? score + '/' + allInOne.length : 'Fill first'}`);
      setOpenDialog(true);
      setUserAnswer([]);
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, [remainingTime]);

  const evaluateAnswers = () => {
    let correctAnswers = 0;
    allInOne.forEach((question, index) => {
      if (userAnswer[index] === question.answer) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMessage('');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
  
    <React.Fragment>
      {error ? (
        <div className="error">
          <h3>Error found</h3>
        </div>
      ) : (
        <div className="questionContainer">
          <div className="field-instruction">
            <div className="instruction">
              <p>Good Luck with your test</p>
              <p>
                Remaining time:
                <span className="timer">{formatTime(remainingTime)}</span>
              </p>
              <button onClick={() => {
                evaluateAnswers();
                setMessage(`Your score: ${score !== null ? score + '/' + allInOne.length : 'Fill first'}`);
                setOpenDialog(true);
                setUserAnswer([]);
              }}>
                Submit
              </button>
            </div>
            <div className="fieldsContainer">
              <h3>Choose a test</h3>
              <select
                name="fields"
                id="fields"
                value={field}
                onChange={(e) => setField(e.target.value)}
              >
                <option value="History">History</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
        
          <Card questions={allInOne} setUserAnswer={setUserAnswer} />
          <button onClick={() => {
            evaluateAnswers();
            setMessage(`Your score: ${score !== null ? score + '/' + allInOne.length : 'Fill first'}`);
            setOpenDialog(true);
            setUserAnswer([]);
          }}>
            Submit
          </button>
          <CustomDialog open={openDialog} onClose={handleCloseDialog} message={message} />
        </div>
      )}
    </React.Fragment>
  );
}

export default Question;
