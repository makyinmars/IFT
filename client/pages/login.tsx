import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  VStack,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { loginUser } from "../app/features/auth/auth-slice";
import { toast } from "react-toastify";
import Notification from "../src/components/notification";
import Spinner from "../src/components/spinner";
import MainLayout from "../src/components/main-layout";

const userFormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { isSuccess, isError, isFetching, errorMessage } = useAppSelector(
    (state) => state.auth.status
  );

  const router = useRouter();

  const [formData, setFormData] = useState(userFormData);

  const { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setFormData(userFormData);

    if (isSuccess) {
      toast.success("Login successful");
    }

    if (isError) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/posts");
    }
  }, [isSuccess, router]);

  return (
    <>
      <MainLayout>
        <Head>
          <title>Login</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <VStack w="full" h="full" p={10}>
          <VStack spacing={4}>
            <Heading>Log in to your account</Heading>
          </VStack>

          {isSuccess && <Notification />}
          {isFetching && <Spinner />}
          {isError && <Notification />}
          <form onSubmit={onSubmit}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem colSpan={2}>
                <FormControl id="email" isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="jonh@gmail.com"
                    value={email}
                    onChange={onChange}
                  />
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
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <Button w="full" variant="primary" type="submit">
                  Log In
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        </VStack>
      </MainLayout>
    </>
  );
};

export default LoginPage;
