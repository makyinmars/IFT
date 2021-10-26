import Link from "next/link";
import {
  Button,
  Flex,
  Spacer,
  Box,
  Heading,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import MenuUser from "./menu-user";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const { isSuccess } = useAppSelector((state) => state.auth.status);

  const size = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex p="3">
      <Flex>
        <Button variant="primary" size={size} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Heading size="lg" ml={3}>
          <Link href="/">Home</Link>
        </Heading>
      </Flex>
      <Spacer />

      <Button variant="primary" mr="5" size={size}>
        <Link href="/posts">Community</Link>
      </Button>
      {isSuccess ? (
        <MenuUser />
      ) : (
        <Box>
          <Button mr="5" variant="primary" size={size}>
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="primary" size={size}>
            <Link href="/login">Log In</Link>
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
