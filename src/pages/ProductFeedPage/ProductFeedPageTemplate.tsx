import React from 'react';
import { OrderLevel } from '../../types/orderbookTypes';

export const ProductFeedPageTemplate: React.FC<{ asks?: OrderLevel[] }> = ({ asks }) => {
    if (asks) {
        return (<p>{asks.map((ask: OrderLevel) => {
            return (<p>Price: {ask.price} Size: {ask.size} Total: {ask.total}</p>);
        })}</p>);

    }
    return null;
}