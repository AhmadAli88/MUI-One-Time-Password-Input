import { MuiOtpInput } from 'mui-one-time-password-input';
import { Card, CardHeader, CardContent, Button, Alert, Snackbar } from '@mui/material';
import { useRef, useState } from 'react';

const OTPExamples = () => {
  // Basic OTP state
  const [basicOtp, setBasicOtp] = useState('');
  
  // Custom validation OTP
  const [customOtp, setCustomOtp] = useState('');
  
  // Numeric only OTP
  const [numericOtp, setNumericOtp] = useState('');
  
  // Error handling OTP
  const [errorOtp, setErrorOtp] = useState('');
  const [hasError, setHasError] = useState(false);
  
  // Masked OTP
  const [maskedOtp, setMaskedOtp] = useState('');
  
  // Length validation OTP
  const [lengthOtp, setLengthOtp] = useState('');
  
  // Reference for direct focus
  const otpRef = useRef(null);

  // Snackbar for alerts
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Basic OTP handler
  const handleBasicChange = (newValue) => {
    setBasicOtp(newValue);
  };

  // Custom validation handler
  const handleCustomChange = (newValue) => {
    setCustomOtp(newValue);
  };

  // Custom validation function
  const validateChar = (value, index) => {
    // Only allow even numbers at even indices
    if (index % 2 === 0) {
      return parseInt(value) % 2 === 0;
    }
    return true;
  };

  // Numeric OTP handler
  const handleNumericChange = (newValue) => {
    setNumericOtp(newValue);
  };

  // Error OTP handler
  const handleErrorChange = (newValue) => {
    setErrorOtp(newValue);
    // Example validation: check if input contains only numbers
    setHasError(!/^\d*$/.test(newValue));
  };

  // Masked OTP handler
  const handleMaskedChange = (newValue) => {
    setMaskedOtp(newValue);
  };

  // Length OTP handler
  const handleLengthChange = (newValue) => {
    setLengthOtp(newValue);
  };

  // Verify OTP example
  const handleVerify = (otp) => {
    // Example verification logic
    const correctOtp = '123456';
    if (otp === correctOtp) {
      setSnackbarMessage('OTP verified successfully!');
    } else {
      setSnackbarMessage('Invalid OTP!');
    }
    setSnackbarOpen(true);
  };

  // Focus OTP input programmatically
  const focusOtpInput = () => {
    if (otpRef.current) {
      otpRef.current.focus();
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Usage */}
      <Card>
        <CardHeader title="Basic Usage" />
        <CardContent>
          <MuiOtpInput
            value={basicOtp}
            onChange={handleBasicChange}
            length={6}
            onComplete={(value) => handleVerify(value)}
          />
          <div className="mt-2">
            <Button 
              variant="contained"
              onClick={() => handleVerify(basicOtp)}
              disabled={basicOtp.length !== 6}
            >
              Verify OTP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Validation */}
      <Card>
        <CardHeader title="Custom Validation (Even numbers at even indices)" />
        <CardContent>
          <MuiOtpInput
            value={customOtp}
            onChange={handleCustomChange}
            validateChar={validateChar}
            length={4}
          />
          <p className="text-sm text-gray-500 mt-2">
            Even positions (0,2) must contain even numbers
          </p>
        </CardContent>
      </Card>

      {/* Numeric Only */}
      <Card>
        <CardHeader title="Numeric Only Input" />
        <CardContent>
          <MuiOtpInput
            value={numericOtp}
            onChange={handleNumericChange}
            length={4}
            validateChar={(value) => !isNaN(value)}
          />
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card>
        <CardHeader title="Error Handling" />
        <CardContent>
          <MuiOtpInput
            value={errorOtp}
            onChange={handleErrorChange}
            length={4}
            error={hasError}
          />
          {hasError && (
            <Alert severity="error" className="mt-2">
              Please enter numbers only
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Masked Input */}
      <Card>
        <CardHeader title="Masked Input" />
        <CardContent>
          <MuiOtpInput
            value={maskedOtp}
            onChange={handleMaskedChange}
            length={4}
            TextFieldsProps={{ type: 'password' }}
          />
        </CardContent>
      </Card>

      {/* Variable Length */}
      <Card>
        <CardHeader title="Variable Length (8 digits)" />
        <CardContent>
          <MuiOtpInput
            value={lengthOtp}
            onChange={handleLengthChange}
            length={8}
          />
        </CardContent>
      </Card>

      {/* Programmatic Focus */}
      <Card>
        <CardHeader title="Programmatic Focus" />
        <CardContent>
          <MuiOtpInput
            value={basicOtp}
            onChange={handleBasicChange}
            length={4}
            ref={otpRef}
          />
          <Button variant="contained" onClick={focusOtpInput} className="mt-2">
            Focus OTP Input
          </Button>
        </CardContent>
      </Card>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default OTPExamples;
