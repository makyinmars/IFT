import { ChangeEvent, useState, MouseEvent, useEffect, FormEvent } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import {
  Flex,
  VStack,
  Heading,
  Image,
  Input,
  useColorModeValue,
  FormControl,
  FormLabel,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";

import Alert from "../components/alert";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  uploadUserImage,
  getUser,
  updateUser,
} from "../../app/features/auth/auth-slice";

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const {
    imagePath,
    firstName: firstNameState,
    lastName: lastNameState,
    email: emailState,
  } = useAppSelector((state) => state.auth.userInfo.user);

  const { isSuccess, errorMessage, isError, isFetching } = useAppSelector(
    (state) => state.auth.status
  );

  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const bg = useColorModeValue("gray.200", "gray.700");

  const router = useRouter();

  const { id } = router.query;

  const [imageSelected, setImageSelected] = useState<File>(); // Also try <string | Blob>

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSelected(e.target.files[0]);
    }
  };

  const onUploadImage = () => {
    dispatch(uploadUserImage(imageSelected));
  };

  const onUpdate = () => {
    dispatch(updateUser({ firstName, lastName, email }));
  };

  useEffect(() => {
    dispatch(getUser(Number(id)));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{`${firstNameState}'s Profile'`} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Flex justify="space-around" p={6}>
        <VStack
          w="xl"
          h="auto"
          p={10}
          bg={bg}
          borderRadius="md"
          boxShadow="dark-lg"
        >
          <Heading size="md">{`${firstNameState}'s Profile`}</Heading>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={colSpan}>
              <FormControl id="avatar">
                <FormLabel htmlFor="avatar">Avatar</FormLabel>
                <Input type="file" onChange={imageChange} accept="image/*" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan} align="center">
              {imagePath !== "" ? (
                <Image
                  src={imagePath}
                  borderRadius="full"
                  boxSize="100px"
                  alt="image"
                />
              ) : (
                imageSelected && (
                  <Image
                    src={URL.createObjectURL(imageSelected)}
                    borderRadius="full"
                    boxSize="100px"
                    alt="image"
                  />
                )
              )}
            </GridItem>
            <GridItem colSpan={2} align="center">
              <Button onClick={onUploadImage}>Update image</Button>
            </GridItem>

            <GridItem colSpan={colSpan}>
              <FormControl id="firstNameState">
                <FormLabel htmlFor="firstNameState">First Name</FormLabel>
                <Input
                  type="text"
                  placeholder={firstNameState}
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <FormControl id="lastNameState">
                <FormLabel htmlFor="lastNameState">Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder={lastNameState}
                  value={lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl id="emailState">
                <FormLabel htmlFor="emailState">Email</FormLabel>
                <Input
                  type="email"
                  placeholder={emailState}
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <Button
                w="full"
                variant="primary"
                type="submit"
                onClick={onUpdate}
              >
                Update Information
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
    </>
  );
};

export default UserProfile;
