import { MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Menu as MenuChakra,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logoutUser,
  clearStatus,
  clearUserInfo,
} from "../../app/features/auth/authSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isSuccess } = useAppSelector((state) => state.auth.status);

  const onLogout = () => {
    dispatch(logoutUser());
    if (isSuccess) {
      dispatch(clearStatus());
      dispatch(clearUserInfo());
      router.push("/");
    }
  };

  return (
    <MenuChakra isLazy id="1">
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        color="brand.500"
        bg="brand.200"
      >
        <Avatar size="sm" bg="brand.500" />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Add new item</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </MenuChakra>
  );
};
export default Menu;
