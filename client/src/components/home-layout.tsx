import React from "react";
import {
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Center,
  Image,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import MainLayout from "./main-layout";

const HomeLayout = () => {
  const colSpan = useBreakpointValue({ base: 2, lg: 1 });
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <MainLayout>
        <VStack w="full" h="full" p={10} spacing={4}>
          <VStack spacing={4} bg={bg} p={4} borderRadius={4}>
            <Heading size="md" align="center">
              Welcome fellow human, IFT is the perfect place for you to post
              objects/items that you randomly find in the world. Please be kind
              and create a post to share your fascinating discoveries.
            </Heading>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={colSpan} borderRadius={4}>
              <Center>
                <Image
                  src="/images/illustrations/image2vector.svg"
                  alt="illustration1"
                />
              </Center>
            </GridItem>
            <GridItem
              colSpan={colSpan}
              bg={bg}
              borderRadius={4}
              alignSelf="center"
            >
              <Text fontSize="xl" pt={10} pb={10} m={4}>
                Already found an interesting item? You should definitely post it
                here, our users would love to see your post. Get involved in the
                IFT community!
              </Text>
            </GridItem>
            <GridItem
              colSpan={colSpan}
              bg={bg}
              borderRadius={4}
              alignSelf="center"
            >
              <Text fontSize="xl" pt={10} pb={10} m={4}>
                IFT wish you look trying to find for unique and fascinating
                items that you might want to share with our members. We look
                forward from seeing your posts with your amazing new items you
                have found.
              </Text>
            </GridItem>
            <GridItem colSpan={colSpan} borderRadius={4}>
              <Center>
                <Image
                  src="/images/illustrations/image1vector.svg"
                  alt="illustration2"
                />
              </Center>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </MainLayout>
    </>
  );
};
export default HomeLayout;
