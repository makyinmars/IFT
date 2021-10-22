import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPost,
  updatePost,
  deletePost,
} from "../../app/features/feed/feed-slice";

const Post = () => {
  const dispatch = useAppDispatch();
  const { body: bodyReduxState } = useAppSelector(
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
    <VStack w="full" h="full" p={10}>
      <VStack spacing={4}>
        <Heading fontSize="xl">Post: {id}</Heading>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="xl" p={6}>
        <GridItem colSpan={2}>
          <FormControl id="post" isRequired>
            <FormLabel>Post</FormLabel>

            <Textarea
              value={body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.target.value)
              }
              placeholder={bodyReduxState}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <Button variant="primary" size="sm" w="full" onClick={onUpdate}>
            Update
          </Button>
        </GridItem>
        <GridItem colSpan={1}>
          <Button variant="primary" size="sm" w="full" onClick={onDelete}>
            Delete
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Post;
