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
            {isSuccess ? (
              <Center>
                <MenuUser />
              </Center>
            ) : (
              <>
                <MenuItem>
                  <Link href="/posts">Community</Link>
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
        <>
          {isSuccess ? (
            <MenuUser />
          ) : (
            <Box>
              <Button variant="primary" mr="2" size={size}>
                <Link href="/posts">Community</Link>
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
    </Flex>
  );
};

export default Header;
