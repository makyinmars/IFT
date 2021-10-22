import { Heading, Flex } from "@chakra-ui/react";
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
    </>
  );
};

export default MainLayout;
