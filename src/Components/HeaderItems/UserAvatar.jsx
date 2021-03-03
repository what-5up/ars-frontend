import { Wrap, WrapItem, Avatar } from "@chakra-ui/react";

const UserAvatar = ({ name, onClick, size = "sm" }) => {
  return (
    <Wrap>
      <WrapItem>
        <Avatar size={size} cursor="pointer" name={name} onClick={onClick} />
      </WrapItem>
    </Wrap>
  );
};

export default UserAvatar;
