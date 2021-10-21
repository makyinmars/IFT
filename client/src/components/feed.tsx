import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  feedPosts: [
    id: number,
    body: string,
    createAt: string,
    author: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
    }
  ];
}

const Feed = ({ feedPosts }: Props) => {
  return (
    <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10}>
      {feedPosts.forEach((feedPost, index) => (
        <Box key={index}>
          <Heading>{feedPost}</Heading>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Feed;
