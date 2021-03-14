export interface OrderbookOrders {
    asks?: OrderLevel[];
    bids?: OrderLevel[];
    feed?: string;
    numLevels?: number;
    product_id?: string;
}

export type OrderLevel = {
    price: number;
    size: number;
    total: number;
}

export interface OrderbookOrdersAPI {
    asks?: OrderLevelAPI;
    bids?: OrderLevelAPI;
    feed?: string;
    numLevels?: number;
    product_id?: string;
}

export type OrderLevelAPI = Array<[number, number]>;