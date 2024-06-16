'use client';

import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();

  const logIn = async (values: FormData) => {
    const { data: { jwt } } = await axios.post('/api/login', values);
    localStorage.setItem('jwt', jwt);
    router.push('/');
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    },
    onSubmit: logIn,
  });
  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-1 flex-col justify-center'>
      <Container maxWidth='sm' sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white', gap: 2, paddingY: 2,
        justifyContent: 'center',
      }}>
        <TextField
          required
          id="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <TextField
          required
          id="password"
          label="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Button variant="contained" type="submit">Sign up</Button>
        </Box>
      </Container>
    </form>
  )
}