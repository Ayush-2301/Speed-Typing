import React, { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
const num_of_words = 200;
const Seconds = 60;
const Hero = () => {
  const [wordDisplay, setWordDisplay] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState("");
  const [charArray, setCharArray] = useState("");
  const [correctedWord, setCorrectedWord] = useState([]);
  const [correctedChar, setCorrectedChar] = useState([]);
  const [countDown, setCountDown] = useState(Seconds);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  const [incorrectWordCount, setincorrectWordCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [startCounter, setStartCounter] = useState(0);
  const textFocus = useRef(null);
  useEffect(() => {
    setWordDisplay(display());
  }, []);
  useEffect(() => {
    if (status === true) {
      textFocus.current.focus();
    }
  }, [status]);
  useEffect(() => {
    setWordDisplay(display());
  }, [startCounter > 1]);
  function display() {
    return new Array(num_of_words).fill(null).map(() => randomWords());
  }
  function inputData({ keyCode, key }) {
    if (keyCode === 32) {
      setCurrentChar("");
      setCorrectedWord((data) => {
        const newResult = [...data];
        newResult[wordIndex] = check();
        return newResult;
      });
      setUserInput("");
      setWordIndex(wordIndex + 1);
      setCharIndex(0);
      setCharArray([]);
      setCorrectedChar([]);
    } else if (keyCode === 8) {
      setCorrectedChar((prevCorrectedChar) => {
        const newResult = [...prevCorrectedChar];
        newResult.pop();
        return newResult;
      });
      setCharIndex(charIndex - 1);
      setCurrentChar("");
    } else {
      setCurrentChar(key);
      // console.log(currentChar);
      setCharArray((prevCharArray) => {
        const text = wordDisplay[wordIndex];
        prevCharArray = text[charIndex];
        return prevCharArray;
      });
      // console.log(charArray);
      setCorrectedChar((data) => {
        const newResult = [...data];
        newResult[charIndex] = charArray == currentChar;
        return newResult;
      });
      if (charArray != currentChar) console.log(key);
      setCharIndex(charIndex + 1);
    }
  }

  function check() {
    const wordToCompare = wordDisplay[wordIndex];
    const result = wordToCompare === userInput.trim();
    console.log(result);
    if (result === true) {
      setCorrectWordCount(correctWordCount + 1);
    } else {
      setincorrectWordCount(incorrectWordCount + 1);
    }
    return result;
  }
  function hightlight(index, idx) {
    if (index === wordIndex && idx === charIndex) {
      return "underline";
    } else {
      return "";
    }
  }
  function correctedWordArray(value) {
    if (value === true) return "bg-green-300";
    else if (value === false) return "bg-red-300";
    else return "";
  }
  function startTimer() {
    if (status === false) {
      setCharIndex(0);
      setWordIndex(0);
      setCorrectWordCount(0);
      setincorrectWordCount(0);
      setCorrectedChar([]);
      setCorrectedWord([]);
      setCharArray("");
      setCurrentChar("");
    }
    if (status !== true) {
      setStartCounter(startCounter + 1);
      setStatus(true);
      const inteval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(inteval);
            setStatus(false);
            setUserInput("");
            // setWordDisplay(display());
            return Seconds;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }
  return (
    <div>
      <>
        countdown :
        {countDown && <div className="font-bold text-xl">{countDown}</div>}
      </>
      <h1 className="text-3xl font-extrabold">Typing Test Demo</h1>
      {status && <h1>Start Typing</h1>}
      <div>
        {wordDisplay.map((word, index) => {
          return (
            <span key={index}>
              {word.split("").map((char, idx) => {
                if (correctedChar[idx] === true && wordIndex === index) {
                  return (
                    <span
                      className={`
                    ${hightlight(
                      index,
                      idx,
                      char
                    )} text-green-300 ${correctedWordArray(
                        correctedWord[index]
                      )}`}
                      key={idx}
                    >
                      {char}
                    </span>
                  );
                } else if (
                  correctedChar[idx] === false &&
                  wordIndex === index
                ) {
                  return (
                    <span
                      className={`
                    ${hightlight(
                      index,
                      idx,
                      char
                    )} text-red-300 ${correctedWordArray(
                        correctedWord[index]
                      )}`}
                      key={idx}
                    >
                      {char}
                    </span>
                  );
                } else {
                  return (
                    <span
                      className={`
                    ${hightlight(
                      index,
                      idx,
                      char
                    )} text-black ${correctedWordArray(correctedWord[index])}`}
                      key={idx}
                    >
                      {char}
                    </span>
                  );
                }
              })}
              <span> </span>
            </span>
          );
        })}
      </div>
      <p className="text-xl font-bold mt-5">Type:</p>
      <input
        ref={textFocus}
        disabled={status === false}
        className=" border"
        type="text"
        onKeyDown={inputData}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <>
        <div>
          <button
            className="border bg-gray-200 p-1 px-4 rounded"
            onClick={startTimer}
          >
            Start
          </button>
        </div>
      </>
      <>
        <div>
          Words per minute: <span>{correctWordCount} </span>WPM
        </div>
        <div>
          Accuracy:{" "}
          <span>
            {Math.round(
              (correctWordCount / (correctWordCount + incorrectWordCount)) * 100
            )}{" "}
          </span>
          %
        </div>
      </>
    </div>
  );
};

export default Hero;
