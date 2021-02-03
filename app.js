function Button({isDisable, handleClick, label}) {
    return <button onClick={handleClick} disabled={isDisable}>{label}</button>
}

function Stopwatch({initial = 0, interval = 0}) {
    const initialMins = Math.floor(initial/60);
    const initialSecs = initial >=60 ? (initial - 60) : initial;
  // setup states
  const [minute, setMinute] = React.useState(initialMins); // minute, depends on the intial seconds
  const [sec, setSec] = React.useState(initialSecs); // seconds, depends on the intial seconds
  const [time, setTime] = React.useState(initial * 1000); // Timer, depends on the intial seconds passed, initially zero
  const [isRunning, setIsRunning] = React.useState(false); //Set status of stopwatch

    React.useEffect(() => {
        let interval;

        if (isRunning) {
            //on Start create an interval of 10 milisecond
            const start = new Date(new Date() - time);
            interval = setInterval(() => {
                const diff = (new Date() - start);
                console.log(start, diff);
                const minute = Math.floor((diff/1000/60) % 60);
                const sec = Math.floor((diff/1000) % 60);

                setMinute(minute < 10 ? `0${minute}` : minute);
                setSec(sec < 10 ? `0${sec}` : sec);
                setTime(diff);
            }, 1000);
        } else {
            //Clear interval on each stop 
            clearInterval(interval);
        }

        //Clear interval while unmounting
        return () => clearInterval(interval);
    },[isRunning]);

    //Toggle stopwatch state on start / stop 
  function toggleStartPause() {
      setIsRunning(!isRunning);
      setMinute(initialMins);
      setSec(initialSecs);
      setTime(initial * 1000);
  }

  function reset() {
      setIsRunning(false);
      setTime(0);
      setMinute(0);
      setSec(0);
  }

  return (
    <div className='stop-watch'>
        <div className="timer-dial">
            <h3 className="timer-text">
                <span>{minute || '00'}:</span>
                <span>{sec || '00'}</span>
            </h3>
        </div>
        <div className="button-container">
            <Button handleClick={toggleStartPause} label={isRunning ? 'pause' : 'start'}/>
            <Button handleClick={reset} label={'stop'}/>
        </div>
    </div>
  );
}

function WrapperComponent() {
    return (
        <div className="container">
            <Stopwatch initial="12" interval="2"/>
            <Stopwatch  initial="75" interval="5"/>
            <Stopwatch  initial="9" interval="10" />
        </div>
    )
}

ReactDOM.render(
    <WrapperComponent />,
    document.getElementById('root')
);