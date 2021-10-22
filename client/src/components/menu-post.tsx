import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Center,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deletePost,
  updatePost,
  clearStatus,
  clearFeedPost,
} from "../../app/features/feed/feed-slice";

const MenuPost = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.feed.feedPosts.id);

  // const onDeletePost = () => {
  //   dispatch(deletePost(id));
  // };

  return (
    <Center p={2}>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          variant="secondary"
          rightIcon={<ChevronDownIcon />}
        >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem>Edit Post</MenuItem>
          <MenuItem>Delete Post</MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
};

export default MenuPost;
