import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

import Axios from '@/boot/axios'

function Footer(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Administrador © '}
      <Link color="inherit">Hospital Maria Esperanza</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const model = {
      email: data.get('email')?.toString().trim() || '',
      password: data.get('password')?.toString().trim() || ''
    }

    Axios.post('auth/admin/login', model)
      .then(response => {
        console.error('RESPONSE', response)
      })
      .catch((e: any) => console.error(e))
      .finally(() => console.error('FINALLY'))
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={4}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              required
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              defaultValue="admin@gmail.com"
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              defaultValue="123456"
            />

            <Button type="submit" sx={{ mt: 3, mb: 2 }}>
              Ingresar
            </Button>
            <Footer sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
