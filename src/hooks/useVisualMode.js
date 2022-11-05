import react, {useState} from "react";

//Switching between modes and keeping track with history (for the back function)
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  
  function transition(newMode, replace = false) {
    setMode(newMode);
    //if replace has a true value, replace the history array with itself, minus the last element, plus the new mode element
    if (replace) {
            setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
          //otherwise if replace is the default false value, replace the history array with itself plus the new mode
          } else {
            setHistory(prev => [...prev, newMode]);
          }
    
    
  }

  function back() {
    //history needs to have at least 2 elements to remove the last element
    if (history.length > 1) {
      //set history to the second last element (previous mode)
      setMode(history[history.length - 2]);
      //replace history array with itself minus the last element - removes the last element
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
      
      
      //just go back to the start if you've only moved one page forward - first given mode
      } else if (history.length === 1) {
        setMode(initialMode);
        setHistory([initialMode]);
      }
  };
 
  return { mode, transition, back };
}

