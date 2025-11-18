import React, { useState } from 'react';
import { GraduationCap, XCircle } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { MOCK_STUDENTS } from '../data/mockStudents';

export const LoginScreen = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      if (role === 'admin') {
        if (credentials.id === 'admin' && credentials.password === 'admin') {
          onLogin('admin', { name: 'Administrator' });
        } else {
          setError('Invalid Admin credentials (Try: admin/admin)');
        }
      } else {
        const student = MOCK_STUDENTS.find(s => s.rollNumber === credentials.id);
        if (student) {
          onLogin('student', student);
        } else {
          setError('Student ID not found (Try: CS101, CS102, CS103, CS104)');
        }
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Result Management System</h1>
          <p className="text-gray-500 mt-2">Secure Access Portal</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'student' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setRole('student'); setError(''); }}
          >
            Student Portal
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setRole('admin'); setError(''); }}
          >
            Admin Dashboard
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === 'admin' ? 'Username' : 'Student Roll Number'}
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder={role === 'admin' ? 'admin' : 'e.g., CS101'}
              value={credentials.id}
              onChange={e => setCredentials({...credentials, id: e.target.value})}
            />
          </div>
          
          {role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="••••••"
                value={credentials.password}
                onChange={e => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? 'Verifying...' : 'Access Portal'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Demo Credentials: <br/> Admin: <code className="font-mono">admin/admin</code> <br/> Student: <code className="font-mono">CS101</code>, <code className="font-mono">CS102</code>, etc.
          </p>
        </div>
      </Card>
    </div>
  );
};