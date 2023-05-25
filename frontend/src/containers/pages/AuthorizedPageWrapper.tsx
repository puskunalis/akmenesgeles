import { useSelector } from "react-redux";
import { selectUser } from "../../state/users/UserSlice";
import UnauthorizedPage from "./UnauthorizedPage";

export function AuthorizedPageWrapper(props: React.PropsWithChildren) {
  const { children } = props;
  const loggedInUser = useSelector(selectUser);
  
  return(
    <>
      {
        !loggedInUser ?
        <UnauthorizedPage/> :
        children
      }
    </>);
}