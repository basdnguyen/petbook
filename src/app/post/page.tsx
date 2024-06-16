'use client';

import { ButtonFilled, Container, Field, Form, TextInput, View } from "@go1d/go1d";
import axios from 'axios';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Post() {
  const onSubmit = async (data: any, actions: any) => {
    await axios.post('/api/posts', {
      content: data.content,
      image_url: data.image_url || randomDogImageUrl,
    });
    actions.resetForm();
  }

  const [randomDogImageUrl, setRandomDogImageUrl] = useState('');

  const fetchRandomDogImage = async () => {
    const { data: { message } } = await axios.get('https://dog.ceo/api/breeds/image/random');
    setRandomDogImageUrl(message);
  }

  useEffect(() => {
    fetchRandomDogImage();
  }, []);

  return (
    <Form onSubmit={onSubmit} initialValues={{ image_url: randomDogImageUrl }}>
      <Container contain='narrow' gap={3} padding={5}>
        <View>
          <Field component={TextInput} name='content' id='content' placeholder="Say something..." required />
        </View>
        <View>
          <Field component={TextInput} name='image_url' id='image_url' placeholder="Input an image URL" />
          <View width={200}>
            <Image
              src={randomDogImageUrl}
              alt={randomDogImageUrl}
              width={200} height={200}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}>
            </Image>
          </View>
        </View>
        <View flexDirection={'row'} justifyContent={'center'}>
          <ButtonFilled color='accent' type='submit'>Post</ButtonFilled>
        </View>
      </Container>
    </Form>
  )
}