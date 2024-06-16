import { MoreHoriz, Delete } from "@mui/icons-material"
import { Box, Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react";
import Image from 'next/image';

export interface PostData {
  id: string;
  content: string;
  image_url: string;
}

const URL_REGEX = RegExp('https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?');

interface Props {
  post: PostData;

  onDelete: (post: PostData) => void;
}

export const Post: React.FunctionComponent<Props> = ({ post, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    onDelete(post);
    handleClose();
  }

  return (
    <Box key={post.id} sx={{ backgroundColor: 'white', padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <IconButton aria-label="more-menu-toggle" id="more-menu-toggle"
          aria-controls={open ? 'more-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <MoreHoriz />
        </IconButton>
        <Menu
          id="more-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'more-menu-toggle',
          }}
        >
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      <Typography color='InfoText'>
        {post.content}
      </Typography>
      <Box>
        {URL_REGEX.test(post.image_url) &&
          <Image
            src={post.image_url}
            alt={post.content}
            width={200} height={200}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}>
          </Image>
        }
      </Box>
    </Box>
  )
}