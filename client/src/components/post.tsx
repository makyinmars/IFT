import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Flex,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  SimpleGrid,
  GridItem,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPost,
  updatePost,
  deletePost,
} from "../../app/features/feed/feed-slice";

const Post = () => {
  const bg = useColorModeValue("gray.200", "gray.700");

  const dispatch = useAppDispatch();
  const { body: bodyReduxState, createdAt } = useAppSelector(
    (state) => state.feed.feedPosts
  );

  const { isSuccess } = useAppSelector((state) => state.feed.status);
  const router = useRouter();
  const { id } = router.query;
  const [body, setBody] = useState("");

  const onDelete = () => {
    dispatch(deletePost());
    if (isSuccess) {
      router.push("/posts");
    }
  };

  const onUpdate = () => {
    dispatch(updatePost({ body }));
    if (isSuccess) {
      router.push("/posts");
    }
  };

  useEffect(() => {
    // query is type string, conversion to number id - db with number
    dispatch(getPost(Number(id)));
  }, [dispatch, id]);
  return (
    <Flex justify="space-around" p={6}>
      <form>
        <VStack
          w="auto"
          h="auto"
          p={10}
          bg={bg}
          borderRadius="md"
          boxShadow="dark-lg"
        >
          <Heading fontSize="xl">Post: {id}</Heading>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="auto" p={6}>
            <GridItem colSpan={2}>
              <FormControl id="post" isRequired>
                <FormLabel>Post</FormLabel>

                <Textarea
                  value={body}
                  isRequired
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setBody(e.target.value)
                  }
                  placeholder={bodyReduxState}
                />
                <FormHelperText>Create At: {createdAt}</FormHelperText>
                <FormHelperText>
                  Button disabled, update your post in order to enable button
                </FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <Button
                variant="secondary"
                size="sm"
                w="full"
                onClick={onUpdate}
                disabled={body === "" ? true : false}
              >
                Update
              </Button>
            </GridItem>
            <GridItem colSpan={1}>
              <Button variant="secondary" size="sm" w="full" onClick={onDelete}>
                Delete
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </form>
    </Flex>
  );
};

export default Post;
