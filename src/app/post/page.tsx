'use client';

import { ButtonFilled, Container, Field, Form, TextInput, View } from "@go1d/go1d";
import axios from 'axios';

export default function Post() {
  const onSubmit = async (data: any, actions: any) => {
    await axios.post('/api/posts', data);
    actions.resetForm();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Container contain='narrow' gap={3} padding={5}>
        <View>
          <Field component={TextInput} name='content' id='content' placeholder="Say something..." required />
        </View>
        <View>
          <Field component={TextInput} name='image_url' id='image_url' placeholder="Include an image URL" />
        </View>
        <View flexDirection={'row'} justifyContent={'center'}>
          <ButtonFilled color='accent' type='submit'>Post</ButtonFilled>
        </View>
      </Container>
    </Form>
  )
}