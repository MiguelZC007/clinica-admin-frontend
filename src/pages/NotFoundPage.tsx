import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/', { replace: true });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Stack spacing={2} direction="column" sx={{ textAlign: 'center' }}>
        <h1>404 🧐</h1>
        <h4>Upps... esta página no existe.</h4>
        <Button variant="contained" onClick={handleSubmit}>
          Regresar
        </Button>
      </Stack>
    </div>
  );
}
