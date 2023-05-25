import { Spinner } from "@chakra-ui/react";
import "./SpinnerWrapper.scss";

export default function SpinnerWrapper() {
  return (
    <div className='spinner-container'>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    </div>
  );
}