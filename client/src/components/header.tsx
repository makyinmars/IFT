import Link from "next/link";
import { useEffect, useState } from "react";
import localForage from "localforage";
import {
  Button,
  Flex,
  Spacer,
  Box,
  Heading,
  AspectRatio,
  Image,
  useColorMode,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { EmailIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../app/hooks";
import { User, UserResponse } from "../interfaces/interfaces";
import { DefaultUserInfo } from "../constants/constants";

const Header = () => {
  const { email: emailRegister } = useAppSelector((state) => state.register);

  const [userInfoData, setUserInfoData] = useState<UserResponse | null>(
    DefaultUserInfo
  );

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo: UserResponse | null = await localForage.getItem(
        "userInfo"
      );
      setUserInfoData(userInfo);
    };
    getUserInfo();
  }, []);

  // Store user fron localForaget userInfo
  const user: User | undefined = userInfoData?.user;

  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex p="3">
      <Box mr="2">
        <AspectRatio ration={1} w={14}>
          <Image src="/images/logo.png" alt="logo" />
        </AspectRatio>
      </Box>
      <Box>
        <Heading size="xl">
          <Link href="/">Home</Link>
        </Heading>
      </Box>
      <Spacer />

      <Box>
        <Button variant="primary" size="sm" onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
      <Spacer />

      {user?.email !== "" ? (
        <Avatar size="sm" bg="brand.500" />
      ) : (
        <Box>
          <Button mr="5" variant="primary" size="sm">
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="primary" size="sm">
            <Link href="/login">Log In</Link>
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
