import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";

import { FeedPosts } from "../interfaces/interfaces";
import Modal from "./modal-create-post";
import MenuPost from "./menu-post";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { clearStatus } from "../../app/features/feed/feed-slice";
import Alert from "./alert";
import Spinner from "./spinner";

interface Props {
  feedPosts: FeedPosts[];
}

const Feed = ({ feedPosts }: Props) => {
  const bg = useColorModeValue("brand.400", "brand.400");
  const bgBody = useColorModeValue("whiteAlpha.700", "blackAlpha.500");

  const dispatch = useAppDispatch();

  const { isSuccess, isFetching, isError, errorMessage } = useAppSelector(
    (state) => state.feed.status
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearStatus());
    }
  }, [dispatch, isSuccess]);

  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Center pt={4}>
        <Modal />
      </Center>
      <Box p={2}>
        {isSuccess && (
          <Alert status="success" description="Posts successfully loaded" />
        )}
        {isFetching && <Spinner />}
        {isError && <Alert status="error" description={errorMessage} />}
      </Box>
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
