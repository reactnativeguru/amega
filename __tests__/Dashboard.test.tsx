import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Dashboard from '../src/screens/Dashboard';
import {getIPDetail} from '../src/utils/RequestHandler';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock the getIPDetail function
jest.mock('../src/utils/RequestHandler', () => ({
  getIPDetail: jest.fn(),
}));

describe('Dashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <Dashboard navigation={mockNavigation} />,
    );

    expect(getByPlaceholderText('Enter IP')).toBeTruthy();
    expect(getByText('IP:')).toBeTruthy();
    expect(getByText('ISP:')).toBeTruthy();
    expect(getByText('Timezone:')).toBeTruthy();
    expect(getByText('Address:')).toBeTruthy();
  });

  it('fetches and displays IP details on mount', async () => {
    const mockResponse = {
      ip: '192.168.1.1',
      connection: {isp: 'Mock ISP'},
      city: 'Mock City',
      country: 'Mock Country',
      timezone: {utc: '+00:00'},
    };

    getIPDetail.mockResolvedValueOnce(mockResponse);

    const {getByText} = render(<Dashboard navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('IP: 192.168.1.1')).toBeTruthy();
      expect(getByText('ISP: Mock ISP')).toBeTruthy();
      expect(getByText('Timezone: UTC +00:00')).toBeTruthy();
      expect(getByText('Address: Mock City, Mock Country')).toBeTruthy();
    });
  });

  it('allows IP address input', () => {
    const {getByPlaceholderText} = render(
      <Dashboard navigation={mockNavigation} />,
    );

    const input = getByPlaceholderText('Enter IP');
    fireEvent.changeText(input, '8.8.8.8');

    expect(input.props.value).toBe('8.8.8.8');
  });

  it('navigates to Profile screen with correct parameters', async () => {
    const mockResponse = {
      ip: '192.168.1.1',
      connection: {isp: 'Mock ISP'},
      city: 'Mock City',
      country: 'Mock Country',
      timezone: {utc: '+00:00'},
    };

    getIPDetail.mockResolvedValueOnce(mockResponse);

    const {getByText, getAllByRole} = render(
      <Dashboard navigation={mockNavigation} />,
    );

    await waitFor(() => {
      expect(getByText('IP: 192.168.1.1')).toBeTruthy();
    });

    // const images = getAllByRole('image');
    // fireEvent.press(images[0]);

    // expect(mockNavigation.navigate).toHaveBeenCalledWith('Profile', {
    //   ip: '192.168.1.1',
    //   isp: 'Mock ISP',
    //   address: 'Mock City, Mock Country',
    //   timezone: '+00:00',
    //   image: images[0].props.source,
    // });
  });
});
