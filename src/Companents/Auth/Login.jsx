import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { employees, admin } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Check admin credentials
    const adminUser = (admin || []).find(a => a.email === email && a.password === password);
    if (adminUser) {
      setLoading(false);
      onLogin('admin', adminUser);
      return;
    }
    // Check employee credentials
    const employeeUser = (employees || []).find(emp => emp.email === email && emp.password === password);
    if (employeeUser) {
      setLoading(false);
      onLogin('employee', employeeUser);
      return;
    }
    setError('Invalid Credentials');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.01M21.75 12c-.512-.96-1.24-1.972-2.193-2.927m-3.07-2.57A6.75 6.75 0 0 0 12 5.25c-1.563 0-3.06.362-4.396 1.01m0 0A10.477 10.477 0 0 0 2.25 12m5.354-5.74l9.792 9.792m0 0A10.477 10.477 0 0 0 21.75 12m-5.354 5.74-9.792-9.792" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 transition"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline transition">Forgot password?</a>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center animate-shake">{error}</div>
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Don&apos;t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
