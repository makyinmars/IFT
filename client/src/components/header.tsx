import Link from "next/link";
import {
  Button,
  Flex,
  Spacer,
  Box,
  Heading,
  useColorMode,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";

import MenuUser from "./menu-user";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const { isSuccess } = useAppSelector((state) => state.auth.status);

  const size = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const burgerMenu = useBreakpointValue({
    base: "sm",
    sm: "sm",
    md: "md",
    lg: "lg",
  });
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex p="3">
      <Flex>
        <Heading size="lg">
          <Button variant="primary" size={size}>
            <Link href="/">Home</Link>
          </Button>
        </Heading>
      </Flex>
      <Spacer />

      {/* Checks if screen is small */}
      {burgerMenu === "sm" ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            size={size}
            variant="primary"
            mr={2}
          />
          <MenuList>
            {/* Checks if the user is Logged in */}
            {isSuccess ? (
              <Center>
                <MenuUser />
              </Center>
            ) : (
              <>
                <MenuItem>
                  <Link href="/posts">Posts</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/register">Register</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/login">Log In</Link>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      ) : (
        // Checks if screen is medium or large
        <>
          {/* Checks if user is logged in for medium and large screens */}
          {isSuccess ? (
            <MenuUser />
          ) : (
            <Box>
              <Button variant="primary" mr="2" size={size}>
                <Link href="/posts">Posts</Link>
              </Button>
              <Button variant="primary" mr="2" size={size}>
                <Link href="/register">Register</Link>
              </Button>
              <Button variant="primary" mr="2" size={size}>
                <Link href="/login">Log In</Link>
              </Button>
            </Box>
          )}
        </>
      )}

      <Button variant="primary" size={size} ml={2} onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Header;
