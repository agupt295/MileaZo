import React, { useState } from 'react';

const TimerPicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Handle input changes
  const handleHoursChange = (event) => {
    setHours(parseInt(event.target.value));
  };

  const handleMinutesChange = (event) => {
    setMinutes(parseInt(event.target.value));
  };

  const handleSecondsChange = (event) => {
    setSeconds(parseInt(event.target.value));
  };

  // Format time as HH:mm:ss
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div>
      <h4>Estimated Service Time</h4>
      <div>
        <label>
          Hours:
          <input type="number" value={hours} onChange={handleHoursChange} />
        </label>
        <label>
          Minutes:
          <input type="number" value={minutes} onChange={handleMinutesChange} />
        </label>
        <label>
          Seconds:
          <input type="number" value={seconds} onChange={handleSecondsChange} />
        </label>
      </div>
      <p>Selected Time: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</p>
    </div>
  );
};

export default TimerPicker;