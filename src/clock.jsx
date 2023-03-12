import React from 'react'
import { useState, useEffect } from 'react'
import soundFile from './assets/sound.mp3'

function Clock() {
  const [mins, setMins] = useState(29);
  const [secs, setSecs] = useState(59);
  const [isRunning, setIsRunning] = useState(false)
  
  useEffect(() => {
    let intervalId;
    if (isRunning && secs > 0) {
      intervalId = setInterval(() => {
        setSecs(secs => secs - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, secs]);

  function start(){
    setIsRunning(true);
    setSecs(59);
  }

  function stop(){
    setIsRunning(false);
    setSecs(0);
    setMins(30)
  }

  useEffect(()=>{
    let intervalId;
    if (isRunning && secs === 0){
      setMins(mins => mins - 1);
      setSecs(59)
    } return ()=>clearInterval(intervalId)
  }, [isRunning, secs, mins])

  useEffect(()=>{
    if (isRunning && mins === -1){
      stop()
      const audio = new Audio(soundFile);
      audio.play();
    }
  })

  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }

  const formattedMins = formatTime(mins);
  const formattedSecs = formatTime(secs);

  return (
    <div className='clock'>
      <div className='time'>
        <div> 00 </div>
        <div>{formattedMins}</div>
        <div>{formattedSecs}</div>
      </div>
      <div className='buttons'>
        <button className='b1' onClick={start}>Start</button>
        <button className='b2' onClick={stop}>Stop</button>
      </div>
    </div>
  )
}

export default Clock