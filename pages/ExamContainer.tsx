import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_EXAM, CURRENT_USER } from '../constants';
import { AnswerMap, FlaggedSet, Question, QuestionType } from '../types';

// ------------------- SUB COMPONENTS -------------------

const QuestionInput: React.FC<{ 
  question: Question; 
  answer: string | string[] | undefined; 
  onChange: (val: string | string[]) => void 
}> = ({ question, answer, onChange }) => {
  
  // Single Choice (Radio)
  if (question.type === QuestionType.SingleChoice) {
    return (
      <div className="flex flex-col gap-3">
        {question.options?.map((opt, idx) => {
          const isSelected = answer === opt;
          return (
            <label 
              key={idx} 
              className={`group flex items-center gap-4 rounded-xl border p-4 transition-all cursor-pointer select-none ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-primary/50 dark:hover:border-primary/50'}`}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <input 
                  type="radio" 
                  name={`q-${question.id}`} 
                  className="peer h-5 w-5 text-primary border-gray-300 focus:ring-primary focus:ring-offset-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  checked={isSelected}
                  onChange={() => onChange(opt)}
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-base font-medium transition-colors ${isSelected ? 'text-primary dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  <span className="opacity-60 mr-3 text-sm font-bold uppercase">{String.fromCharCode(65 + idx)}</span> 
                  {opt}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    );
  }

  // Multiple Select (Checkbox)
  if (question.type === QuestionType.MultipleSelect) {
    const selectedArr = Array.isArray(answer) ? answer : [];
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic mb-1">
          Select all that apply:
        </p>
        {question.options?.map((opt, idx) => {
          const isSelected = selectedArr.includes(opt);
          return (
            <label 
              key={idx}
              className={`group flex items-center gap-4 rounded-xl border p-4 transition-all cursor-pointer select-none ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-primary/50 dark:hover:border-primary/50'}`}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <input 
                  type="checkbox" 
                  className="peer h-5 w-5 rounded text-primary border-gray-300 focus:ring-primary focus:ring-offset-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedArr, opt]);
                    } else {
                      onChange(selectedArr.filter(item => item !== opt));
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-base font-medium transition-colors ${isSelected ? 'text-primary dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'}`}>
                   <span className="opacity-60 mr-3 text-sm font-bold uppercase">{String.fromCharCode(65 + idx)}</span> 
                  {opt}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    );
  }

  // Short Answer (Text Input)
  if (question.type === QuestionType.ShortAnswer) {
    return (
      <div className="w-full flex flex-col gap-2">
        <input 
          type="text" 
          className="w-full rounded-xl border border-gray-300 bg-white dark:bg-gray-800 px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:text-white dark:focus:ring-primary/20 transition-all shadow-sm"
          placeholder="Type your answer here..."
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">Please answer concisely.</p>
      </div>
    );
  }

  // Essay (Text Area)
  if (question.type === QuestionType.Essay) {
    return (
      <div className="w-full flex flex-col gap-2">
        <textarea 
          className="w-full min-h-[240px] rounded-xl border border-gray-300 bg-white dark:bg-gray-800 px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:text-white dark:focus:ring-primary/20 transition-all shadow-sm resize-y leading-relaxed"
          placeholder="Type your detailed response here..."
          value={typeof answer === 'string' ? answer : ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex justify-between items-center px-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Ensure your answer is comprehensive.</p>
          <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
             {(typeof answer === 'string' ? answer.length : 0)} characters
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ------------------- MAIN COMPONENT -------------------

const ExamContainer: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  
  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [flagged, setFlagged] = useState<FlaggedSet>(new Set());
  const [viewMode, setViewMode] = useState<'taking' | 'review'>('taking');
  const [timeLeft, setTimeLeft] = useState(MOCK_EXAM.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          // Auto-submit logic would go here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helpers
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hrs, mins, secs };
  };

  const handleAnswerChange = (val: string | string[]) => {
    const qId = MOCK_EXAM.questions[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const toggleFlag = (qId: number) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSubmit = () => {
    // In real app, post to API
    navigate(`/exam/${examId}/results`);
  };

  const currentQuestion = MOCK_EXAM.questions[currentQuestionIndex];
  const { hrs, mins, secs } = formatTime(timeLeft);
  const currentAnswer = answers[currentQuestion.id];
  const isFlagged = flagged.has(currentQuestion.id);
  const currentSection = MOCK_EXAM.sections.find(s => s.id === currentQuestion.sectionId);

  // Scroll to top when question changes
  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0);
  }, [currentQuestionIndex, viewMode]);

  // Group questions by section for the sidebar
  const questionsBySection = MOCK_EXAM.sections.map(section => ({
    ...section,
    questions: MOCK_EXAM.questions.filter(q => q.sectionId === section.id)
  }));

  return (
    <div className="flex h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
      
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-3 z-20">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl">school</span>
          <h2 className="hidden sm:block text-lg font-bold">{MOCK_EXAM.title}</h2>
          <h2 className="sm:hidden text-lg font-bold">{MOCK_EXAM.courseCode}</h2>
        </div>
        <div className="flex items-center gap-4">
           {viewMode === 'review' && (
             <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
               <span className="material-symbols-outlined">timer</span>
               <span>Time Remaining: {hrs.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</span>
             </div>
           )}
          <div className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm">
            <span className="truncate">{CURRENT_USER.name}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3 items-start">
            
            {/* Taking Mode */}
            {viewMode === 'taking' && (
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* Section Info Tab */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all">
                   <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                     <div className="flex items-center justify-between mb-3">
                       <h3 className="font-semibold text-gray-700 dark:text-gray-300">Section {currentSection?.id}: {currentSection?.title}</h3>
                       <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-md">Q{currentQuestionIndex + 1} / {MOCK_EXAM.totalQuestions}</span>
                     </div>
                     <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                       <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${((currentQuestionIndex + 1) / MOCK_EXAM.totalQuestions) * 100}%` }}></div>
                     </div>
                   </div>
                   
                   <div className="p-6 md:p-8">
                     <div className="flex flex-col gap-3 mb-8">
                       <span className="inline-flex self-start text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                        {currentQuestion.type === QuestionType.MultipleSelect ? "Multiple Select" : 
                         currentQuestion.type === QuestionType.Essay ? "Essay" : 
                         currentQuestion.type === QuestionType.ShortAnswer ? "Short Answer" : "Multiple Choice"}
                       </span>
                       <h1 className="text-xl md:text-2xl font-bold leading-tight text-gray-900 dark:text-white">{currentQuestion.text}</h1>
                     </div>
                     
                     <QuestionInput 
                        key={currentQuestion.id}
                        question={currentQuestion} 
                        answer={currentAnswer} 
                        onChange={handleAnswerChange} 
                     />
                   </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-between gap-3 pt-2">
                  <button 
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Previous
                  </button>
                  <button 
                    onClick={() => {
                       if (currentQuestionIndex === MOCK_EXAM.totalQuestions - 1) {
                         setViewMode('review');
                       } else {
                         setCurrentQuestionIndex(prev => Math.min(MOCK_EXAM.totalQuestions - 1, prev + 1));
                       }
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-[0.98]"
                  >
                    {currentQuestionIndex === MOCK_EXAM.totalQuestions - 1 ? 'Review Exam' : 'Next Question'}
                    {currentQuestionIndex !== MOCK_EXAM.totalQuestions - 1 && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                  </button>
                </div>
              </div>
            )}

            {/* Review Mode */}
            {viewMode === 'review' && (
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-col gap-2 mb-2">
                   <h1 className="text-3xl font-black text-gray-900 dark:text-white">Review Your Answers</h1>
                   <p className="text-gray-500 dark:text-gray-400">Please review your answers before final submission.</p>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-500 font-semibold">
                        <tr>
                          <th className="px-6 py-4">Question</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {MOCK_EXAM.questions.map((q) => {
                          const isAns = answers[q.id] && (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true);
                          const isFlg = flagged.has(q.id);
                          return (
                            <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900 dark:text-white">Question {q.id}</span>
                                  <span className="text-sm text-gray-500 truncate max-w-xs">{q.text}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {isFlg ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:text-orange-300">
                                      <span className="material-symbols-outlined text-sm">flag</span> Flagged
                                    </span>
                                  ) : isAns ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                                      <span className="material-symbols-outlined text-sm">check_circle</span> Answered
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                      <span className="material-symbols-outlined text-sm">radio_button_unchecked</span> Unanswered
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => {
                                    setCurrentQuestionIndex(MOCK_EXAM.questions.findIndex(qu => qu.id === q.id));
                                    setViewMode('taking');
                                  }}
                                  className="text-primary font-bold text-sm hover:underline"
                                >
                                  {isAns ? 'Edit' : 'Answer'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar (Control Panel) - Sticky on Desktop */}
            <div className="lg:col-span-1 flex flex-col gap-6 sticky top-6">
              
              {/* Timer Card */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
                <h3 className="mb-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wide">Time Remaining</h3>
                <div className="flex gap-2">
                  <TimeBox val={hrs} label="Hours" />
                  <TimeBox val={mins} label="Minutes" />
                  <TimeBox val={secs} label="Seconds" isDanger={hrs === 0 && mins < 5} />
                </div>
              </div>

              {/* Question Grid Grouped by Section */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm max-h-[500px] overflow-y-auto">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Questions</h3>
                
                <div className="flex flex-col gap-6">
                  {questionsBySection.map((section) => (
                    <div key={section.id} className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{section.title}</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {section.questions.map((q) => {
                          const idx = MOCK_EXAM.questions.findIndex(mq => mq.id === q.id);
                          const isCurrent = viewMode === 'taking' && idx === currentQuestionIndex;
                          const isAns = answers[q.id] && (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true);
                          const isFlg = flagged.has(q.id);
                          
                          let bgClass = "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
                          if (isFlg) bgClass = "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
                          else if (isAns) bgClass = "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
                          
                          if (isCurrent) bgClass = "ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-gray-900 bg-primary text-white border-transparent shadow-lg shadow-primary/25";

                          return (
                            <button
                              key={q.id}
                              onClick={() => {
                                setCurrentQuestionIndex(idx);
                                setViewMode('taking');
                              }}
                              className={`h-9 w-full rounded-md text-xs font-bold transition-all ${bgClass}`}
                            >
                              {q.id}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Answered</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span> Flagged</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"></span> Unanswered</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {viewMode === 'taking' && (
                  <button 
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg h-11 px-4 text-sm font-bold transition-colors ${isFlagged ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/10'}`}
                  >
                    <span className={`material-symbols-outlined text-lg ${isFlagged ? 'fill' : ''}`}>flag</span>
                    {isFlagged ? 'Unflag Question' : 'Flag for Review'}
                  </button>
                )}
                
                <button 
                  onClick={() => setShowSubmitModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg h-11 px-4 bg-danger text-white text-sm font-bold shadow-md shadow-danger/20 hover:bg-danger/90 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  Submit Exam
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6 md:p-8 flex flex-col gap-6 scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl">assignment_turned_in</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Final Submission</h3>
              <p className="text-gray-500 dark:text-gray-400">Are you sure you want to submit your exam? This action cannot be undone.</p>
              
              {/* Unanswered warning */}
              {Object.keys(answers).length < MOCK_EXAM.totalQuestions && (
                 <div className="mt-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 w-full text-sm">
                   <div className="flex items-center justify-center gap-2 font-bold mb-1">
                     <span className="material-symbols-outlined text-lg">warning</span>
                     Warning
                   </div>
                   You have {MOCK_EXAM.totalQuestions - Object.keys(answers).length} unanswered questions.
                 </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="flex w-full items-center justify-center rounded-xl h-12 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex w-full items-center justify-center rounded-xl h-12 bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TimeBox: React.FC<{ val: number; label: string; isDanger?: boolean }> = ({ val, label, isDanger }) => (
  <div className="flex grow basis-0 flex-col items-stretch gap-2">
    <div className={`flex h-12 md:h-14 items-center justify-center rounded-lg ${isDanger ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>
      <p className="text-2xl font-bold leading-tight">{val.toString().padStart(2, '0')}</p>
    </div>
    <p className={`text-center text-[10px] md:text-xs font-medium uppercase ${isDanger ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`}>{label}</p>
  </div>
);

export default ExamContainer;
