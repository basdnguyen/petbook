'use client';

import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { ButtonGoogleSignIn } from "@/components/ButtonGoogleSignIn";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { palette } = useTheme();

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
    <Grid2 container minHeight={'100vh'}>
      <Grid2 flex={1} sx={{ backgroundColor: palette.background.default }} container alignItems={'center'}>
        <form onSubmit={formik.handleSubmit} className='flex flex-1 flex-col justify-center'>
          <Container maxWidth='sm' sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, paddingY: 2,
            justifyContent: 'center',
          }}>
            <Grid2 container gap={2}>
              <TextField
                required
                id="first_name"
                label="First name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                className="flex-1"
              />
              <TextField
                required
                id="last_name"
                label="Last name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                className="flex-1"
              />
            </Grid2>
            <TextField
              required
              id="email"
              label="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Grid2 container gap={2}>
              <FormControl className="flex-1">
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
              <FormControl className="flex-1">
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
            </Grid2>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <Button variant="contained" type="submit" disabled={isProcessing}>Sign up</Button>
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
      </Grid2>
      <Grid2 flex={1} position={'relative'}>
        <CldImage
          fill
          crop='fill'
          src="2150007407_ehjjnc"
          sizes="100vw"
          alt="pets"
          style={{
            objectFit: 'cover',
          }}
        />
      </Grid2>
    </Grid2>
  )
}