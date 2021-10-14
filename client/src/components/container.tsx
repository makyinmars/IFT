import React from "react";
import { Container as ContainerChakra } from "@chakra-ui/react";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <ContainerChakra maxW="container.xl" p={2}>
      <Header />
      {children}
    </ContainerChakra>
  );
};

export default Container;
