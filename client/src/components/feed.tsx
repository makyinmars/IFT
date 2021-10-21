import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FeedPosts } from "../interfaces/interfaces";

interface Props {
  feedPosts: FeedPosts[];
}

const Feed = ({ feedPosts }: Props) => {
  const bg = useColorModeValue("brand.400", "brand.200");

  return (
    <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10} pt={6}>
      {feedPosts.map((feedPost) => (
        <Box
          key={feedPost.id}
          p={2}
          bg={bg}
          borderRadius="md"
          boxShadow="dark-lg"
        >
          <Heading size="md">{`${feedPost.author.firstName} ${feedPost.author.lastName}`}</Heading>
          <Text>{feedPost.body}</Text>
          <Text>{feedPost.createdAt}</Text>
          <Text>{`Role: ${feedPost.author.role}`}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Feed;
