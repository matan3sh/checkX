const initialState = {
  checklists: []
};

export default function checklistReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CHECKLIST':
      return {
        ...state,
        checklists: action.payload
      };
    default:
      return state;
  }
}
