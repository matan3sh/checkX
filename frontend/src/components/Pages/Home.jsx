import React from 'react';
import { connect } from 'react-redux';
import { loadChecklists } from '../../store/checklist/checklistActions';
import { loadUser } from '../../store/auth/authActions';

class Home extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <>
        <h1 className='dashboard-title'>My Dashboard</h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  checklists: state.checklistApp.checklists
});

const mapDispatchToProps = {
  loadChecklists,
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
