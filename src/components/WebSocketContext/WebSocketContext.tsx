import React, { useContext, useState, useEffect, useRef } from 'react';


export interface ContextProps {
    orders?: any;
}

type OrderPrice = number;
type OrderSize = number;

export interface OrderLevels {
    [index: number]: Array<[OrderPrice, OrderSize]>;
}

enum WebSocketFeedName {
    BookUi1 = 'book_ui_1_snapshot'
}

export interface OrderbookOrders {
    asks: OrderLevels;
    bids: OrderLevels;
    feed: string;
    numLevels: number;
    product_id: string;

}

export const InitState: ContextProps = {
    orders: undefined
}

export const WebSocketContextProvider: React.FC = ({ children }) => {
    const [orders, setOrders] = useState<OrderbookOrders>();
    const ws = useRef<WebSocket>();

    useEffect(() => {
        ws.current = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
        ws.current.onopen = () => {
            // on connecting, do nothing but log it to the console
            ws.current?.send(JSON.stringify({ "event": "subscribe", "feed": "book_ui_1", "product_ids": ["PI_XBTUSD"] }));
            console.log('connected');
        }

        ws.current.onmessage = evt => {
            // listen to data sent from the websocket server
            const messageData = JSON.parse(evt.data);

            if (messageData?.feed === WebSocketFeedName.BookUi1) {
                setOrders(JSON.parse(evt.data));
            }
        }

        ws.current.onclose = () => {
            console.log('disconnected')
        }

        ws.current.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err,
                "Closing socket"
            );
            ws.current?.close();
        };
    });

    useEffect(() => {
        if (!ws.current) return;
    }, [ws]);

    return (
        <WebSocketContext.Provider value={{ orders }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const WebSocketContext = React.createContext<ContextProps>(InitState);

export const useWebSocketContext = (): ContextProps => useContext<ContextProps>(WebSocketContext);