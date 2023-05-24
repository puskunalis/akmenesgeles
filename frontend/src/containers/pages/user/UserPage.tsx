import * as React from 'react';

import { User, UserRole } from '../../../types';
import { useSelector } from 'react-redux';
import { fetchUser, selectUser, selectUserStatus } from '../../../state/users/UserSlice';
import { Profile } from './Profile';
import { store } from '../../../state/store';
import { AsyncStatus } from '../../../state/AsyncStatus';
import { PurchaseHistory } from './PurchaseHistory';
import { Flex, Grid } from '@chakra-ui/react';
import { fetchOrdersByUserId, selectUserOrders } from '../../../state/order/OrdersSlice';
// import './UserPage.scss';


interface userPageProps {
}

export function UserPage() {
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const orders = useSelector(selectUserOrders)

    React.useEffect(() => {
        if (userStatus === AsyncStatus.IDLE){
            store.dispatch(fetchUser());
        }
    }, [])

    React.useEffect(() => {
      if (user){
          store.dispatch(fetchOrdersByUserId(user.id));
      }
    }, [user])

  return (
    <Grid templateColumns="1fr 1fr" gap={4} justifyItems="center">
        <Profile />
        <PurchaseHistory orders={orders} />
    </Grid>
  );
};