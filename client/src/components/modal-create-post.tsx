import { ChangeEvent, FormEvent, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Image,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createPost } from "../../app/features/feed/feed-slice";
import Alert from "./alert";
import ButtonToast from "./button-toast";

const ModalCreatePost = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth.userInfo);
  const { isSuccess, isError, errorMessage } = useAppSelector(
    (state) => state.feed.status
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState<string>("");

  const [imagePath, setImagePath] = useState<File>(); // Also try <string | Blob>

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagePath(e.target.files[0]);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPost({ body, imagePath }));
  };

  return (
    <>
      {user.id !== 0 && (
        <>
          {isError && <Alert status="error" description={errorMessage} />}
          <Button onClick={onOpen} variant="primary" size="sm">
            Add new post
          </Button>
          <ModalChakra
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={onSubmit}>
                <ModalHeader textAlign="center">Add post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="image" isRequired>
                    <FormLabel htmlFor="image">Image</FormLabel>
                    <Input
                      name="image"
                      id="image"
                      type="file"
                      onChange={imageChange}
                      accept="image/*"
                    />
                  </FormControl>

                  <Box align="center" p={2}>
                    {imagePath && (
                      <Image
                        src={URL.createObjectURL(imagePath)}
                        boxSize="400px"
                        alt="image"
                      />
                    )}
                  </Box>

                  <FormControl id="post" isRequired>
                    <FormLabel htmlFor="post">Post</FormLabel>
                    <Textarea
                      name="post"
                      id="post"
                      value={body}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setBody(e.target.value)
                      }
                      placeholder="Description"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <ButtonToast
                    title="Post Created"
                    description="We've successfully created a post"
                    status="success"
                  >
                    Add
                  </ButtonToast>
                  <Button ml={3} variant="primary" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </ModalChakra>
        </>
      )}
    </>
  );
};

export default ModalCreatePost;
