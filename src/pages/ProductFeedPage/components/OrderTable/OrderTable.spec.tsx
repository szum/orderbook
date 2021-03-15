import React from 'react';
import { OrderTable } from './OrderTable';
import { render } from '@testing-library/react';

const mockOrders = [
    { price: 6000.4, size: 1500, total: 254893489 },
    { price: 65828, size: 15000, total: 9754270 },
    { price: 65564, size: 31212, total: 9739270 },
    { price: 63714, size: 10000, total: 9708058 },
    { price: 62204, size: 4000, total: 9698058 },
    { price: 62435, size: 4000, total: 9698058 }
];

it('should render a table with the top 5 orders', () => {
    const { container, getByText, queryByText } = render(
        <OrderTable orders={mockOrders} />
    );
    expect(container).toBeInTheDocument();
    expect(getByText(mockOrders[0].price)).toBeInTheDocument();
    expect(getByText(mockOrders[0].size)).toBeInTheDocument();
    expect(getByText(mockOrders[0].total)).toBeInTheDocument();
    expect(queryByText(mockOrders[5].price)).not.toBeInTheDocument();
})