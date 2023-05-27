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
import axios from "axios";
import { useAuth } from "../auth-context";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal = (props: RegisterProps) => {
  const { onClose, isOpen } = props;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = useAuth();

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/v1/user", {
        username,
        email,
        password,
      });
      login(email, password);
      onCloseModal();
    } catch (error) {
      console.error("Registration failed:", error);
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

  const [emailError, setEmailError] = React.useState<string | undefined>(undefined)
  const handleChangeEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (value === '')
      setEmailError("Elektroninis paštas negali būti tuščias");
    else if (!emailRegex.test(value))
      setEmailError("Elektroninis paštas neatitinka standaro patikrinkite ar yra @");
    else
      setEmailError("");
      
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
    setEmail("");
    setUsernameError(undefined);
    setEmailError(undefined);
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
        <ModalHeader>Susikurti naują paskyrą</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired={true} isInvalid={usernameError === undefined ? false : usernameError !== ''}>
            <FormLabel>Vardas, Pavardė</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Vardas, Pavardė"
              value={username}
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
            <FormErrorMessage>{usernameError}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isRequired={true} isInvalid={emailError === undefined ? false : emailError !== ''}>
            <FormLabel>El. paštas</FormLabel>
            <Input
              placeholder="El. paštas"
              value={email}
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
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
          <Button colorScheme="green" mr={3} onClick={handleRegister} isDisabled={usernameError !== '' || passwordError !== '' || emailError !== ''}>
            Užsiregistruoti
          </Button>
          <Button onClick={onCloseModal}>Atšaukti</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
