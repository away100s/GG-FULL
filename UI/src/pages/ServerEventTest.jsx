import { useEffect, useState } from 'react';

function ServerEventTest() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onmessage = (event) => {
      const newEvent = event.data;
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    eventSource.onerror = (error) => {
      if (eventSource.readyState === EventSource.CLOSED) {
        console.log('SSE connection closed');
      } else {
        console.error('SSE Error:', error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events (SSE) Example</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServerEventTest;
