import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <VStack w="full" h="full" p={10}>
      <VStack spacing={4}>
        <Heading>Log in to your account</Heading>
      </VStack>

      <SimpleGrid columns={2} columnGap={3} spacing={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <FormControl id="email" isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" placeholder="jonh@gmail.com" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl id="password" isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" placeholder="jonh@gmail.com" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Button w="full" variant="primary">
            Log In
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Login;
