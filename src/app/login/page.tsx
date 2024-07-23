'use client';

import { AppContext } from "@/components/AppContext";
import { ButtonGoogleSignIn } from "@/components/ButtonGoogleSignIn";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';
import { useContext, useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();
  const { setUser, setJwt } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const logIn = async (values: FormData) => {
    setIsProcessing(true);
    const { data: { jwt } } = await axios.post('/api/login', values);
    localStorage.setItem('jwt', jwt);
    const { data } = await axios.get('/api/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
    setUser(data);
    setJwt(jwt);
    setIsProcessing(false);
    router.push('/');
  }
  const formik = useFormik({
    initialValues: {
      email: 'cameron.blake@petbook.com',
      password: 'B3@NB9BC3pagJCT'
    },
    onSubmit: logIn,
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <Button variant="contained" type="submit" disabled={isProcessing}>Log in</Button>
        </Box>
        <Grid2 container flexDirection={'row'} alignItems={'center'} gap={1}>
          <Grid2 flex={1}>
            <hr></hr>
          </Grid2>
          <Typography>or</Typography>
          <Grid2 flex={1}>
            <hr></hr>
          </Grid2>
        </Grid2>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <ButtonGoogleSignIn setIsProcessing={setIsProcessing} />
        </Box>
      </Container>
    </form>
  )
}