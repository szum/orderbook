import React from 'react';
import { WebSocketContextProvider } from './WebSocketContext';
import { render } from '@testing-library/react';

const renderProvider = render(
    <WebSocketContextProvider>
        <div />
    </WebSocketContextProvider>
);

it('should render provider without errors', () => {
    const { container } = render(
        <WebSocketContextProvider>
            <div />
        </WebSocketContextProvider>
    );
    expect(container).toBeInTheDocument();
})