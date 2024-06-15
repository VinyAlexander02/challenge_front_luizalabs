import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home'
import StarRating from '../../assets/starRating';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        image: 'product1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        image: 'product2.jpg',
        rating: { rate: 4.0, count: 5 },
      },
    ]),
  })
);

const mockVitrines = [
  {
    id: 'vitrine1',
    title: 'Vitrine 1',
    products: '1,2',
  },
];

beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockVitrines));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Home', () => {
  test('renders vitrines from localStorage and products from API', async () => {
    render(<Home />);

    expect(screen.getByText('Vitrine 1')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('renders product details correctly', async () => {
    render(<Home />);

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      expect(product1).toBeInTheDocument();
      expect(product1.closest('.product').querySelector('img').src).toContain('product1.jpg');
      expect(screen.getByText('R$ 100')).toBeInTheDocument();
      expect(screen.getByText('4.5 (10)')).toBeInTheDocument();
      expect(screen.getByText('(10% de desconto no pix)')).toBeInTheDocument();
    });
  });

  test('handles scroll buttons', async () => {
    render(<Home />);

    await waitFor(() => {
      const content = screen.getByText('Product 1').closest('.content');
      expect(content.scrollLeft).toBe(0);

      const leftButton = screen.getAllByText('❮')[0];
      const rightButton = screen.getAllByText('❯')[0];

      fireEvent.click(rightButton);
      expect(content.scrollLeft).toBeGreaterThan(0);

      fireEvent.click(leftButton);
      expect(content.scrollLeft).toBeGreaterThan(0);
    });
  });
});
