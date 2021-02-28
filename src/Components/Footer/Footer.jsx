import { React } from "react";
import { Flex, Box, Heading, Stack, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode, _ } = useColorMode();
  return (
    <Flex
      width="full"
      position="fixed"
      bottom="0"
      mt={4}
      py={3}
      bg={colorMode === "light" ? "rgba(146, 114, 174)" : "rgba(0, 0, 40)"}
      borderTopRadius="1rem"
    >
      <Box width="full" boxShadow="xs">
        <Stack isInline justifyContent="center" px={8}>
          <FooterName />
        </Stack>
      </Box>
    </Flex>
  );
};

const FooterName = () => {
  return (
    <Heading
      fontSize="18px"
      fontFamily={"Agustina Regular"}
    >
      Designed by 5up
    </Heading>
  );
};

export default Footer;
