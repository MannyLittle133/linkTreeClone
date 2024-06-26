import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

const SignUp = ({ onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = zxcvbn(newPassword);
    setPasswordStrength({
      score: strength.score,
      feedback: strength.feedback.suggestions.join(' '),
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/users', { user: { name, email, password } }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      onSignupSuccess(response.data);
      navigate('/links');
    } catch (error) {
      setError('Error creating account');
    }
  };

  const getStrengthColor = (score) => {
    switch (score) {
      case 0:
        return 'red';
      case 1:
        return 'orange';
      case 2:
        return 'yellow';
      case 3:
        return 'lightgreen';
      case 4:
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-3xl text-center text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="mt-2">
            <span>Password strength: </span>
            <span style={{ color: getStrengthColor(passwordStrength.score) }}>
              {['Weak', 'Weak', 'Okay', 'Good', 'Strong'][passwordStrength.score]}
            </span>
          </div>
          {passwordStrength.feedback && (
            <div className="mt-2 text-gray-600">
              <small>{passwordStrength.feedback}</small>
            </div>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
