'use client';

import { Post, PostData } from "@/components/Post";
import { Container } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/AppContext";
import { AppBar } from "@/components/AppBar";
import { PostCreate } from "@/components/PostCreate";
import { PostSkeleton } from "@/components/PostSkeleton";
import { Authentication } from "@/components/Authentication";

export default function Home() {

  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const { user, jwt } = useContext(AppContext);

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    const { data } = await axios.get('/api/posts');
    setPosts(data);
    setIsLoadingPosts(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (post: PostData) => {
    await axios.delete(`/api/post/${post.id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    loadPosts();
  }

  return (
    <Authentication>
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
          {isLoadingPosts && [...Array(3)].map((_, index) => <PostSkeleton key={index} />)}
          {!isLoadingPosts && posts.map(post => <Post key={post.id} post={post} onDelete={deletePost} />)}
        </Container>
      </Container>
    </Authentication>
  );
}
