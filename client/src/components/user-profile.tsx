import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Flex,
  VStack,
  Heading,
  Text,
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

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  uploadUserImage,
  findUserImage,
} from "../../app/features/auth/auth-slice";

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const { imagePath, firstName, lastName, email } = useAppSelector(
    (state) => state.auth.userInfo.user
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
    console.log("Updated");
  };

  const onDelete = () => {
    console.log("deleted");
  };

  useEffect(() => {
    dispatch(findUserImage(Number(id)));
  }, [dispatch, id]);

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
        <Heading size="md">{`Franklin's Profile`}</Heading>
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
            <FormControl id="firstName">
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input type="text" placeholder={firstName} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl id="lastName">
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input type="text" placeholder={lastName} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl id="email">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" placeholder={email} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*****" />
            </FormControl>
          </GridItem>

          <GridItem colSpan={colSpan}>
            <Button w="full" variant="primary" type="submit" onClick={onUpdate}>
              Update
            </Button>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <Button w="full" variant="primary" type="submit" onClick={onDelete}>
              Delete
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default UserProfile;
