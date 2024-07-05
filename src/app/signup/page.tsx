'use client';

import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const signUp = async (values: FormData) => {
    setIsProcessing(true);
    await axios.post('/api/signup', values);
    setIsProcessing(false);
    router.push('/login');
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: signUp,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            required
            id="password"
            label="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="confirm_password">Confirm password</InputLabel>
          <OutlinedInput
            required
            id="confirm_password"
            label="Confirm password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Button variant="contained" type="submit" disabled={isProcessing}>Sign up</Button>
        </Box>
      </Container>
    </form>
  )
}