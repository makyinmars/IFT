import { useRouter } from "next/dist/client/router";
import {
  Flex,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  SimpleGrid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";

import ButtonToast from "./button-toast";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [body, setBody] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <VStack w="full" h="full" p={10}>
      <VStack spacing={4}>
        <Heading fontSize="xl">Post: {id}</Heading>
      </VStack>
      <form onSubmit={onSubmit}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full" p={6}>
          <GridItem colSpan={2}>
            <FormControl id="post" isRequired>
              <FormLabel>Post</FormLabel>

              <Textarea
                value={body}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setBody(e.target.value)
                }
                placeholder="Body of your post"
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <ButtonToast
              title="Post Created"
              description="We've successfully created a post"
              status="success"
            >
              Update
            </ButtonToast>
          </GridItem>
          <GridItem colSpan={1}>
            <ButtonToast
              title="Post Created"
              description="We've successfully created a post"
              status="success"
            >
              Delete
            </ButtonToast>
          </GridItem>
        </SimpleGrid>
      </form>
    </VStack>
  );
};

export default Post;
