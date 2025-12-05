import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 font-display">
      <div className="flex w-full max-w-md flex-col items-center gap-8 rounded-xl bg-white dark:bg-gray-900/50 p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="material-symbols-outlined text-5xl text-primary">school</span>
          <p className="text-2xl font-bold text-[#111318] dark:text-white">University Login</p>
          <p className="text-base text-[#616f89] dark:text-gray-400">Online Examination System</p>
        </div>
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <label className="flex flex-col w-full">
            <p className="pb-2 text-sm font-medium text-[#111318] dark:text-gray-300">Student ID / Email</p>
            <div className="relative flex w-full items-center">
              <span className="material-symbols-outlined absolute left-3 text-lg text-gray-400">person</span>
              <input 
                className="h-12 w-full flex-1 rounded-lg border border-[#dbdfe6] bg-white p-[15px] pl-10 text-base text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500" 
                placeholder="Enter your student ID or email"
                defaultValue="alex.doe@university.edu"
                required
              />
            </div>
          </label>
          <label className="flex flex-col w-full">
            <p className="pb-2 text-sm font-medium text-[#111318] dark:text-gray-300">Password</p>
            <div className="relative flex w-full items-center">
              <span className="material-symbols-outlined absolute left-3 text-lg text-gray-400">lock</span>
              <input 
                className="h-12 w-full flex-1 rounded-lg border border-[#dbdfe6] bg-white p-[15px] pl-10 text-base text-[#111318] placeholder:text-[#616f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500" 
                placeholder="Enter your password" 
                type="password" 
                defaultValue="password123"
                required
              />
              <div className="absolute right-0 flex h-full items-center justify-center pr-3">
                <span className="material-symbols-outlined cursor-pointer text-lg text-[#616f89] dark:text-gray-400">visibility</span>
              </div>
            </div>
          </label>
          <div className="flex w-full justify-end">
            <a href="#" className="cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline">Forgot Password?</a>
          </div>
          <div className="w-full mt-2">
            <button 
              type="submit"
              disabled={loading}
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-base font-bold text-white transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-4 flex gap-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <a href="#" className="hover:underline">Help Center</a>
        <span>•</span>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <span>•</span>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>
    </div>
  );
};

export default Login;
