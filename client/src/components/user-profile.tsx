import { ChangeEvent, useState, MouseEvent, useEffect, FormEvent } from "react";
import { useRouter } from "next/dist/client/router";
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
  Text,
} from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { uploadUserImage } from "../../app/features/auth/auth-slice";

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const { imagePath, firstName, lastName, email } = useAppSelector(
    (state) => state.auth.userInfo.user
  );

  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const bg = useColorModeValue("gray.200", "gray.700");

  // const router = useRouter();

  // Get current user id
  // const { id } = router.query;

  const [imageSelected, setImageSelected] = useState<File>(); // Also try <string | Blob>

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSelected(e.target.files[0]);
    }
  };

  const onUploadImage = () => {
    dispatch(uploadUserImage(imageSelected));
  };

  return (
    <Flex justify="space-around" p={6}>
      <VStack
        w="xl"
        h="auto"
        p={10}
        bg={bg}
        borderRadius="md"
        boxShadow="dark-lg"
      >
        <Heading size="md">{`${firstName}'s Profile`}</Heading>
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

          <GridItem colSpan={1} align="center">
            <Text>First Name</Text>
          </GridItem>
          <GridItem colSpan={1} align="center">
            <Text>{firstName}</Text>
          </GridItem>

          <GridItem colSpan={1} align="center">
            <Text>Last Name</Text>
          </GridItem>
          <GridItem colSpan={1} align="center">
            <Text>{lastName}</Text>
          </GridItem>
          <GridItem colSpan={1} align="center">
            <Text>Email</Text>
          </GridItem>
          <GridItem colSpan={1} align="center">
            <Text>{email}</Text>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default UserProfile;
