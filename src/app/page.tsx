'use client';

import { Post, PostData } from "@/components/Post";
import { AppBar, Box, Button, Container, IconButton, InputBase, TextField, Toolbar, Typography, alpha, styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import axios from "axios";
import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/AppContext";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Home() {

  const [posts, setPosts] = useState<PostData[]>([]);
  const [imagePublicId, setImagePublicId] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState('');
  const { user, jwt } = useContext(AppContext);

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

  return (
    <Container disableGutters maxWidth={false} sx={{
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Container maxWidth='sm'>
          <Toolbar disableGutters>
            <Image src='/icon.ico' alt='logo' width={30} height={30}></Image>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'
            }}>
              {user && (
                <>
                  <Image
                    src='/default-profile-picture.jpeg'
                    alt='default profile picture'
                    width={30} height={30}
                    style={{
                      borderRadius: '50%'
                    }}></Image>
                  <Typography color='InfoText'>{user.first_name}</Typography>
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
        </Container>
      </AppBar>
      <Container maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 0, overflowY: 'auto', flex: '1 1 auto' }}>
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
