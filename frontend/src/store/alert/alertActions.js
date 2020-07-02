import utilService from '../../services/utilService';

export function loadAlert(msg, type, timeout = 5000) {
  const id = utilService.makeId();
  return (dispatch) => {
    dispatch({ type: 'SET_ALERT', payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
  };
}
