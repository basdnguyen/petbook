'use client';

import { Post, PostData } from "@/components/Post";
import { Container } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/AppContext";
import { AppBar } from "@/components/AppBar";
import { PostCreate } from "@/components/PostCreate";

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
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      paddingBottom: 3,
    }}>
      <AppBar />
      <Container maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 0, flex: '1 1 auto' }}>
        {user && (
          <PostCreate onPostCreated={loadPosts} />
        )}
        {posts.map(post => <Post key={post.id} post={post} onDelete={deletePost} />)}
      </Container>
    </Container>
  );
}
