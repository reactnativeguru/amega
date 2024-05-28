import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Profile from '../src/screens/Profile';
import {getIPDetail} from '../src/utils/RequestHandler';

jest.mock('../src/utils/RequestHandler', () => ({
  getIPDetail: jest.fn(),
}));

const mockRoute = {
  params: {
    ip: '192.168.1.1',
    isp: 'Mock ISP',
    address: 'Mock City, Mock Country',
    timezone: '+00:00',
    image: {uri: 'mock-image-uri'},
  },
};

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with route params', () => {
    const {getByText} = render(<Profile route={mockRoute} />);

    expect(getByText('IP: 192.168.1.1')).toBeTruthy();
    expect(getByText('ISP: Mock ISP')).toBeTruthy();
    expect(getByText('Timezone: UTC +00:00')).toBeTruthy();
    expect(getByText('Address: Mock City, Mock Country')).toBeTruthy();
  });

  it('renders correctly with fetched IP details', async () => {
    const mockResponse = {
      ip: '8.8.8.8',
      connection: {isp: 'Fetched ISP'},
      city: 'Fetched City',
      country: 'Fetched Country',
      timezone: {utc: '+01:00'},
    };

    getIPDetail.mockResolvedValueOnce(mockResponse);

    const {getByText} = render(<Profile route={{params: {}}} />);

    await waitFor(() => {
      expect(getByText('IP: 8.8.8.8')).toBeTruthy();
      expect(getByText('ISP: Fetched ISP')).toBeTruthy();
      expect(getByText('Timezone: UTC +01:00')).toBeTruthy();
      expect(getByText('Address: Fetched City, Fetched Country')).toBeTruthy();
    });
  });

  it('handles API call failure gracefully', async () => {
    getIPDetail.mockRejectedValueOnce(new Error('API call failed'));

    const {getByText} = render(<Profile route={{params: {}}} />);

    await waitFor(() => {
      expect(getByText('IP:')).toBeTruthy();
      expect(getByText('ISP:')).toBeTruthy();
      expect(getByText('Timezone: UTC')).toBeTruthy();
      expect(getByText('Address:')).toBeTruthy();
    });
  });
});
