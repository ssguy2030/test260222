import React, { useState, type ChangeEvent } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  IconButton,
  Stack,
  InputAdornment,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { Camera, Ruler, Weight, ArrowRight } from 'lucide-react';

// Create a premium theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a', // Dark, elegant primary
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

function App() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ height, weight, image });
    alert('Personal profile updated! Analysis coming soon.');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom color="text.primary">
            Personal Stylist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set up your profile for tailored style recommendations
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 3, md: 5 } }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} alignItems="center">
              {/* Profile Image Section */}
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={image || undefined}
                  sx={{ 
                    width: 140, 
                    height: 140, 
                    bgcolor: 'grey.100',
                    border: '4px solid #fff',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                >
                  {!image && <Camera size={48} color="#999" />}
                </Avatar>
                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Camera size={20} />
                </IconButton>
              </Box>

              <Typography variant="subtitle1" fontWeight={600}>
                Physical Details
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Height"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Ruler size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                  }}
                />
                <TextField
                  fullWidth
                  label="Weight"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Weight size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  }}
                />
              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                endIcon={<ArrowRight size={20} />}
                sx={{ mt: 2 }}
              >
                Create My Style Profile
              </Button>
            </Stack>
          </form>
        </Paper>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          Your data is used solely to provide accurate styling advice.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
