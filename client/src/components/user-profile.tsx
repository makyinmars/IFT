import { useRouter } from "next/dist/client/router";
import {
  Flex,
  HStack,
  VStack,
  Heading,
  Text,
  Input,
  useColorModeValue,
  FormControl,
  FormLabel,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";
import React from "react";

const UserProfile = () => {
  const router = useRouter();

  const { id } = router.query;

  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const bg = useColorModeValue("gray.200", "gray.700");
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
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type="text" placeholder="John" />
            </FormControl>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default UserProfile;
