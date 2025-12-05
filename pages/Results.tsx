import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_EXAM } from '../constants';

const Results: React.FC = () => {
  const navigate = useNavigate();

  // Mock results
  const score = 85;
  const correct = 17; // This would be calculated based on real submissions
  const incorrect = 3; 
  const total = 20; // Just using first 20 for this mock display

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-6 py-3 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl">school</span>
          <h2 className="text-lg font-bold">University Name</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <span className="font-medium text-gray-600 dark:text-gray-300">Exam Results: {MOCK_EXAM.title}</span>
        </div>
        <button onClick={() => navigate('/dashboard')} className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-8 p-4 md:p-8 lg:px-24 xl:px-40 max-w-7xl mx-auto w-full">
        {/* Hero Score */}
        <section className="flex flex-col items-center gap-6 text-center py-8">
          <div className="relative flex items-center justify-center w-48 h-48">
             <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                <path className="text-success" strokeDasharray={`${score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeLinecap="round"></path>
             </svg>
             <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold tracking-tight">{score}%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Final Score</span>
             </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Congratulations, Alex!</h1>
            <p className="text-gray-500 dark:text-gray-400">You've successfully completed the exam. Here's your performance summary.</p>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           <StatBox title="Total Score" value={`${score}/100`} />
           <StatBox title="Correct Answers" value={correct.toString()} />
           <StatBox title="Incorrect Answers" value={incorrect.toString()} />
           <StatBox title="Time Taken" value="45:10" />
        </div>

        {/* Breakdown */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold px-1">Answer Breakdown</h2>
          <div className="flex flex-col gap-4">
             {/* Mock Items */}
             <ResultItem 
                qId={1} 
                question="What is the theory of relativity?" 
                userAns="A theory that describes gravity as a curvature of spacetime." 
                correctAns="A theory that describes gravity as a curvature of spacetime."
                isCorrect={true}
             />
             <ResultItem 
                qId={2} 
                question="Who developed the theory of general relativity?" 
                userAns="Isaac Newton" 
                correctAns="Albert Einstein"
                isCorrect={false}
                explanation="While Isaac Newton developed the laws of motion and universal gravitation, Albert Einstein developed the theory of general relativity in the early 20th century."
             />
             <ResultItem 
                qId={3} 
                question="What is a black hole?" 
                userAns="A region of spacetime where gravity is so strong that nothing can escape." 
                correctAns="A region of spacetime where gravity is so strong that nothing can escape."
                isCorrect={true}
             />
             <ResultItem 
                qId={4} 
                question="Which of the following are primary colors? (Mock Multiple Select)" 
                userAns={["Red", "Blue"]} 
                correctAns={["Red", "Blue", "Green"]}
                isCorrect={false}
                explanation="RGB model includes Red, Green, and Blue."
             />
          </div>
        </section>

        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
           <button 
             onClick={() => navigate('/dashboard')}
             className="w-full sm:w-auto h-12 px-8 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
           >
             <span className="material-symbols-outlined">dashboard</span>
             Return to Dashboard
           </button>
           <button className="w-full sm:w-auto h-12 px-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
             <span className="material-symbols-outlined">download</span>
             Download Results (PDF)
           </button>
        </section>
      </main>
    </div>
  );
};

const StatBox: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center sm:text-left">
    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
    <p className="text-3xl font-bold tracking-tight">{value}</p>
  </div>
);

const ResultItem: React.FC<{ 
  qId: number; 
  question: string; 
  userAns: string | string[]; 
  correctAns: string | string[]; 
  isCorrect: boolean; 
  explanation?: string 
}> = ({ qId, question, userAns, correctAns, isCorrect, explanation }) => {
  
  const formatAns = (ans: string | string[]) => Array.isArray(ans) ? ans.join(', ') : ans;
  const displayUserAns = formatAns(userAns);
  const displayCorrectAns = formatAns(correctAns);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <details className="group" open={!isCorrect}>
        <summary className="flex items-center justify-between p-5 cursor-pointer list-none bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-4">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
              {qId}
            </span>
            <span className="font-medium text-lg">{question}</span>
          </div>
          <span className={`material-symbols-outlined text-2xl ${isCorrect ? 'text-success' : 'text-danger'}`}>
            {isCorrect ? 'check_circle' : 'cancel'}
          </span>
        </summary>
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30' : 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30'}`}>
              <p className={`text-xs font-bold uppercase mb-1 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>Your Answer</p>
              <p className="text-gray-800 dark:text-gray-200">{displayUserAns}</p>
            </div>
            {!isCorrect && (
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                <p className="text-xs font-bold uppercase mb-1 text-green-700 dark:text-green-400">Correct Answer</p>
                <p className="text-gray-800 dark:text-gray-200">{displayCorrectAns}</p>
              </div>
            )}
          </div>
          {explanation && (
            <div className="mt-2 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-sm">
              <span className="font-bold text-blue-800 dark:text-blue-300">Explanation: </span>
              <span className="text-blue-900 dark:text-blue-200">{explanation}</span>
            </div>
          )}
        </div>
      </details>
    </div>
  );
};

export default Results;
