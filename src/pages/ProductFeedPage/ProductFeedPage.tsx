import React from 'react';

import { useWebSocketContext, OrderLevels } from '../../components/WebSocketContext/WebSocketContext';

export const ProductFeedPage: React.FC = (() => {
    const { orders } = useWebSocketContext();

    if (orders) {

        return (<p>{orders.asks.map((ask: OrderLevels) => {
            return (<p>{ask[0]} {ask[1]}</p>);
        })}</p>);

    }
    return <p>Loading</p>;

});