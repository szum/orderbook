import React from 'react';
import { OrderLevel } from '../../types/orderbookTypes';
import { OrderTable } from './components/OrderTable/OrderTable';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export const ProductFeedPageTemplate: React.FC<{ asks?: OrderLevel[], bids?: OrderLevel[] }> = ({ asks, bids }) => {

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="row">
                <Box width="50%" p={1}>
                    <h1>Asks</h1>
                    {
                        asks && <OrderTable orders={asks} />
                    }

                </Box>
                <Box width="50%" p={1}>
                    <h1>Bids</h1>
                    {
                        bids && <OrderTable orders={bids} />
                    }
                </Box>

            </Box>
        </Container>
    );
}