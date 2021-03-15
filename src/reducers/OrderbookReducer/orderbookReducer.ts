import { CardActions } from '@material-ui/core';
import { OrderbookOrders, OrderLevel, OrderbookOrdersAPI, OrderLevelAPI } from '../../types/orderbookTypes';

export type Action =
    | { type: 'updateOrders'; payload: OrderbookOrdersAPI }
    | { type: 'updateSnapshot'; payload: OrderbookOrdersAPI };;

export function orderbookReducer(state: OrderbookOrders, action: Action): OrderbookOrders {
    switch (action.type) {
        case 'updateSnapshot':
            const asks = addTotals(action.payload.asks?.reverse().map((order) => {
                return {
                    price: order[0],
                    size: order[1]
                }
            }));

            const bids = addTotals(action.payload.bids?.map((order) => {
                return {
                    price: order[0],
                    size: order[1]
                }
            }));

            return { ...state, ...action.payload, asks: asks ? [...asks] : state.asks, bids: bids ? [...bids] : state.bids };
        case 'updateOrders':

            let updatedAsks;
            let updatedBids;

            if (action.payload?.asks) {
                updatedAsks = hydrateOrders([...state.asks], action.payload?.asks);
            }

            if (action.payload?.bids) {
                updatedBids = hydrateOrders([...state.bids], action.payload?.bids);
            }

            return { ...state, asks: updatedAsks ? updatedAsks : state.asks, bids: updatedBids ? updatedBids : state.bids };

        default:
            throw new Error();
    }
}

function hydrateOrders(currentOrders: OrderLevel[], newOrders: OrderLevelAPI): OrderLevel[] | void {
    newOrders.forEach((order) => {
        const newOrderPrice = order[0];
        const newOrderSize = order[1];
        const currentOrder = currentOrders.find((o) => o.price === newOrderPrice);
        if (currentOrder) {
            currentOrder.size = newOrderSize;
            return;
        }
        currentOrders.push({
            price: newOrderPrice,
            size: newOrderSize
        });
    });
    return addTotals(currentOrders.filter((order) => order.size > 0).sort((a, b) => b.price - a.price));
}

function addTotals(orders?: OrderLevel[]): OrderLevel[] | undefined {
    if (!orders) {
        return orders;
    }
    return orders.map((order, idx) => {
        return {
            ...order,
            total: orders.slice(idx, orders.length).reduce((a, b) => a + b.size, 0)
        }
    });
}
