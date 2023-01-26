import { React, useEffect, useState } from "react";

const UseKeyPress = (target) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const downhandler = ({ key }) => {
    if (key === target) {
      setKeyPressed(true);
    }
  };
  const uphandler = ({ key }) => {
    if (key === target) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downhandler);
    window.addEventListener("keyup", uphandler);
    return () => {
      window.removeEventListener("keydown", downhandler);
      window.removeEventListener("keyup", uphandler);
    };
  }, []);

  return keyPressed;
};

export default UseKeyPress;
