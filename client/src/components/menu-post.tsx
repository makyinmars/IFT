import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Center,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAppSelector } from "../../app/hooks";

interface Props {
  id: number;
}

const MenuPost = ({ id }: Props) => {
  const { user } = useAppSelector((state) => state.auth.userInfo);
  const { author } = useAppSelector((state) => state.feed.feedPosts);

  return (
    <>
      {/* Only author of the post have access to edit it */}
      {user.id === author.id && (
        <Center p={2}>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="secondary"
              rightIcon={<ChevronDownIcon />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href={`posts/post/${id}`}>Edit Post</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Center>
      )}
    </>
  );
};

export default MenuPost;
