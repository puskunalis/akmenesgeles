import * as React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../state/users/UserSlice";
import { UserRole } from "../../../types";
import { AdminItems } from "./AdminItemManagement";
import { AdminOrders } from "./AdminOrderManagement";
import { Box, Flex, Switch, Text} from "@chakra-ui/react";

export function AdminPage() {
  const user = useSelector(selectUser);
  const [showItems, setShowItems] = React.useState(true);
  const handleSwitchChange = () => {
    setShowItems(!showItems);
  };

    return (
      <>
        {user?.role === UserRole.ADMIN ? (
          <>
            <Flex justifyContent="center" alignItems="center" fontSize="20pt" paddingBottom={"12px"}>
              <Text display="inline-block" paddingRight="12px" fontWeight="bold" > Užsakymai </Text>
              <Switch isChecked={showItems} onChange={handleSwitchChange} colorScheme="teal" size="lg"/>
              <Text display="inline-block" paddingLeft="12px"  fontWeight="bold" > Prekės </Text>
            </Flex>
            
            {showItems ? <AdminItems /> : <AdminOrders />}
          </>
          )
          : <div>Prieiga draudžiama</div>
          }
      </>

    );
}
