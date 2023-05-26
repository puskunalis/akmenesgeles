import * as React from 'react';
import { UserRole } from '../../../types';
import { useSelector } from 'react-redux';
import { fetchUser, selectUser, selectUserStatus } from '../../../state/users/UserSlice';
import Profile from './Profile';
import { store } from '../../../state/store';
import { AsyncStatus } from '../../../state/AsyncStatus';
import { PurchaseHistory } from './PurchaseHistory';
import { Grid } from '@chakra-ui/react';
import { fetchOrdersByUserId, selectUserOrders } from '../../../state/order/OrdersSlice';


export default function UserPage() {
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const orders = useSelector(selectUserOrders);

    React.useEffect(() => {
        if (userStatus === AsyncStatus.IDLE){
            store.dispatch(fetchUser());
        }
    }, []);

    React.useEffect(() => {
      if (user && user.role !== UserRole.ADMIN){
          store.dispatch(fetchOrdersByUserId(user.id));
      }
    }, [user]);

  return (
    <Grid templateColumns="1fr 1fr" gap={4} justifyItems="center">
        <Profile />
        {user?.role !== UserRole.ADMIN  && <PurchaseHistory orders={orders} />}
    </Grid>
  );
};