import React from 'react';
import { 
  GraduationCap, 
  LogOut, 
  BookOpen, 
  CheckCircle 
} from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';

export const StudentDashboard = ({ student, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
               <div className="bg-indigo-600 p-2 rounded-lg">
                 <GraduationCap className="text-white w-5 h-5" />
               </div>
               <div>
                 <h1 className="font-bold text-gray-900 leading-tight">My Results</h1>
                 <p className="text-xs text-gray-500">Student Portal</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">{student.name}</span>
                <span className="text-xs text-gray-500 font-mono">{student.rollNumber}</span>
              </div>
              <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Header */}
        <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 sm:p-10 text-white mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Hello, {student.name.split(' ')[0]}!</h2>
                <p className="text-indigo-100">Here is your academic performance report for Semester {student.semester}.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-center min-w-[120px]">
                <p className="text-indigo-200 text-sm mb-1">GPA</p>
                <p className="text-4xl font-bold text-white">{student.gpa}</p>
              </div>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:col-span-3 gap-8">
          {/* Main Grades List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Subject Breakdown
            </h3>
            <div className="grid gap-4">
              {student.grades.map((subject, index) => (
                <Card key={index} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-bold text-gray-900">{subject.subject}</h4>
                    <p className="text-sm text-gray-500 mt-1">Course Code: CS-{100 + index}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-semibold">Score</p>
                      <p className="text-lg font-bold text-gray-900">{subject.score}/100</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm
                      ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-700' : 
                        subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' : 
                        'bg-yellow-100 text-yellow-700'}`}>
                      {subject.grade}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">Performance Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium text-gray-900">100%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-medium text-gray-900">92%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[92%]"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Remarks</h4>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Excellent performance in technical subjects. Keep up the good work in Data Structures!
                  </p>
                </div>
              </div>
            </Card>
            
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-4">
                If you believe there is a discrepancy in your results, please contact the administration.
              </p>
              <button className="w-full py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                Contact Admin
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};