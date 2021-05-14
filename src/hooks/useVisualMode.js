import  { useState } from "react";
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode,replace = false) => {
    setMode(prev=>newMode);
    if(!replace){
      setHistory(prev=>[...prev,newMode]);
    }
  }
      
  function back() { 
    if (history.length===1){
      setMode(prev=>history[history.length-1]);
      return; 
    }
    // history.splice(-1);
    // setHistory(prev=>[...history);
    
    const currentHistory = history;
    currentHistory.splice(-1);
    setHistory(prev=>[...currentHistory]);
    setMode(prev=>history[history.length-1]);
   }
  return {mode,transition,back}
}
