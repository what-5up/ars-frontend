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
import { ChevronDownIcon } from "@chakra-ui/icons";
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
          <UserAvatar />
          <ChevronDownIcon />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <UserDetails user={user} />
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem>
            <EditMyProfilePopup />
          </MenuItem>
          <MenuItem>Change Password</MenuItem>
          <MenuItem onClick={onLogout}>Sign Out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const UserDetails = ({ user }) => {
  return (
    <>
      <Box pt="2">
        <VStack spacing={-0.5}>
          <UserAvatar imageUrl={"user.image"} size="md" />
          <Text color="gray.600" fontSize="20px" pt={1}>
            "user.firstname"
          </Text>
          <Text color="gray.500" fontSize="12px">
            "user.lastname"
          </Text>
        </VStack>
      </Box>
    </>
  );
};


export default connect(null, null) (MyProfilePopup);
