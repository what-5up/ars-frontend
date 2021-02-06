import { Wrap, WrapItem, Avatar } from "@chakra-ui/react";

const UserAvatar = ({ imageUrl, onClick, size = "sm" }) => {
  return (
    <Wrap>
      <WrapItem>
        <Avatar size={size} cursor="pointer" src={imageUrl} onClick={onClick} />
      </WrapItem>
    </Wrap>
  );
};

export default UserAvatar;
