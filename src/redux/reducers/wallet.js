import {
  REQUEST_COIN,
  REQUEST_COIN_SUCCESS,
  REQUEST_COIN_ERROR,
  SAVE_EXPENSE,
  WITHDRAW_EXPENSE,
  TARGET_ID,
  TARGET_EXPENSE,
} from '../actions/index';

const initialState = {
  error: '',
  isLoading: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const newExpense = (exp, act) => exp.map((e) => {
  console.log(exp, act);
  if (e.id === act.id) {
    return {
      ...e,
      value: act.value,
      currency: act.currency,
      method: act.method,
      tag: act.tag,
      description: act.description,
    };
  }
  return e;
});

const wallet = (state = initialState, action) => {
  // const newExpense = (exp, act) => exp.map((e, i, array) => {
  //   if (e.id === act.id) {
  //     array.splice(act.id, 1, act);
  //     return e;
  //   }
  //   return e;
  // });

  switch (action.type) {
  case REQUEST_COIN:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_COIN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: Object.keys(action.payload).filter((e) => e !== 'USDT'),
    };
  case REQUEST_COIN_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case WITHDRAW_EXPENSE:
    return {
      ...state,
      expenses: action.newExpense,
    };
  case TARGET_ID:
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  case TARGET_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: newExpense(state.expenses, action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
