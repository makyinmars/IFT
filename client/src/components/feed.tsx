import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { FeedPosts } from "../interfaces/interfaces";
import Modal from "./modal-create-post";
import MenuPost from "./menu-post";
import { useAppSelector } from "../../app/hooks";

interface Props {
  feedPosts: FeedPosts[];
}

const Feed = ({ feedPosts }: Props) => {
  const bg = useColorModeValue("brand.400", "brand.400");
  const bgBody = useColorModeValue("whiteAlpha.700", "blackAlpha.500");

  // Fix in server side rendering
  // const { user } = useAppSelector((state) => state.auth.userInfo);
  // const { author } = useAppSelector((state) => state.feed.feedPosts);
  const { isSuccess } = useAppSelector((state) => state.feed.status);
  // Working on it!
  // useEffect(() => {}, []);

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
            <Center>
              {feedPost.imagePath !== "" ? (
                <Image src={feedPost.imagePath} alt="post" boxSize="390px" />
              ) : (
                <Image
                  src="/images/site/bike.jpeg"
                  alt="post"
                  boxSize="390px"
                />
              )}
            </Center>
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
            <MenuPost id={feedPost.id} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Feed;
