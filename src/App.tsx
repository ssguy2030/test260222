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
  CssBaseline,
  CircularProgress,
  Divider
} from '@mui/material';
import { Camera, Ruler, Weight, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Create a premium theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a', 
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
  },
});

function App() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !image) {
      setError('Please provide all details and a photo.');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ height, weight, image }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setReport(data.choices[0].message.content);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Failed to generate report. Please check your API Key.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom color="text.primary">
            AI Personal Stylist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI-driven style consulting tailored to your unique physique
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
          {/* Input Section */}
          <Paper sx={{ p: 4, width: { xs: '100%', md: '400px' }, flexShrink: 0 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} alignItems="center">
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
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    <Camera size={20} />
                  </IconButton>
                </Box>

                <Stack spacing={2} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    label="Height"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Ruler size={20} /></InputAdornment>,
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
                      startAdornment: <InputAdornment position="start"><Weight size={20} /></InputAdornment>,
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                  />
                </Stack>

                {error && (
                  <Box sx={{ color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AlertCircle size={16} />
                    <Typography variant="caption">{error}</Typography>
                  </Box>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Sparkles size={20} />}
                >
                  {loading ? 'Analyzing Your Style...' : 'Generate Style Report'}
                </Button>
              </Stack>
            </form>
          </Paper>

          {/* Report Display Section */}
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            {report ? (
              <Paper sx={{ p: 4, bgcolor: 'white', border: '1px solid rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                  <Sparkles size={24} color="#f50057" />
                  Your Personalized Style Report
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box className="markdown-report" sx={{ 
                  '& p': { mb: 2, lineHeight: 1.7 },
                  '& h1, & h2, & h3': { mt: 3, mb: 1.5 },
                  '& li': { mb: 1 }
                }}>
                  <ReactMarkdown>{report}</ReactMarkdown>
                </Box>
              </Paper>
            ) : (
              <Box sx={{ 
                height: '100%', 
                minHeight: '400px',
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                border: '2px dashed #eee',
                borderRadius: '24px',
                p: 4,
                textAlign: 'center'
              }}>
                <Sparkles size={48} color="#eee" style={{ marginBottom: '16px' }} />
                <Typography variant="body1" color="text.disabled">
                  Fill in your details and upload a photo to see your AI-generated style analysis here.
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
