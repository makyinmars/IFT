import Link from "next/link";
import {
  Button,
  Flex,
  Spacer,
  Box,
  Heading,
  AspectRatio,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import MenuProfile from "./menu-profile";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const { isSuccess } = useAppSelector((state) => state.auth.status);

  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex p="3">
      <Flex>
        <Button variant="primary" size="sm" onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Heading size="lg" ml={3}>
          <Link href="/">Home</Link>
        </Heading>
      </Flex>
      <Spacer />

      {isSuccess ? (
        <MenuProfile />
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
