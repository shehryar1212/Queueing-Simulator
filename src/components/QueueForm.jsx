import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Box, CircularProgress } from '@mui/material';

const QueueForm = ({ fields, onSubmit, submitButtonText = "Submit", isLoading = false, onClear }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClearForm = () => {
    setFormData({});
    if (onClear) {
      onClear();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} md={fields.length > 2 ? 4 : 6} key={index}>
            {field.type === 'select' ? (
              <TextField
                select
                fullWidth
                label={field.label}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                helperText={field.helperText}
                disabled={isLoading}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                label={field.label}
                type={field.type || 'text'}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                helperText={field.helperText}
                disabled={isLoading}
                InputProps={{
                  endAdornment: field.unit ? field.unit : null,
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading}
          sx={{
            backgroundColor: '#881337',
            '&:hover': {
              backgroundColor: '#111827',
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : submitButtonText}
        </Button>
        
        <Button
          type="button"
          variant="outlined"
          color= "#111827"
          size="large"
          onClick={handleClearForm}
          disabled={isLoading}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default QueueForm;