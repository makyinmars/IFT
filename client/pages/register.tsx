import { NextPage } from "next";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
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

const userFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Register: NextPage = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const [formData, setFormData] = useState(userFormData);

  const { firstName, lastName, email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(userFormData);
  };

  return (
    <VStack w="full" h="full" p={10}>
      <VStack spacing={4}>
        <Heading>Create your account</Heading>
        <Text>
          If you already have an account, <Link href="/login">click here</Link>
        </Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl id="firstName" isRequired>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={onChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl id="lastName" isRequired>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={onChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl id="email" isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={onChange}
              />
              <FormHelperText>We will never share your email.</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl id="password" isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                placeholder="123456"
                value={password}
                onChange={onChange}
              />
              <FormHelperText>Please use a secure password.</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button w="full" variant="primary" type="submit">
              Sign Up
            </Button>
          </GridItem>
        </SimpleGrid>
      </form>
    </VStack>
  );
};

export default Register;
