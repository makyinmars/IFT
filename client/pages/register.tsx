import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { registerUser } from "../app/features/auth/auth-slice";
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
import Spinner from "../src/components/spinner";
import Alert from "../src/components/alert";

const userFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const RegisterPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const { isFetching, isError, isSuccess, errorMessage } = useAppSelector(
    (state) => state.auth.status
  );

  const router = useRouter();

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
    dispatch(registerUser({ firstName, lastName, email, password }));
    setFormData(userFormData);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <VStack w="full" h="full" p={10}>
        <VStack spacing={4}>
          <Heading>Create your account</Heading>
          <Text>
            If you already have an account,{" "}
            <Link href="/login">click here</Link>
          </Text>
        </VStack>

        {isFetching && <Spinner />}
        {isError && <Alert status="error" description={errorMessage} />}
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
    </>
  );
};

export default RegisterPage;
