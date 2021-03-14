import React from 'react';
import { OrderLevel } from '../../types/orderbookTypes';
import { OrderTable } from './components/OrderTable/OrderTable';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const ProductFeedPageTemplate: React.FC<{ asks?: OrderLevel[], bids?: OrderLevel[] }> = ({ asks, bids }) => {
    const isMobile = useMediaQuery('(max-width:812px)');

    return (
        <Container maxWidth={!isMobile && "sm"}>
            <h1>Orderbook</h1>
            <Box display="flex" flexDirection={isMobile ? "column" : "row"}>
                <Box width={isMobile ? "100%" : "50%"} p={isMobile ? 0 : 1}>
                    <h3>Asks</h3>
                    {
                        asks && <OrderTable orders={asks} />
                    }

                </Box>
                <Box width={isMobile ? "100%" : "50%"} p={isMobile ? 0 : 1}>
                    <h3>Bids</h3>
                    {
                        bids && <OrderTable orders={bids} />
                    }
                </Box>

            </Box>
        </Container>
    );
}