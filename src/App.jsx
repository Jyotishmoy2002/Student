import React, { useState } from 'react';
import { LoginScreen } from './views/LoginScreen.jsx';
import { StudentDashboard } from './views/StudentDashboard.jsx';
import { AdminDashboard } from './views/AdminDashboard.jsx';

const App = () => {
  const [appState, setAppState] = useState('login');
  const [user, setUser] = useState(null);
  const handleLogin = (role, userData) => {
    setUser(userData);
    setAppState(role);
  };
  const handleLogout = () => {
    setUser(null);
    setAppState('login');
  };
  const renderContent = () => {
    switch (appState) {
      case 'student':
        return user ? <StudentDashboard student={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />;
      case 'admin':
        return user ? <AdminDashboard user={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />;
      case 'login':
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      {renderContent()}
    </div>
  );
};

export default App;