import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface ImageUploadProps {
  name: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      let f =[...selectedFiles]
      f.push(...files);
      setSelectedFiles(f);
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="subtitle1">Upload Images</Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  handleFileChange(event);
                  field.onChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  form.setFieldValue(field.name, selectedFiles);
                }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
      )}
    </Field>
  );
};

export default ImageUpload;
