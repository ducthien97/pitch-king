import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  foul: {
    label: 'Foul',
    color: 'warning',
  },
  strike: {
    label: 'Strike',
    color: 'success'
  },
  hit: {
    label: 'Hit',
    color: 'error',
  },
  hitByPitch: {
    label: 'Hit By Pitch',
    color: 'error',
  },
  ball: {
    label: 'Ball',
    color: 'warning',
  }
};

const pitchTypeMap = {
  fsfb: {
    label: '4-Seam Fastball',
  },
  tsfb: {
    label: '2-Seam Fastball',
  },
  cvb: {
    label: 'Curveball',
  },  
  sld: {
    label: 'Slider',
  },
  chp: {
    label: 'Change-up',
  }
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Pitch Details" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Pitch Type
                </TableCell>
                <TableCell>
                  Hitter
                </TableCell>
                <TableCell sortDirection="desc">
                  Velocity (mph)
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {pitchTypeMap[order.pitchType].label}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {order.velocity}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status].color}>
                        {statusMap[order.status].label}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
