import React, { useContext, useEffect, useRef, useReducer } from 'react';
import { orderbookReducer } from '../../reducers/OrderbookReducer/orderbookReducer';
import { OrderbookOrders } from '../../types/orderbookTypes';

export const InitState: OrderbookOrders = {
    asks: [],
    bids: [],
    feed: undefined,
    numLevels: undefined,
    product_id: undefined,
}

enum WebSocketFeedName {
    BookUi1 = 'book_ui_1'
}

export const WebSocketContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(orderbookReducer, InitState);
    const ws = useRef<WebSocket>();

    const connectWebsocket = () => {
        // let connectInterval: NodeJS.Timeout;

        ws.current = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
        ws.current.onopen = () => {
            console.log('connected');
            ws.current?.send(JSON.stringify({ "event": "subscribe", "feed": "book_ui_1", "product_ids": ["PI_XBTUSD"] }));
            // clearTimeout(connectInterval);
        }

        ws.current.onmessage = evt => {
            const messageData = JSON.parse(evt.data);

            if (messageData?.feed && messageData?.feed.includes(WebSocketFeedName.BookUi1)) {
                dispatch({ type: 'updateOrders', payload: JSON.parse(evt.data) });
            }
        }

        ws.current.onclose = () => {
            console.log('closed');
            // connectInterval = setTimeout(checkWebSocketConnection, 10000);
        }

        ws.current.onerror = err => {
            console.error(
                "Error: ",
                err,
                "Closing socket"
            );
            ws.current?.close();
        };

    }

    const checkWebSocketConnection = () => {
        if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
            connectWebsocket();
        }
    }

    useEffect(() => {
        checkWebSocketConnection();
    });

    return (
        <WebSocketContext.Provider value={{ ...state }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const WebSocketContext = React.createContext(InitState);

export const useWebSocketContext = () => useContext(WebSocketContext);