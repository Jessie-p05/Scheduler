import  { useState } from "react";
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // a function to switch the mode to a new mode
  const transition = (newMode,replace = false) => {
    setMode(prev=>newMode);
    if(!replace){
      setHistory(prev=>[...prev,newMode]);
    }
  };
  // a function to move the mode backward 
  function back() { 
    if (history.length===1){
      setMode(prev=>history[history.length-1]);
      return; 
    };
    
    const currentHistory = history;
    currentHistory.splice(-1);
    setHistory(prev=>[...currentHistory]);
    setMode(prev=>history[history.length-1]);
   }
  return {mode,transition,back}
}
