import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    alerts.length > 0 && (
      <div className='form-container'>
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className='fas fa-info-circle'></i> {alert.msg}
          </div>
        ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert.alerts
});

export default connect(mapStateToProps, null)(Alert);
