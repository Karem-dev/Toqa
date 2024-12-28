import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Meeting() {
  const [roomName, setRoomName] = useState('');
  const [username, setusername] = useState('');
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setusername(user.first_name + ' ' + user.last_name);
    } else {
      setusername("Toqa academy");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  const handleMeetingStart = () => {
    const newRoomName = 'Room-' + username + '-' + Date.now();
    console.log('Starting meeting with room name:', newRoomName);
    setRoomName(newRoomName);
    setIsMeetingStarted(true);
  };

  const handleEndMeeting = () => {
    setRoomName('');
    setIsMeetingStarted(false);
  };

  return (
    <div className="mt-52 text-white text-center font-extrabold">
      <h1>Meeting Dashboard</h1>
      {!isMeetingStarted ? (
        <button 
          onClick={handleMeetingStart}
          className="bg-blue-500 text-white p-3 rounded-lg mt-4"
        >
          Start Meeting
        </button>
      ) : (
        <>
          <h3 className="mt-4">Meeting Room: {roomName}</h3>
          <iframe
            id="meetingIframe"
            src={`https://meet.jit.si/${roomName}`}
            allow="camera; microphone"
            className="w-full h-screen rounded-md fixed top-0 left-0 z-[99999]"
          />
          <button 
            onClick={handleEndMeeting}
            className="bg-red-500 text-white p-3 rounded-lg mt-4 fixed bottom-10 right-0 z-[999999]"
          >
            End Meeting
          </button>
        </>
      )}
    </div>
  );
}

export default Meeting;
