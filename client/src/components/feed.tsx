import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Image,
} from "@chakra-ui/react";

import { FeedPosts } from "../interfaces/interfaces";
import Modal from "./modal-create-post";
import React from "react";
import MenuPost from "./menu-post";

interface Props {
  feedPosts: FeedPosts[];
}

const Feed = ({ feedPosts }: Props) => {
  const bg = useColorModeValue("brand.100", "brand.400");

  const bgBody = useColorModeValue("whiteAlpha.700", "blackAlpha.500");

  return (
    <>
      <Center pt={4}>
        <Modal />
      </Center>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} p={6}>
        {feedPosts.map((feedPost) => (
          <Box
            key={feedPost.id}
            p={2}
            bg={bg}
            borderRadius="md"
            boxShadow="dark-lg"
          >
            <Image src="/images/site/bike.jpeg" alt="post" />
            <Heading
              size="sm"
              align="center"
              p={2}
            >{`By: ${feedPost.author.firstName} ${feedPost.author.lastName}`}</Heading>
            <Box bg={bgBody} borderRadius="md" p={2}>
              <Text>{feedPost.body}</Text>
              <Text>{feedPost.createdAt}</Text>
              <Text>{`Role: ${feedPost.author.role}`}</Text>
            </Box>
            <MenuPost />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Feed;
