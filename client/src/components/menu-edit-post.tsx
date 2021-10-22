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
  const onClick = () => {
    return <h1>hello</h1>;
  };
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
          <MenuItem onClick={onClick}>Delete Post</MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
};

export default MenuEditPost;
