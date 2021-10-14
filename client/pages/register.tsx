import { NextPage } from "next";
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Register: NextPage = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <VStack w="full" h="full" p={10}>
      <VStack spacing={4}>
        <Heading>Create your account</Heading>
        <Text>
          If you already have an account, <Link href="/login">click here</Link>
        </Text>
      </VStack>

      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={colSpan}>
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" placeholder="John" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" placeholder="Doe" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="johndoe@gmail.com" />
            <FormHelperText>We will never share your email.</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="123456" />
            <FormHelperText>Please use a secure password.</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Button w="full" variant="primary">
            Sign Up
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Register;
