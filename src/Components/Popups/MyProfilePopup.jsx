import { useCallback } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  VStack,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import UserAvatar from "../HeaderItems/UserAvatar";
import EditMyProfilePopup from "./EditMyProfilePopup";
import { connect, useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const MyProfilePopup = ({ user }) => {
  const dispatch = useDispatch()
  const onLogout = useCallback(
    () => dispatch(actions.logout()),
    [dispatch]
  )

  return (
    <Menu>
      <MenuButton bg="transparent" _hover={{ bg: "trasparent" }}>
        <HStack>
          <UserAvatar name={`${user.firstName} ${user.lastName}`}/>
          <ChevronDownIcon />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <UserDetails user={user} />
        </MenuGroup>
        <MenuDivider />
        <MenuGroup justifyItems="center">
          <MenuItem icon={<ArrowForwardIcon/>} onClick={onLogout}>Sign Out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const UserDetails = ({ user }) => {
  return (
    <>
      <Box pt="2">
        <VStack spacing={-3}>
          <UserAvatar name={`${user.firstName} ${user.lastName}`} size="md" />
          <Text as="samp" color="gray.400" fontSize="16px" pt={3} pb={1.5}>
            {user.title}
          </Text>
          <Text color="gray.600" fontSize="20px" pb={1.5}>
            {user.firstName}
          </Text>
          <Text color="gray.500.bold" fontSize="24px">
            {user.lastName}
          </Text>
          <Text color="purple.700" fontSize="15px" p={4}>
            {user.desc}
          </Text>
          <Text as="em" color="gray.500" fontSize="15px">
            {user.email}
          </Text>
        </VStack>
      </Box>
    </>
  );
};


export default connect(null, null) (MyProfilePopup);
