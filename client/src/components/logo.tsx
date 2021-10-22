import { Box, AspectRatio, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Box mr="2">
      <AspectRatio ration={1} w={20}>
        <Image src="/images/logo.png" alt="logo" />
      </AspectRatio>
    </Box>
  );
};

export default Logo;
