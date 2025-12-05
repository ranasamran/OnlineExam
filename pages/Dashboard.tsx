import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER, MOCK_EXAM } from '../constants';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full font-display bg-background-light dark:bg-background-dark">
      {/* SideNavBar */}
      <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-0">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center px-2 py-2">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                style={{ backgroundImage: `url("${CURRENT_USER.avatar}")` }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-gray-900 dark:text-white text-base font-medium leading-normal">{CURRENT_USER.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-normal leading-normal">{CURRENT_USER.email}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <NavItem icon="dashboard" label="Dashboard" active />
              <NavItem icon="history" label="Past Exams" />
              <NavItem icon="grade" label="Grades" />
              <NavItem icon="person" label="Profile" />
            </nav>
          </div>
          <div className="flex flex-col gap-1">
            <NavItem icon="logout" label="Logout" onClick={() => navigate('/login')} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left/Main Column */}
          <div className="w-full xl:w-2/3 flex flex-col gap-6">
            <header>
              <div className="flex flex-wrap gap-2 mb-2">
                <a href="#" className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary">Home</a>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/</span>
                <span className="text-gray-800 dark:text-white text-sm font-medium">Dashboard</span>
              </div>
              <div className="flex flex-wrap justify-between gap-3 items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">Available Examinations</p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal">Welcome back, {CURRENT_USER.name.split(' ')[0]}!</p>
                </div>
                <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                </button>
              </div>
            </header>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <label className="flex flex-col h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div className="text-gray-500 dark:text-gray-400 flex border border-r-0 border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="flex w-full min-w-0 flex-1 rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-l-0 border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark h-full placeholder:text-gray-500 px-4 pl-2 text-base" placeholder="Search for an exam by name..." />
                  </div>
                </label>
              </div>
              <div className="flex gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-lg self-start sm:self-auto">
                <FilterButton label="All" active />
                <FilterButton label="Upcoming" />
                <FilterButton label="Live" />
              </div>
            </div>

            {/* Exam List */}
            <div className="flex flex-col gap-4">
              {/* Exam Card 1: Live Now */}
              <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{MOCK_EXAM.courseCode}: {MOCK_EXAM.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-300 animate-pulse">Live Now</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <InfoBadge icon="calendar_today" text={MOCK_EXAM.startDate || ''} />
                    <InfoBadge icon="schedule" text="10:00 AM" />
                    <InfoBadge icon="timer" text={`${MOCK_EXAM.durationMinutes} Minutes`} />
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/exam/${MOCK_EXAM.id}/instructions`)}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  Start Exam
                </button>
              </div>

              {/* Exam Card 2: Upcoming */}
              <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PHY205: Classical Mechanics - Final</h3>
                    <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">Upcoming</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <InfoBadge icon="calendar_today" text="28 July, 2024" />
                    <InfoBadge icon="schedule" text="2:00 PM" />
                    <InfoBadge icon="timer" text="120 Minutes" />
                  </div>
                </div>
                <button disabled className="w-full sm:w-auto bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-medium py-2.5 px-6 rounded-lg cursor-not-allowed">
                  Starts in 3 days
                </button>
              </div>

              {/* Exam Card 3: Locked */}
              <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-75 shadow-sm">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">MTH301: Advanced Calculus - Quiz 2</h3>
                    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">Locked</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <InfoBadge icon="calendar_today" text="1 August, 2024" />
                    <InfoBadge icon="schedule" text="11:30 AM" />
                    <InfoBadge icon="timer" text="45 Minutes" />
                  </div>
                </div>
                <button disabled className="w-full sm:w-auto bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-medium py-2.5 px-6 rounded-lg cursor-not-allowed">
                  Locked
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Announcements */}
          <aside className="w-full xl:w-1/3 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Important Announcements</h2>
              <div className="flex flex-col gap-5">
                <Announcement 
                  icon="campaign" 
                  colorClass="text-orange-600 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/50" 
                  title="Scheduled System Maintenance"
                  desc="Please be advised of a system-wide maintenance on July 25th, from 2 AM to 4 AM."
                  date="July 22, 2024"
                />
                <hr className="border-gray-100 dark:border-gray-700" />
                <Announcement 
                  icon="school" 
                  colorClass="text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50" 
                  title="Final Exam Proctoring Rules"
                  desc="Reminder: All final exams will be proctored. Please ensure your setup meets the requirements."
                  date="July 20, 2024"
                />
                <hr className="border-gray-100 dark:border-gray-700" />
                <Announcement 
                  icon="warning" 
                  colorClass="text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50" 
                  title="Action Required: Update Profile"
                  desc="Some student profiles are missing key information. Please update your profile before the exam period begins."
                  date="July 18, 2024"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <a 
    href="#" 
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
  >
    <span className={`material-symbols-outlined ${active ? 'fill' : ''}`}>{icon}</span>
    <p className="text-sm font-medium leading-normal">{label}</p>
  </a>
);

const InfoBadge: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-1.5">
    <span className="material-symbols-outlined text-base">{icon}</span>
    <span>{text}</span>
  </div>
);

const FilterButton: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <button className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 transition-all ${active ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'}`}>
    <p className="text-sm font-medium leading-normal">{label}</p>
  </button>
);

const Announcement: React.FC<{ icon: string; colorClass: string; title: string; desc: string; date: string }> = ({ icon, colorClass, title, desc, date }) => (
  <div className="flex gap-4">
    <div className={`flex-shrink-0 rounded-full size-10 flex items-center justify-center ${colorClass}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{desc}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{date}</p>
    </div>
  </div>
);

export default Dashboard;
