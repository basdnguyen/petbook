'use client';

import { Post, PostData } from "@/components/Post";
import { AppBar, Avatar, Box, Button, Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/AppContext";
import { blue } from "@mui/material/colors";
import { Delete, Logout } from "@mui/icons-material";

export default function Home() {

  const [posts, setPosts] = useState<PostData[]>([]);
  const [imagePublicId, setImagePublicId] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState('');
  const { user, jwt, setJwt, setUser } = useContext(AppContext);

  const loadPosts = async () => {
    const { data } = await axios.get('/api/posts');
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (post: PostData) => {
    await axios.delete(`/api/post/${post.id}`);
    loadPosts();
  }

  function onSuccess(result: any, widget: any) {
    widget.close({
      quiet: true,
    });
    setImagePublicId(result.info?.public_id);
  }

  function deleteUploadImage() {

  }

  function onChangeMessage(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  async function doPost() {
    setIsPosting(true);
    await axios.post('/api/posts', {
      content: message,
      image_url: imagePublicId
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
    setImagePublicId('');
    loadPosts();
    setIsPosting(false);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem('jwt');
  }

  return (
    <Container disableGutters maxWidth={false} sx={{
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      paddingBottom: 3,
    }}>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', paddingX: 5 }}>
        <Toolbar disableGutters>
          <Image src='/icon.ico' alt='logo' width={30} height={30}></Image>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center'
          }}>
            {user && (
              <>
                <IconButton aria-label="more-menu-toggle" id="more-menu-toggle"
                  aria-controls={open ? 'more-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>
                  <Avatar src='' sx={{ bgcolor: blue[500] }}>{user.first_name[0]}</Avatar>
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
                  <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            )}
            {!user && (
              <>
                <Button variant="outlined" href="/login">Log In</Button>
                <Button variant="contained" href="/signup">Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 0, flex: '1 1 auto' }}>
        {user && (
          <Box maxWidth='sm' sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 1,
            gap: 1,
          }}>
            {!imagePublicId && (
              <CldUploadWidget uploadPreset="default" onSuccess={onSuccess}>
                {({ open }) => {
                  return (
                    <Button onClick={() => open()}>
                      Share a moment of your pet
                    </Button>
                  );
                }}
              </CldUploadWidget>
            )}
            {imagePublicId && (
              <>
                <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <CldImage
                    width="960"
                    height="600"
                    src={imagePublicId}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                  <Button variant="contained" aria-label='Remove Image' color='info'
                    sx={{ position: 'absolute', top: 4, right: 4, padding: '4px', minWidth: 32 }}
                    onClick={deleteUploadImage}
                  >
                    <DeleteIcon />
                  </Button>
                  <TextField
                    required
                    id="message"
                    placeholder="Say something about the image"
                    value={message}
                    onChange={onChangeMessage}
                    sx={{ flexGrow: 1, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                  />
                </Box>
                <Button variant="contained" color='primary' onClick={doPost} disabled={isPosting}>Post</Button>
              </>
            )}
          </Box>
        )}
        {posts.map(post => <Post key={post.id} post={post} onDelete={deletePost} />)}
      </Container>
    </Container>
  );
}
