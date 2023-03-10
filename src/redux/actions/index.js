import getCoin from '../../services/coinAPI';

export const GET_USER = 'GET_USER';

export const getUser = (userEmail) => ({
  type: GET_USER,
  payload: userEmail,
});

export const REQUEST_COIN = 'REQUEST_COIN';
export const REQUEST_COIN_SUCCESS = 'REQUEST_COIN_SUCCESS';
export const REQUEST_COIN_ERROR = 'REQUEST_COIN_ERROR';

export const requestCoin = () => ({
  type: REQUEST_COIN,
});

export const requestCoinSuccess = (coins) => ({
  type: REQUEST_COIN_SUCCESS,
  payload: coins,
});

export const requestCoinError = (error) => ({
  type: REQUEST_COIN_ERROR,
  error,
});

export const fetchCoins = () => async (dispatch) => {
  dispatch(requestCoin());
  try {
    const response = await getCoin();
    dispatch(requestCoinSuccess(response));
  } catch (error) {
    dispatch(requestCoinError(error));
  }
};

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const WITHDRAW_EXPENSE = 'WITHDRAW_EXPENSE';
export const withdrawExpense = (newExpense) => ({
  type: WITHDRAW_EXPENSE,
  newExpense,
});

export const TARGET_ID = 'TARGET_ID';
export const targetID = (id) => ({
  type: TARGET_ID,
  id,
});

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});

export const TARGET_EXPENSE = 'TARGET_EXPENSE';
export const targetExpense = (payload) => ({
  type: TARGET_EXPENSE,
  payload,
});
