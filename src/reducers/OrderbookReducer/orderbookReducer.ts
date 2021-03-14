import { OrderbookOrders, OrderLevel, OrderbookOrdersAPI, OrderLevelAPI } from '../../types/orderbookTypes';

type Action =
    | { type: 'updateOrders'; payload: OrderbookOrdersAPI };

export function orderbookReducer(state: OrderbookOrders, action: Action): OrderbookOrders {
    switch (action.type) {
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

function addTotals(orders: OrderLevel[]): OrderLevel[] {
    return orders.map((order, idx) => {
        return {
            ...order,
            total: orders.slice(idx, orders.length).reduce((a, b) => a + b.size, 0)
        }
    });
}


// function sortOrdersByPriceDescending(orders: OrderLevel) {
//     return Object.fromEntries(Object.entries(orders).sort((a, b) => Number(a[0])));
// }

// function clearEmptyOrders(orders: OrderLevel) {
//     return Object.keys(orders).reduce((acc, cv) => {
//         const currentOrder = Number(cv);
//         if (orders[currentOrder] !== 0) {
//             acc[currentOrder] = orders[currentOrder];
//         }
//         return acc;
//     }, {} as OrderLevel);
// }



// function sortOrdersPriceDescending(orders: OrderLevel) {
//     Object.keys(orders).sort
// }

// export function mapOrderEntries(orders: OrderLevelAPI): OrderLevel[] {
//     Object.fromEntries(orders)
// }

// function mapOrders(orders: OrderLevelAPI): OrderLevel[] {
//     const ordersDescendingOrderByPrice = orders.reverse();
//     return ordersDescendingOrderByPrice.map((order, idx) => {
//         if (order[1] === 0) {
//             return undefined;
//         }
//         return {
//             price: order[0],
//             size: order[1],
//             total: calculateTotal(ordersDescendingOrderByPrice, idx),
//         };
//     }).filter((order): order is OrderLevel => !!order);
// }

function calculateTotal(orders: OrderLevelAPI, currentIndex: number): number {
    return orders.slice(currentIndex, orders.length).reduce((a, b) => a + b[1], 0);
}