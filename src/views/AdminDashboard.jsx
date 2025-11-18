import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  LogOut, 
  Search, 
  Plus, 
  TrendingUp, 
  Award, 
  Menu
} from 'lucide-react';
import { Card } from '../components/UI/Card'; 
import { Badge } from '../components/UI/Badge'; 
import { fetchStudents } from '../data/mockStudents'; 

export const AdminDashboard = ({ user, onLogout }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStudents().then(data => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const stats = useMemo(() => {
    if (!students.length) return { total: 0, avgGPA: 0, topPerformer: '-' };
    const total = students.length;
    const avgGPA = (students.reduce((acc, s) => acc + s.gpa, 0) / total).toFixed(2);
    const topPerformer = [...students].sort((a, b) => b.gpa - a.gpa)[0].name;
    return { total, avgGPA, topPerformer };
  }, [students]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 transform transition-transform lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <h2 className="font-bold text-gray-800">Admin Portal</h2>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" />
            Students
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Award className="w-5 h-5" />
            Results
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Dashboard Overview</h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500 hidden sm:block">Welcome, Administrator</span>
             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">AD</div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+2.5%</span>
              </div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
            </Card>

            <Card className="p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-500 text-sm">Average GPA</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.avgGPA}</h3>
            </Card>

            <Card className="p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-500 text-sm">Top Performer</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.topPerformer}</h3>
            </Card>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-800">Student Results</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or roll..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                  <Plus className="w-4 h-4" /> Add Result
                </button>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-700">Student Name</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Roll Number</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Semester</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">GPA</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading records...</td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No records found.</td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-900 font-medium">{student.name}</td>
                          <td className="px-6 py-4 text-gray-500 font-mono">{student.rollNumber}</td>
                          <td className="px-6 py-4 text-gray-600">{student.semester}</td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${student.gpa >= 3.5 ? 'text-green-600' : student.gpa >= 3.0 ? 'text-blue-600' : 'text-yellow-600'}`}>
                              {student.gpa}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge type={student.gpa >= 2.0 ? 'success' : 'error'}>
                              {student.gpa >= 2.0 ? 'Passed' : 'Failed'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};