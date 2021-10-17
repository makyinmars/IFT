import { Spinner as SpinnerChakra, Center } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Center>
      <SpinnerChakra
        size="xl"
        color="brand.500"
        thickness="5px"
        speed="0.70s"
      />
    </Center>
  );
};

export default Spinner;
