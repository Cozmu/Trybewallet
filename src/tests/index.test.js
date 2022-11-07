import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { legacy_createStore as createStore } from 'redux';
import App from '../App';
import { renderWithRouterAndRedux, renderWithRedux, renderWithRouter } from './helpers/renderWith';
import rootReducer from '../redux/reducers/index';
import Wallet from '../pages/Wallet';

describe('REQUISITOS DE TESTES', () => {
  it('Verificar se há uma área de login com inputs de senha, email e botão de logar na página inicial', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByLabelText('E-mail:')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('Verifique se ao preencher os campos de login e apertar no botão e redirecionado para rota \'/carteira\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText('E-mail:');
    const senha = screen.getByLabelText('Senha:');
    const btn = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(email, 'test@test.com');
    userEvent.type(senha, '123123');
    userEvent.click(btn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });

  it('Verifique se o estado global tem as informações corretas de email apos fazer o login', () => {
    const initialState = {
      user: {
        email: 'usuario@test.com',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    expect(screen.getByText('usuario@test.com')).toBeInTheDocument();
  });

  it('Verifique se ao preencher os campos e apertar no botao \'/Adicionar despesas\' uma despesa e adicionada na tabela', () => {
    const initialState = {
      user: {
        email: '',
      },
      wallet: {
        error: '',
        isLoading: false,
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '20',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'coisas',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.1565',
                low: '5.0469',
                varBid: '0.0957',
                pctChange: '1.89',
                bid: '5.151',
                ask: '5.1518',
                timestamp: '1667850319',
                create_date: '2022-11-07 16:45:19',
              },
            },
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const valor = screen.getByLabelText(/valor:/i);
    const descricao = screen.getByLabelText(/descrição:/i);
    const btn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valor, '20');
    userEvent.type(descricao, 'coisas');
    userEvent.click(btn);
    expect(screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument();
    expect(screen.getByText(/dólar americano\/real brasileiro/i)).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /coisas/i })).toBeInTheDocument();
  });

  it('Verificar se a tabela possui os valores que estão que estão no estado global', () => {
    const initialState = {
      user: {
        email: '',
      },
      wallet: {
        error: '',
        isLoading: false,
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '20',
            currency: 'USD',
            method: 'Cartão de crédito',
            tag: 'Lazer',
            description: 'Alguma coisa',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.1565',
                low: '5.0469',
                varBid: '0.0957',
                pctChange: '1.89',
                bid: '5.151',
                ask: '5.1518',
                timestamp: '1667850319',
                create_date: '2022-11-07 16:45:19',
              },
            },
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    expect(screen.getByRole('cell', { name: /Alguma coisa/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument();
    expect(screen.getByText(/dólar americano\/real brasileiro/i)).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Lazer/i })).toBeInTheDocument();
  });
});
