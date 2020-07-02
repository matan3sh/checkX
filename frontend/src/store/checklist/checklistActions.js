import checklistService from '../../services/checklistService';

export function loadChecklists() {
  return (dispatch) => {
    checklistService
      .query()
      .then((checklists) =>
        dispatch({ type: 'SET_CHECKLISTS', payload: checklists })
      );
  };
}
