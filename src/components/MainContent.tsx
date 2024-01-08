'use client';

// MainContent.tsx
import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import axios from 'axios';

const MainContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const response = await axios.get('/api/countdownEndTime');
        setTargetDate(new Date(response.data.targetDate));
      } catch (error: any) {
        console.error('Error fetching target date:', error.message);
      }
    };

    fetchTargetDate();
  }, []);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/subscribe', { email });
      if (response.status === 200) {
        setIsSubscribed(true);
        alert('Subscription successful!');
      } else {
        setIsSubscribed(false);
        alert('Subscription failed');
      }
    } catch (error: any) {
      console.error('Error subscribing:', error.message);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="countdown-container">
        <h1 className="text-3xl font-bold mb-4">Coming Soon!</h1>
        {targetDate ? (
          <CountdownTimer targetDate={targetDate} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {isSubscribed ? (
        <p className="text-green-500">You are subscribed! Thank you.</p>
      ) : (
        <form className="" onSubmit={handleSubscribe}>
          <p className="">Enter your email address to receive updates</p>
          <p>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mb-4"
              placeholder="EMAIL ADDRESS"
            />
            <button type="submit" className="subscribe-btn" disabled={isSubscribed}>
              Subscribe
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default MainContent;
