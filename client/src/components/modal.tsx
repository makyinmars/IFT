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
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createPost } from "../../app/features/feed/feed-slice";
import Alert from "./alert";
import ButtonToast from "./button-toast";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth.userInfo);
  const { isSuccess, isError, errorMessage } = useAppSelector(
    (state) => state.feed.status
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPost({ body }));
  };

  return (
    <>
      {user.id !== 0 && (
        <>
          {isError && <Alert status="error" description={errorMessage} />}
          <Button onClick={onOpen} variant="primary">
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
                <ModalHeader textAlign="center">Add your post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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

export default Modal;
