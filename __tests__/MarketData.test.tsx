import React from 'react';
import {render} from '@testing-library/react-native';
import MarketData from '../src/screens/MarketData';
import WebSocket from 'isomorphic-ws';

jest.mock('isomorphic-ws', () => {
  return jest.fn().mockImplementation(() => {
    return {
      onopen: jest.fn(),
      onclose: jest.fn(),
      onmessage: jest.fn(),
      send: jest.fn(),
    };
  });
});

describe('MarketData', () => {
  let mockWebSocket;

  beforeEach(() => {
    mockWebSocket = new WebSocket();
  });

  it('renders loading indicator initially', () => {
    const {getByTestId} = render(<MarketData />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders chart and trade data after receiving WebSocket messages', async () => {
    const {getByText, getByTestId} = render(<MarketData />);

    mockWebSocket.onopen();
    const mockMessage = {
      data: JSON.stringify({
        p: '50000.00',
        q: '0.1',
        s: 'BTCUSDT',
        T: new Date().getTime(),
      }),
    };
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);
    mockWebSocket.onmessage(mockMessage);

    setTimeout(() => {
      expect(getByTestId('line-chart')).toBeTruthy();
      expect(getByText('BTCUSDT')).toBeTruthy();
      expect(getByText('50000.00')).toBeTruthy();
      expect(getByText('0.10')).toBeTruthy();
    }, 500);
  });
});
