// Coloque aqui suas actions

export const GET_USER = 'GET_USER';

export const getUser = (userEmail) => ({
  type: GET_USER,
  payload: userEmail,
});
