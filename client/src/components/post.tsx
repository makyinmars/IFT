import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
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
  Input,
  Image,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPost,
  updatePost,
  deletePost,
} from "../../app/features/feed/feed-slice";
import Notification from "./notification";
import Spinner from "./spinner";
import { toast } from "react-toastify";

const Post = () => {
  const bg = useColorModeValue("gray.200", "gray.700");

  const dispatch = useAppDispatch();
  const { feedPosts } = useAppSelector((state) => state.feed);
  const { user } = useAppSelector((state) => state.auth.userInfo);

  const { isSuccess, isError, isFetching, errorMessage } = useAppSelector(
    (state) => state.feed.status
  );
  const router = useRouter();
  const { id } = router.query;
  const [body, setBody] = useState("");

  const [imagePath, setImagePath] = useState<File>(); // Also try <string | Blob>

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagePath(e.target.files[0]);
    }
  };

  const onDelete = () => {
    dispatch(deletePost());
    if (isSuccess) {
      router.push("/posts");
      toast.success("Post deleted successfully");
    }

    if (isError) {
      toast.error(errorMessage);
    }
  };

  const onUpdate = () => {
    dispatch(updatePost({ body, imagePath }));
    // dispatch(createPost({ body, imagePath }));
    if (isSuccess) {
      router.push("/posts");
      toast.success("Post updated successfully");
    }

    if (isError) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    dispatch(getPost(Number(id)));
  }, [dispatch, id, router]);
  return (
    <>
      <Head>
        <title>{`Post - ${id}`} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {isSuccess && <Notification />}
      {isFetching && <Spinner />}
      {isError && <Notification />}

      <Flex justify="space-around" p={6}>
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
              <FormControl id="image">
                <FormLabel htmlFor="image">
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    onChange={imageChange}
                  />
                </FormLabel>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2} align="center">
              {feedPosts.imagePath !== "" ? (
                <Image src={feedPosts.imagePath} boxSize="400px" alt="image" />
              ) : (
                imagePath && (
                  <Image
                    src={URL.createObjectURL(imagePath)}
                    boxSize="400px"
                    alt="image"
                  />
                )
              )}
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="post">
                <FormLabel>Post</FormLabel>

                <Textarea
                  value={body}
                  isRequired
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setBody(e.target.value)
                  }
                  placeholder={feedPosts.body}
                />
                <FormHelperText>
                  Create At: {feedPosts.createdAt}
                </FormHelperText>
                <FormHelperText>
                  Buttons disabled, If you are not the owner of this post
                </FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <Button
                variant="secondary"
                size="sm"
                w="full"
                onClick={onUpdate}
                disabled={user.id !== feedPosts.author.id}
              >
                Update
              </Button>
            </GridItem>
            <GridItem colSpan={1}>
              <Button
                variant="secondary"
                size="sm"
                w="full"
                onClick={onDelete}
                disabled={user.id !== feedPosts.author.id}
              >
                Delete
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
    </>
  );
};

export default Post;
