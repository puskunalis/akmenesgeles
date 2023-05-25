import { Container } from "@chakra-ui/react"
import Payment from "./checkout/Payment"

export const PaymentPage = () => {
    return (
        <Container centerContent padding={50}>
            <Payment/>
        </Container>
        
    )
}