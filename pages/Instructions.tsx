import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_EXAM } from '../constants';

const Instructions: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [agreed, setAgreed] = useState(false);

  // In a real app, use examId to fetch data. Using MOCK_EXAM here.
  const exam = MOCK_EXAM;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 md:px-10 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-4 text-gray-900 dark:text-white">
          <span className="material-symbols-outlined text-primary text-2xl">school</span>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{exam.title}</h2>
        </div>
        <button className="flex h-10 px-4 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
          Contact Support
        </button>
      </header>

      <main className="flex-1 flex justify-center py-8 px-4 sm:px-6">
        <div className="flex flex-col max-w-4xl w-full gap-6">
          <div className="flex flex-wrap justify-between gap-3">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight">Exam Instructions</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Total Time" value={`${exam.durationMinutes} Minutes`} />
            <StatCard label="Number of Questions" value={exam.totalQuestions.toString()} />
            <StatCard label="Total Marks" value={exam.totalMarks.toString()} />
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Before You Begin</h2>
            <div className="flex flex-col gap-4">
              <InstructionItem icon="wifi" text="Ensure you have a stable and reliable internet connection throughout the exam duration." />
              <InstructionItem icon="devices" text="Use a compatible browser (Chrome, Firefox, or Safari recommended). Mobile devices are not supported." />
              <InstructionItem icon="notifications_off" text="Close all other applications and browser tabs to avoid distractions." />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Academic Integrity Policy</h2>
            <InstructionItem icon="verified_user" text="This exam is subject to the university's academic integrity policy. Any form of cheating, plagiarism, or use of unauthorized materials is strictly prohibited." />
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border-t-4 border-primary mt-4">
            <div className="flex items-start gap-3 mb-6">
              <input 
                id="confirm-checkbox" 
                type="checkbox" 
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="confirm-checkbox" className="text-gray-700 dark:text-gray-300 text-base font-medium leading-relaxed select-none cursor-pointer">
                I have read and understood all the instructions and agree to abide by the academic integrity policy.
              </label>
            </div>
            <button 
              onClick={() => navigate(`/exam/${examId}/take`)}
              disabled={!agreed}
              className="w-full h-14 rounded-lg bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              Start Exam
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{label}</p>
    <p className="text-gray-900 dark:text-white text-2xl font-bold">{value}</p>
  </div>
);

const InstructionItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-start gap-4">
    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed pt-2">{text}</p>
  </div>
);

export default Instructions;
