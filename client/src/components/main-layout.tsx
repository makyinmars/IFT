import { Heading, Flex, Center, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Logo from "./logo";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Flex justify="center" align="center">
        <Heading align="center" fontSize="4xl" pt={4}>
          IFT
        </Heading>
        <Logo />
      </Flex>
      {children}
      <Center>
        <Heading size="md" mb={4}>
          Copyright &copy; 2021 IFT |{" "}
          <Link href="https://github.com/makyfj/ift" isExternal>
            Source Code
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Heading>
      </Center>
    </>
  );
};

export default MainLayout;
