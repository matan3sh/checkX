import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/auth/authActions';

class SideMenu extends React.Component {
  state = { toggle: false };

  toggle = () => {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  };

  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { user, isAuthenticated } = this.props;
    const guestLinks = (
      <Fragment>
        <NavLink
          to='/login'
          exact
          className='nav-link'
          activeClassName='nav-active'
        >
          <div className='nav-icon-container'>
            <i className='material-icons'>login</i>
          </div>
          <span className='nav-label'>Login</span>
        </NavLink>
        <NavLink
          to='/register'
          exact
          className='nav-link'
          activeClassName='nav-active'
        >
          <div className='nav-icon-container'>
            <i className='material-icons'>how_to_reg</i>
          </div>
          <span className='nav-label'>Register</span>
        </NavLink>
      </Fragment>
    );

    return (
      <nav className={`nav ${this.state.toggle ? 'nav--collapsed' : ''}`}>
        {user ? (
          <div className='user-welcome'>
            <img
              src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
              alt=''
              className='nav-user-avatar'
            />
            <h5>Hello {user !== null && <span>{user.name}</span>}</h5>
          </div>
        ) : (
          <div className='user-welcome'></div>
        )}

        <div className='nav-border' onClick={this.toggle}></div>
        {isAuthenticated === null || !isAuthenticated ? (
          guestLinks
        ) : (
          <Fragment>
            <NavLink
              to='/'
              exact
              className='nav-link'
              activeClassName='nav-active'
            >
              <div className='nav-icon-container'>
                <i className='material-icons'>dashboard</i>
              </div>
              <span className='nav-label'>Dashboard</span>
            </NavLink>
            <NavLink
              to='/alerts'
              exact
              className='nav-link'
              activeClassName='nav-active'
            >
              <div className='nav-icon-container'>
                <i className='material-icons'>alarm</i>
              </div>
              <span className='nav-label'>Alerts</span>
            </NavLink>
            <NavLink
              to='/plugins'
              exact
              className='nav-link'
              activeClassName='nav-active'
            >
              <div className='nav-icon-container'>
                <i className='material-icons'>extension</i>
              </div>
              <span className='nav-label'>Plugins</span>
            </NavLink>
            <a onClick={this.onLogout} className='nav-link pointer' href='#/'>
              <div className='nav-icon-container'>
                <i className='material-icons'>power_settings_new</i>
              </div>
              <span className='nav-label'>Log Out</span>
            </a>
          </Fragment>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
