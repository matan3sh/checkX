import axios from 'axios';

export default {
  register,
  login,
  getLoggedInUser
};

async function register(userCred) {
  return await axios.post('/api/user', userCred, {
    headers: { 'Contect-Type': 'application/json' }
  });
}

async function getLoggedInUser() {
  return await axios.get('/api/auth');
}

async function login(userCred) {
  return await axios.post('/api/auth', userCred, {
    headers: { 'Contect-Type': 'application/json' }
  });
}
