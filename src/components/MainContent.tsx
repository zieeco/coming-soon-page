// MainContent.tsx
'use client';

import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import axios from 'axios';

const MainContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [initialTargetDate, setInitialTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const response = await axios.get('/api/countdownEndTime');
        const newTargetDate = new Date(response.data.targetDate);
        setInitialTargetDate(newTargetDate);
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
    <div className="w-full flex flex-col h-screen text-center p-8 bbb justify-center items-center">
      <div className="one w-full flex-col mborder items-center mx-auto  md:max-w-2xl">
        <div className="countdown-container mb-12">
          <h1 className="all-font font-bold uppercase md:text-3xl">This website is under construction!</h1>
          {/* <h4 className="all-font uppercase">We will be live in:</h4> */}
        </div>

        {isSubscribed ? (
          <p className="text-green-500">You are subscribed! Thank you.</p>
        ) : (
          <form className="form-container" onSubmit={handleSubscribe}>
            {/* <p className="all-font uppercase">Enter your email address to receive updates</p> */}
            <p className="flex flex-col justify-center items-center sm:flex-row gap-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border br border-gray-300 p-2 w-full"
                placeholder="EMAIL ADDRESS"
              />
              <button type="submit"
                className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 br
                mx-auto sm:mx-0"
                disabled={isSubscribed}>
                Subscribe
              </button>
            </p>
          </form>
        )}

        {initialTargetDate ? (
          <CountdownTimer initialTargetDate={initialTargetDate} />
        ) : (
        <p className="w-12 h-12 my-5 rounded-full animate-spin mx-auto border-4 border-solid border-gray-500 border-t-transparent"></p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
