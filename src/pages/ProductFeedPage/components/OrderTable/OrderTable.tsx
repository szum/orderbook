import React from 'react';
import { OrderLevel } from '../../../../types/orderbookTypes';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const OrderbookCutoff = 5;

export const OrderTable: React.FC<{ orders: OrderLevel[] }> = ({ orders }) => {
    const classes = useStyles();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center" width="33%">
                        Price
                    </StyledTableCell>
                    <StyledTableCell align="center" width="33%">
                        Size
                    </StyledTableCell>
                    <StyledTableCell align="center" width="33%">
                        Total
                    </StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    orders.slice(0, OrderbookCutoff).map((order, idx) => {
                        return (<TableRow key={idx}>
                            <StyledTableCell align="center">{order.price}</StyledTableCell>
                            <StyledTableCell align="center">{order.size}</StyledTableCell>
                            <StyledTableCell align="center">{order.total}</StyledTableCell>
                        </TableRow>);
                    })
                }
            </TableBody>
        </Table>
    )
}