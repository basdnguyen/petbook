import { MoreHoriz, Delete } from "@mui/icons-material"
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { red } from "@mui/material/colors";

export interface PostData {
  id: string;
  content: string;
  image_url: string;
  created_at: string;
  author: {
    first_name: string;
    last_name: string;
  };
}

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

  const createdDate = new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Box>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {`${post.author?.first_name[0]}${post.author?.last_name[0]}`}
            </Avatar>
          }
          action={
            <IconButton aria-label="more-menu-toggle" id="more-menu-toggle"
              aria-controls={open ? 'more-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              <MoreHoriz />
            </IconButton>
          }
          title={`${post.author?.first_name} ${post.author?.last_name}`}
          subheader={createdDate}
        />
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
        <CldImage
          width="960"
          height="600"
          src={post.image_url}
          sizes="100vw"
          alt="Description of my image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}