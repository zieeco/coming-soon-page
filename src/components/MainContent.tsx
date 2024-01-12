// MainContent.tsx
'use client';

import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '@/utils/constants';

const MainContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [initialTargetDate, setInitialTargetDate] = useState<Date | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/countdownEndTime`);
        const newTargetDate = new Date(response.data.targetDate);
        setInitialTargetDate(newTargetDate);
      } catch (error) {
        setFetchError('Error fetching target date. Please, try again!');
        throw error;
      }
    };

    fetchTargetDate();
  }, []);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_API_URL}/api/subscribe`, { email });
      if (response.status === 200) {
        setIsSubscribed(true);
        setInfoMessage('Subscription successful!');

        setTimeout(() => {
          setIsSubscribed(false);
          setInfoMessage(null);
          setEmail('');
        }, 4000);

      } else {
        setIsSubscribed(false);
        setInfoMessage('Subscription failed');

        setTimeout(() => {
          setInfoMessage(null);
        }, 4000);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setInfoMessage(error.response?.data?.error);

        setTimeout(() => {
          setInfoMessage(null);
          setEmail('');
        }, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen text-center p-8 bbb justify-center items-center">
      <div className="one w-full flex-col mborder items-center mx-auto  md:max-w-2xl">
        <div className="countdown-container mb-12">
          <h1 className="all-font font-bold uppercase text-[rgb(232,232,232)] md:text-3xl italic">...We&rsquo;re coming soon!</h1>
          {/* <h4 className="all-font uppercase">We will be live in:</h4> */}
        </div>

        {fetchError && <p className="text-red-500">{fetchError}</p>}


        <form className="form-container" onSubmit={handleSubscribe}>
          {infoMessage ? (
            <p className={`text ${isSubscribed ? 'text-green-500' : 'text-red-500'}`}>{infoMessage}</p>
          ) : (
            <p className="all-font text-white">Enter your email address to receive updates</p>
          )}
          <p className="flex flex-col justify-center items-center sm:flex-row gap-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border br border-gray-300 p-2 w-full bg-[rgb(232,232,232)]"
              placeholder="EMAIL ADDRESS"
            />
            <button type="submit"
              className="bg-[rgb(68,48,157)] text-white px-4 py-2 hover:bg-[rgb(50,41,124)] br
                mx-auto sm:mx-0"
              disabled={isSubscribed || isLoading}>
              {isLoading ? (
                <div className="flex gap-x-1">
                  Subscribing
                  <div className="w-5 h-5 rounded-full animate-spin
                    border-4 border-solid border-white-500 border-t-transparent"></div>
                </div>
              ) : (
                'Subscribe'
              )}
            </button>
          </p>
        </form>


        {initialTargetDate ? (
          <CountdownTimer initialTargetDate={initialTargetDate} />
        ) : (
          <p className="w-12 h-12 my-5 rounded-full animate-spin mx-auto border-4 border-solid border-white border-t-transparent"></p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
