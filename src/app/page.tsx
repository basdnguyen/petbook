'use client';

import { Post, PostData } from "@/components/Post";
import { Box, Button, Container, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/AppContext";
import { AppBar } from "@/components/AppBar";

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
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      paddingBottom: 3,
    }}>
      <AppBar />
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
