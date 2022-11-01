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
