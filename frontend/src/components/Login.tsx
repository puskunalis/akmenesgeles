import * as React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "../auth-context";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: LoginProps) => {
  const { onClose, isOpen } = props;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      login(username, password);
      onCloseModal();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const [usernameError, setUsernameError] = React.useState<string | undefined>(undefined)
  const handleChangeUsername = (value: string) => {
    setUsername(value);
    if (value === '')
      setUsernameError("Vartotojo vardas negali būti tuščias");
    else
      setUsernameError("");
  }

  const [passwordError, setPasswordError] = React.useState<string | undefined>(undefined)
  const handleChangePassword = (value: string) => {
    setPassword(value);
    if (value === '')
      setPasswordError("Slaptažodis negali būti tuščias");
    else
      setPasswordError("");
  }

  const resetState = () => {
    setUsername("");
    setPassword("");
    setUsernameError(undefined);
    setPasswordError(undefined);
  };

  const onCloseModal = () => {
    resetState();
    onClose();
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Prisijungti</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired={true} isInvalid={usernameError === undefined ? false : usernameError !== ''}>
            <FormLabel>El. paštas</FormLabel>
            <Input
              ref={initialRef}
              placeholder="El. paštas"
              value={username}
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
            <FormErrorMessage>{usernameError}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isRequired={true} isInvalid={passwordError === undefined ? false : passwordError !== ''}>
            <FormLabel>Slaptažodis</FormLabel>
            <Input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleLogin} isDisabled={usernameError !== '' || passwordError !== ''}>
            Prisijungti
          </Button>
          <Button onClick={onCloseModal}>Atšaukti</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
