import * as React from 'react';

import { User, UserRole } from '../../../types';
import { useSelector } from 'react-redux';
import { fetchUser, selectUser, selectUserStatus } from '../../../state/users/UserSlice';
import { Profile } from './Profile';
import { store } from '../../../state/store';
import { AsyncStatus } from '../../../state/AsyncStatus';
import { PurchaseHistory } from './PurchaseHistory';
import { Flex, Grid } from '@chakra-ui/react';
// import './UserPage.scss';


interface userPageProps {
}

export function UserPage() {
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);

    React.useEffect(() => {
        if (userStatus === AsyncStatus.IDLE){
            store.dispatch(fetchUser());
        }
    }, [])

  return (
    <Grid templateColumns="1fr 1fr" gap={4} justifyItems="center">
        <Profile />
        <PurchaseHistory orders={[]} />
    </Grid>
  );
};