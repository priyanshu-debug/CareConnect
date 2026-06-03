// frontend/src/pages/Auth.jsx
import React, { useState } from 'react';
import { Shield, Activity, User, Briefcase, Lock, Mail } from 'lucide-react';
import axios from 'axios';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', gender: '', age: '',
    bloodGroup: '', allergies: '', specialisation: '', licenseNumber: '', experience: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    
    // Formatting multi-input strings for backend schemas
    const payload = {
      ...formData,
      role,
      allergies: formData.allergies ? formData.allergies.split(',') : [],
    };

    try {
      const res = await axios.post(url, isLogin ? { email: formData.email, password: formData.password } : payload);
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        alert(`Logged in successfully as ${res.data.user.role}!`);
        // Yahan se dashboard par navigate karenge baad me
      } else {
        alert('Registration Successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden transition-all duration-300">
        
        {/* Left Side: Branding (Responsive Hidden on mobile if needed, but keeping it clean here) */}
        <div className="bg-indigo-600 md:w-2/5 p-8 flex flex-col justify-between text-white text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Activity className="h-8 w-8 text-emerald-400 animate-pulse" />
            <span className="text-2xl font-bold tracking-wide">CareConnect</span>
          </div>
          <div className="my-8 md:my-0">
            <h2 className="text-3xl font-extrabold mb-4">Smart Telemedicine Platform</h2>
            <p className="text-indigo-100 text-sm">Consult top doctors online, manage real-time prescriptions, and get AI-powered health monitoring at your fingertips.</p>
          </div>
          <p className="text-xs text-indigo-200 hidden md:block">© 2026 CareConnect. Secure & Encrypted.</p>
        </div>

        {/* Right Side: Dynamic Form */}
        <div className="p-8 md:w-3/5 w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              {isLogin ? 'New here? Register' : 'Have an account? Login'}
            </button>
          </div>

          {/* Role Selection Tabs (Only for Registration) */}
          {!isLogin && (
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium border transition-all ${role === 'patient' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                <User className="h-4 w-4" /> Patient
              </button>
              <button
                type="button"
                onClick={() => setRole('doctor')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium border transition-all ${role === 'doctor' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                <Briefcase className="h-4 w-4" /> Doctor
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields for Login & Register */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address</label>
              <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="name@example.com" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Password</label>
              <input type="password" name="password" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="••••••••" />
            </div>

            {/* Registration Dynamic Fields */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Age</label>
                  <input type="number" name="age" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="24" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Gender</label>
                  <select name="gender" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Patient Dynamic Schema Block */}
                {role === 'patient' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Blood Group</label>
                      <input type="text" name="bloodGroup" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="O+" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Allergies (Comma separated)</label>
                      <input type="text" name="allergies" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Peanuts, Pollen" />
                    </div>
                  </>
                ) : (
                  /* Doctor Dynamic Schema Block */
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Specialisation</label>
                      <input type="text" name="specialisation" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Cardiologist" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">License Number</label>
                      <input type="text" name="licenseNumber" required onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="MCI-12345" />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-200 transition-all tracking-wide mt-4">
              {isLogin ? 'Sign In to Account' : 'Complete Registration'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}