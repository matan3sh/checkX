import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/auth/authActions';

class BottomMenu extends React.Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { user, isAuthenticated } = this.props;
    const guestLinks = (
      <>
        <NavLink
          to='/login'
          exact
          className='bottom-nav-link bottom-nav-link-guest'
          activeClassName='bottom-nav-link-active'
        >
          <div className='nav-icon-container'>
            <i className='material-icons'>login</i>
          </div>
          <span className='nav-label'>Login</span>
        </NavLink>
        <NavLink
          to='/register'
          exact
          className='bottom-nav-link bottom-nav-link-guest'
          activeClassName='bottom-nav-link-active'
        >
          <div className='nav-icon-container'>
            <i className='material-icons'>how_to_reg</i>
          </div>
          <span className='nav-label'>Register</span>
        </NavLink>
      </>
    );

    return (
      <nav className='bottom-nav'>
        {isAuthenticated === null || !isAuthenticated ? (
          guestLinks
        ) : (
          <>
            {' '}
            <NavLink
              to='/'
              exact
              className='bottom-nav-link'
              activeClassName='bottom-nav-link-active'
            >
              <i className='material-icons bottom-nav-icon'>dashboard</i>
              <span className='bottom-nav-text'>Dashboard</span>
            </NavLink>
            {/* <NavLink
              to='/alerts'
              exact
              className='bottom-nav-link'
              activeClassName='bottom-nav-link-active'
            >
              <i className='material-icons bottom-nav-icon'>person</i>
              <span className='bottom-nav-text'>Profile</span>
            </NavLink> */}
            <NavLink
              to='/alerts'
              exact
              className='bottom-nav-link'
              activeClassName='bottom-nav-link-active'
            >
              <i className='material-icons bottom-nav-icon'>alarm</i>
              <span className='bottom-nav-text'>Alerts</span>
            </NavLink>
            <NavLink
              to='/plugins'
              exact
              className='bottom-nav-link'
              activeClassName='bottom-nav-link-active'
            >
              <i className='material-icons bottom-nav-icon'>extension</i>
              <span className='bottom-nav-text'>Plugins</span>
            </NavLink>
            <a
              onClick={this.onLogout}
              className='bottom-nav-link pointer'
              href='#/'
            >
              <i className='material-icons bottom-nav-icon'>
                power_settings_new
              </i>
              <span className='bottom-nav-text'>Logout</span>
            </a>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu);
