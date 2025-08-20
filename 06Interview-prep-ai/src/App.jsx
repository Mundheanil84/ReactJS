import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, User, Briefcase, Code, Brain, Star, TrendingUp, LogIn, ArrowRight } from 'lucide-react';
import './App.css';

const InterviewPrepAI = () => {
  const [currentView, setCurrentView] = useState('intro'); // intro, role-select, dashboard, practice, feedback
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('behavioral');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    averageTime: 0,
    streakCount: 0
  });

  const roles = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      description: 'Practice coding interviews, system design, and technical questions',
      icon: Code,
      color: 'bg-blue-500'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description: 'Prepare for product sense, execution, and behavioral interviews',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Practice statistics, machine learning, and data analysis questions',
      icon: Brain,
      color: 'bg-green-500'
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      description: 'Prepare for design critiques, portfolio reviews, and whiteboarding',
      icon: User,
      color: 'bg-orange-500'
    }
  ];

  const questionCategories = {
    behavioral: {
      name: 'Behavioral',
      icon: User,
      color: 'bg-blue-500',
      questions: [
        {
          id: 1,
          question: "Tell me about a time when you had to work with a difficult team member.",
          tips: "Use the STAR method (Situation, Task, Action, Result). Focus on how you handled the conflict professionally.",
          sampleAnswer: "Focus on communication, understanding their perspective, and finding common ground."
        },
        {
          id: 2,
          question: "Describe a situation where you had to meet a tight deadline.",
          tips: "Emphasize time management skills, prioritization, and how you remained calm under pressure.",
          sampleAnswer: "Highlight your planning process, resource allocation, and successful outcome."
        },
        {
          id: 3,
          question: "Give an example of when you showed leadership skills.",
          tips: "Even without a formal leadership role, you can show initiative, mentoring, or project ownership.",
          sampleAnswer: "Discuss taking initiative, motivating others, and achieving team goals."
        }
      ]
    },
    technical: {
      name: 'Technical',
      icon: Code,
      color: 'bg-green-500',
      questions: [
        {
          id: 4,
          question: "Explain the difference between SQL and NoSQL databases.",
          tips: "Cover structure, scalability, consistency, and use cases for each type.",
          sampleAnswer: "SQL: structured, ACID compliance, complex queries. NoSQL: flexible schema, horizontal scaling, eventual consistency."
        },
        {
          id: 5,
          question: "How would you optimize a slow-running query?",
          tips: "Mention indexing, query execution plans, data structure optimization, and caching strategies.",
          sampleAnswer: "Analyze execution plan, add appropriate indexes, optimize WHERE clauses, consider query restructuring."
        },
        {
          id: 6,
          question: "What is the difference between synchronous and asynchronous programming?",
          tips: "Explain blocking vs non-blocking operations, use cases, and performance implications.",
          sampleAnswer: "Sync: sequential execution, blocking. Async: concurrent execution, non-blocking, better resource utilization."
        }
      ]
    },
    situational: {
      name: 'Situational',
      icon: Brain,
      color: 'bg-purple-500',
      questions: [
        {
          id: 7,
          question: "How would you handle a situation where you disagree with your manager's decision?",
          tips: "Show respect for hierarchy while demonstrating critical thinking and communication skills.",
          sampleAnswer: "Present data-driven concerns privately, seek to understand their perspective, and support the final decision."
        },
        {
          id: 8,
          question: "What would you do if you realized you made a mistake that affected the team?",
          tips: "Emphasize accountability, quick communication, and problem-solving approach.",
          sampleAnswer: "Take immediate responsibility, inform stakeholders, propose solutions, and implement preventive measures."
        },
        {
          id: 9,
          question: "How would you prioritize multiple urgent tasks?",
          tips: "Demonstrate systematic thinking, stakeholder communication, and decision-making skills.",
          sampleAnswer: "Assess impact and urgency, communicate with stakeholders, delegate when possible, and set realistic expectations."
        }
      ]
    },
    company: {
      name: 'Company Specific',
      icon: Briefcase,
      color: 'bg-orange-500',
      questions: [
        {
          id: 10,
          question: "Why do you want to work for our company?",
          tips: "Research the company's mission, values, recent news, and products. Be specific and genuine.",
          sampleAnswer: "Connect your values with company mission, mention specific products/initiatives that excite you."
        },
        {
          id: 11,
          question: "What do you know about our products/services?",
          tips: "Demonstrate thorough research and understanding of the company's business model and market position.",
          sampleAnswer: "Show detailed knowledge of their offerings, competitors, and market challenges."
        },
        {
          id: 12,
          question: "How do you see yourself contributing to our team?",
          tips: "Align your skills and experience with the job requirements and team needs.",
          sampleAnswer: "Highlight relevant skills, past achievements, and specific ways you can add value."
        }
      ]
    }
  };

  const startSession = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(questionCategories[category].questions[0]);
    setCurrentView('practice');
    setUserAnswer('');
  };

  const nextQuestion = () => {
    const currentCategoryQuestions = questionCategories[selectedCategory].questions;
    const currentIndex = currentCategoryQuestions.findIndex(q => q.id === currentQuestion.id);
    const nextIndex = (currentIndex + 1) % currentCategoryQuestions.length;
    setCurrentQuestion(currentCategoryQuestions[nextIndex]);
    setUserAnswer('');
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) return;

    const newSession = {
      id: Date.now(),
      question: currentQuestion.question,
      answer: userAnswer,
      category: selectedCategory,
      timestamp: new Date(),
      score: Math.floor(Math.random() * 5) + 3 // Simulated score
    };

    setSessionHistory(prev => [newSession, ...prev]);
    setStats(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (newSession.score >= 4 ? 1 : 0),
      streakCount: newSession.score >= 4 ? prev.streakCount + 1 : 0
    }));

    setCurrentView('feedback');
  };

  const getFeedback = () => {
    const score = sessionHistory[0]?.score || 0;
    if (score >= 4) {
      return {
        type: 'positive',
        message: 'Great answer! You demonstrated clear structure and relevant examples.',
        suggestions: ['Consider adding more specific metrics', 'Great use of the STAR method']
      };
    } else {
      return {
        type: 'improvement',
        message: 'Good effort! Here are some areas to improve:',
        suggestions: ['Provide more specific examples', 'Structure your answer using STAR method', 'Include quantifiable results']
      };
    }
  };

  const renderIntro = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6">Interview Prep AI</h1>
        <p className="text-xl mb-8 opacity-90">
          The ultimate platform to master your interview skills with AI-powered practice sessions.
          Get personalized feedback and improve your performance for your dream job.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Targeted Practice</h3>
            <p className="opacity-80">Practice questions tailored to your desired role and company</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Feedback</h3>
            <p className="opacity-80">Get instant, detailed feedback on your answers</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="opacity-80">Monitor your improvement with detailed analytics</p>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentView('role-select')}
          className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all flex items-center mx-auto"
        >
          Get Started <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderRoleSelect = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Select Your Role</h1>
          <p className="text-xl text-gray-600">Choose the role you're preparing for to get tailored interview questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 flex flex-col"
                onClick={() => {
                  setSelectedRole(role.id);
                  setCurrentView('dashboard');
                }}
              >
                <div className={`${role.color} w-14 h-14 rounded-lg flex items-center justify-center mb-6`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{role.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{role.description}</p>
                <div className="flex items-center text-blue-600 font-medium mt-auto">
                  Select Role <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
        
        <button
          onClick={() => setCurrentView('intro')}
          className="flex items-center text-gray-600 hover:text-gray-800 mx-auto"
        >
          <ChevronRight className="w-4 h-4 transform rotate-180 mr-2" />
          Back to Introduction
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Interview Prep Dashboard</h1>
            <p className="text-gray-600">
              Preparing for: <span className="font-medium capitalize">{selectedRole.replace('-', ' ')}</span>
            </p>
          </div>
          <button
            onClick={() => setCurrentView('role-select')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Change Role
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Questions Practiced</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalQuestions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800">{stats.streakCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-gray-800">{sessionHistory.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(questionCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <div
                key={key}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105"
                onClick={() => startSession(key)}
              >
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.questions.length} questions</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Start Practice <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent History */}
        {sessionHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Practice Sessions</h3>
            <div className="space-y-3">
              {sessionHistory.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 truncate">{session.question}</p>
                    <p className="text-sm text-gray-600">{session.category} • {session.timestamp.toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < session.score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ChevronRight className="w-4 h-4 transform rotate-180 mr-2" />
              Back to Dashboard
            </button>
            <div className="text-sm text-gray-600">
              {questionCategories[selectedCategory].name} Questions
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentQuestion?.question}</h2>
            
            {/* Tips Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for answering:</h4>
              <p className="text-blue-700">{currentQuestion?.tips}</p>
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer:
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your answer here... Try to structure it using the STAR method (Situation, Task, Action, Result)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
              <button
                onClick={nextQuestion}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Skip Question
              </button>
            </div>
          </div>

          {/* Sample Answer Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">💭 Key Points to Consider:</h4>
            <p className="text-gray-700">{currentQuestion?.sampleAnswer}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => {
    const feedback = getFeedback();
    const lastSession = sessionHistory[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                feedback.type === 'positive' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {feedback.type === 'positive' ? 
                  <CheckCircle className="w-8 h-8 text-green-600" /> : 
                  <XCircle className="w-8 h-8 text-yellow-600" />
                }
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Answer Feedback</h2>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < lastSession?.score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Question:</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-4">{lastSession?.question}</p>
              
              <h3 className="font-semibold text-gray-800 mb-3">Your Answer:</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-4">{lastSession?.answer}</p>
            </div>

            <div className={`border rounded-lg p-6 mb-6 ${
              feedback.type === 'positive' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
            }`}>
              <h3 className="font-semibold text-gray-800 mb-3">Feedback:</h3>
              <p className="text-gray-700 mb-4">{feedback.message}</p>
              
              <h4 className="font-medium text-gray-800 mb-2">Suggestions for improvement:</h4>
              <ul className="space-y-1">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={nextQuestion}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next Question
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'intro':
      return renderIntro();
    case 'role-select':
      return renderRoleSelect();
    case 'dashboard':
      return renderDashboard();
    case 'practice':
      return renderPractice();
    case 'feedback':
      return renderFeedback();
    default:
      return renderIntro();
  }
};

function App() {
  return <InterviewPrepAI />;
}

export default App;