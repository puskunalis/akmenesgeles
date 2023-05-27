import {
    Button,
    HStack,
    Input,
    useNumberInput
  } from '@chakra-ui/react';

interface AmountOfItemsProps {
    onChange: (value: number) => void;
    value: number
}

export default function ItemAmount({onChange, value} : AmountOfItemsProps) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
        step: 1,
        defaultValue: 1,
        value: value,
        min: 1,
        max: 301,
        onChange: (valueString: string, valueNumber: number) => onChange(valueNumber)
        })
    
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    
    return (
        <HStack maxW='320px'>
            <Button {...dec}>-</Button>
            <Input {...input} />
            <Button {...inc}>+</Button>
        </HStack>
    )
}