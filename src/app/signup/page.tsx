'use client';

import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const signUp = async (values: FormData) => {
    await axios.post('/api/signup', values);
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    },
    onSubmit: signUp,
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
          id="first_name"
          label="First name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
        <TextField
          required
          id="last_name"
          label="Last name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
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