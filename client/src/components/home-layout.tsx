import React from "react";
import {
  SimpleGrid,
  GridItem,
  Box,
  Heading,
  Text,
  Center,
  Image,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import MainLayout from "./main-layout";

const HomeLayout = () => {
  const colSpan = useBreakpointValue({ base: 2, lg: 1 });

  return (
    <>
      <MainLayout>
        <VStack w="full" h="full" p={10}>
          <VStack spacing={4}>
            <Heading size="sm" align="center">
              Welcome fellow human, IFT is the perfect place for you to post
              objects/items that you randomly find in the world. Please be kind
              and create a post to share your fascinating discoveries.
            </Heading>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={colSpan}>
              <Heading>Hello</Heading>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Heading>Boom</Heading>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </MainLayout>
    </>
  );
};
export default HomeLayout;
