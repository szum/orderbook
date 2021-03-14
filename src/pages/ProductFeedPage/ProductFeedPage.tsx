import React from 'react';

import { useWebSocketContext } from '../../components/WebSocketContext/WebSocketContext';
import { ProductFeedPageTemplate } from './ProductFeedPageTemplate';

export const ProductFeedPage: React.FC = (() => {
    const { asks } = useWebSocketContext();

    return (
        <ProductFeedPageTemplate
            asks={asks}
        />
    )
});