import {
  REQUEST_COIN,
  REQUEST_COIN_SUCCESS,
  REQUEST_COIN_ERROR,
  SAVE_EXPENSE,
  WITHDRAW_EXPENSE,
} from '../actions/index';

const initialState = {
  error: '',
  isLoading: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action) => {
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
  default:
    return state;
  }
};

export default wallet;
