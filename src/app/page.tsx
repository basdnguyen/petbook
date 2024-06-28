'use client';

import { Post, PostData } from "@/components/Post";
import { AppBar, Box, Button, Container, InputBase, TextField, Toolbar, Typography, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
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
  const { user } = useContext(AppContext);

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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {!user && (
        <Container maxWidth='sm' sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}>
          <Button variant="outlined" href="/login">Log In</Button>
          <Typography color='GrayText'>or</Typography>
          <Button variant="contained" href="/signup">Sign Up</Button>
          <Typography color='GrayText'>to post something...</Typography>
        </Container>
      )}
      <Container maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: 0, overflowY: 'auto', flex: '1 1 auto' }}>
        {user && (
          <Box maxWidth='sm' sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 1,
          }}>
            <TextField
              required
              id="message"
              placeholder="Post something..."
              sx={{ flexGrow: 1 }}
            />
          </Box>
        )}
        {posts.map(post => <Post key={post.id} post={post} onDelete={deletePost} />)}
      </Container>
    </Container>
  );
}
