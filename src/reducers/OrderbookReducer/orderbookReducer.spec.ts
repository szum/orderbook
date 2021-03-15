import { orderbookReducer, Action } from '../OrderbookReducer/orderbookReducer';
import { OrderbookOrdersAPI } from '../../types/orderbookTypes';

const initialState = {
    asks: [],
    bids: [],
    feed: undefined,
    numLevels: undefined,
    product_id: undefined,
};

const mockSnapshotPayloadAPI: OrderbookOrdersAPI = JSON.parse(`{"numLevels":25,"feed":"book_ui_1_snapshot","bids":[[60673.0,78000.0],[60672.5,10731.0],[60660.0,15000.0],[60659.5,22673.0],[60659.0,4045.0]],"asks":[[60696.5,26129.0],[60697.0,3420.0],[60707.0,2270.0],[60711.5,2844.0],[60712.0, 9147.0]],"product_id":"PI_XBTUSD"}`);

describe('#updateSnapshot', () => {
    it('should update the initial snapshot with the price, size', () => {
        const action = { type: "updateSnapshot", payload: mockSnapshotPayloadAPI } as Action;

        const state = orderbookReducer(initialState, action);
        expect(state.asks.map((a) => a.price)).toEqual([60712.0, 60711.5, 60707.0, 60697.0, 60696.5])
        expect(state.asks.map((a) => a.size)).toEqual([9147.0, 2844.0, 2270.0, 3420.0, 26129.0]);
        expect(state.bids.map((b) => b.price)).toEqual([60673.0, 60672.5, 60660.0, 60659.5, 60659.0]);
        expect(state.bids.map((b) => b.size)).toEqual([78000.0, 10731.0, 15000.0, 22673.0, 4045.0]);
    });

    it('should add totals to the orders', () => {
        const action = { type: "updateSnapshot", payload: mockSnapshotPayloadAPI } as Action;

        const state = orderbookReducer(initialState, action);

        expect(state.asks[0].total).toEqual(state.asks[1].total + state.asks[0].size);
        expect(state.asks.map((a) => a.total)).toEqual([43810, 17681, 14261, 11991, 9147])
        expect(state.bids.map((b) => b.total)).toEqual([130449, 52449, 41718, 26718, 4045]);
    });

})


describe('#updateOrders', () => {
    describe('when a new entry level is added', () => {
        it('should add the order sorted descending by price', () => {
            let state;
            const snapShotAction = { type: "updateSnapshot", payload: mockSnapshotPayloadAPI } as Action;
            state = orderbookReducer(initialState, snapShotAction);

            const mockDeltaPayloadAPI: OrderbookOrdersAPI = JSON.parse(`{"numLevels":25,"feed":"book_ui_1","asks":[[70000,100]],"product_id":"PI_XBTUSD"}`);
            const deltaAction = { type: "updateOrders", payload: mockDeltaPayloadAPI } as Action;
            state = orderbookReducer(state, deltaAction);

            expect(state.asks.map((a) => a.price)).toEqual([70000, 60712.0, 60711.5, 60707.0, 60697.0, 60696.5])
        });
    });

    describe('when an existing entry level is added', () => {
        it('should update the size of the price level', () => {
            let state;
            const snapShotAction = { type: "updateSnapshot", payload: mockSnapshotPayloadAPI } as Action;
            state = orderbookReducer(initialState, snapShotAction);

            expect(state.asks.map((a) => a.size)).toEqual([9147.0, 2844.0, 2270.0, 3420.0, 26129.0]);

            const mockDeltaPayloadAPI: OrderbookOrdersAPI = JSON.parse(`{"numLevels":25,"feed":"book_ui_1","asks":[[60712.0,100]],"product_id":"PI_XBTUSD"}`);
            const deltaAction = { type: "updateOrders", payload: mockDeltaPayloadAPI } as Action;
            state = orderbookReducer(state, deltaAction);

            expect(state.asks[0].size).toEqual(100);
        });
    })
    // it('should hydrate the orders size and price using the payload', () => {
    //     const deltaAction = { type: "updateOrders", payload: mockDeltaPayloadAPI } as Action;
    //     state = orderbookReducer(state, deltaAction);

    //     expect(state.asks.map((a) => a.price)).toEqual([60712.0, 60711.5, 60707.0, 60697.0, 60696.5])
    //     expect(state.asks.map((a) => a.size)).toEqual([9147.0, 2844.0, 2270.0, 3420.0, 26129.0]);
    //     expect(state.bids.map((b) => b.price)).toEqual([60659.0, 60659.5, 60660.0, 60672.5]);
    //     expect(state.bids.map((b) => b.size)).toEqual([4045.0, 22673.0, 15000.0, 500, 78000.0]);
    // });
})
