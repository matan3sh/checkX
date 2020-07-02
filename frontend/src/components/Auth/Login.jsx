import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAlert } from '../../store/alert/alertActions';
import { login, clearError, loadUser } from '../../store/auth/authActions';

const Login = ({
  loadAlert,
  login,
  error,
  clearError,
  isAuthenticated,
  history,
  loadUser
}) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'Invalid Credentials') {
      loadAlert(error, 'danger');
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      loadAlert('Please Fill In All Fields', 'danger');
    } else {
      login({
        email,
        password
      });
      setTimeout(() => loadUser(), 2000);
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  loadAlert,
  login,
  clearError,
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
