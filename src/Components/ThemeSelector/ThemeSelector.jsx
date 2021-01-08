import { MoonIcon,SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign='right'>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
        onClick={toggleColorMode}
        variant='ghost'
      ></IconButton>
    </Box>
  );
};
export default ThemeSelector;
