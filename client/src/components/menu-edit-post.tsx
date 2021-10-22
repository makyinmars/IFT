import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Center,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const MenuEditPost = () => {
  return (
    <Center p={2}>
      <Menu>
        <MenuButton
          as={Button}
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

export default MenuEditPost;
