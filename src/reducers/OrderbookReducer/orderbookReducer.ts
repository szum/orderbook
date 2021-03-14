import { OrderbookOrders, OrderLevel, OrderbookOrdersAPI, OrderLevelAPI } from '../../types/orderbookTypes';

type Action =
    | { type: 'updateOrders'; payload: OrderbookOrdersAPI };

export function orderbookReducer(state: OrderbookOrders, action: Action): OrderbookOrders {
    switch (action.type) {
        case 'updateOrders':
            let asks;
            let bids;

            if (action.payload.asks) {
                // TODO: filter in mapper
                asks = mapOrders([...action.payload.asks]);
            }

            if (action.payload.bids) {
                // TODO: filter in mapper
                bids = mapOrders([...action.payload.bids]);
            }
            return { ...state, asks, bids }
        default:
            throw new Error();
    }
}

function mapOrders(orders: OrderLevelAPI): OrderLevel[] {
    const ordersDescendingOrderByPrice = orders.reverse();
    return ordersDescendingOrderByPrice.map((order, idx) => {
        if (order[1] === 0) {
            return undefined;
        }
        return {
            price: order[0],
            size: order[1],
            total: calculateTotal(ordersDescendingOrderByPrice, idx),
        };
    }).filter((order): order is OrderLevel => !!order);
}

function calculateTotal(orders: OrderLevelAPI, currentIndex: number): number {
    return orders.slice(currentIndex, orders.length).reduce((a, b) => a + b[1], 0);
}