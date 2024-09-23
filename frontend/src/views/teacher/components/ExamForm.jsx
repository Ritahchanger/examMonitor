import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const CreateExam = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const validateLiveDate = () => {
    const now = new Date();
    if (new Date(values.liveDate) < now) {
      return 'Live date cannot be in the past';
    }
    return null;
  };

  const handleExamSubmit = (e) => {
    e.preventDefault();
    const liveDateError = validateLiveDate();
    if (liveDateError) {
      // Optionally set an error state or show a toast notification
      alert(liveDateError);
      return;
    }
    handleSubmit();
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box component="form" onSubmit={handleExamSubmit}>
        <TextField
          id="examName"
          name="examName"
          label="Exam Name"
          variant="outlined"
          value={values.examName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.examName && Boolean(errors.examName)}
          helperText={touched.examName && errors.examName}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          id="totalQuestions"
          name="totalQuestions"
          label="Total Number of Questions"
          type="number"
          variant="outlined"
          value={values.totalQuestions}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.totalQuestions && Boolean(errors.totalQuestions)}
          helperText={touched.totalQuestions && errors.totalQuestions}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          id="duration"
          name="duration"
          label="Exam Duration (minutes)"
          type="number"
          variant="outlined"
          value={values.duration}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.duration && Boolean(errors.duration)}
          helperText={touched.duration && errors.duration}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          id="liveDate"
          name="liveDate"
          label="Live Date and Time"
          type="datetime-local"
          variant="outlined"
          value={values.liveDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.liveDate && Boolean(errors.liveDate)}
          helperText={touched.liveDate && (errors.liveDate || validateLiveDate())}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="deadDate"
          name="deadDate"
          label="Dead Date and Time"
          type="datetime-local"
          variant="outlined"
          value={values.deadDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.deadDate && Boolean(errors.deadDate)}
          helperText={touched.deadDate && errors.deadDate}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleExamSubmit}
        >
          Create Exam
        </Button>
      </Box>

      {subtitle}
    </>
  );
};

export default CreateExam;
