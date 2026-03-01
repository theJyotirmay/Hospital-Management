





import React, { useState } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Box,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { alpha, useTheme } from '@mui/material/styles';
import PageShell from '../layout/PageShell';

const UserProfile = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userContact, setUserContact] = useState();
  const [userAddress, setUserAddress] = useState();
  const [userGender, setUserGender] = useState();
  const [userAge, setUserAge] = useState();

  const fetch_user = async () => {
    try {
      const response = await axios.get('http://localhost:8080/userdetails', {
        headers: {
          authorization: localStorage.getItem('jwt'),
        },
      });
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetch_user();
  }, [isEditing]);

  React.useEffect(() => {
    setUserName(user?.username);
    setUserEmail(user?.email);
    // setUserPassword("*********");
    setUserContact(user?.phone);
    setUserAddress(user?.location);
    setUserGender(user?.gender);
    setUserAge(user?.age);
  }, [user, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8080/updatepatient',
        {
          username: userName,
          email: userEmail,
          password: userPassword,
          phone: userContact,
          location: userAddress,
          age: userAge,
          gender: userGender,
        },
        {
          headers: {
            authorization: localStorage.getItem('jwt'),
          },
        }
      );

      setUserName('');
      setUserEmail('');
      setUserPassword('');
      setUserContact('');
      setUserAddress('');
      setUserGender('');
      setUserAge('');
      toast.success('Profile Updated Successfully');

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);

    setUserName('');
    setUserEmail('');
    setUserPassword('');
    setUserContact('');
    setUserAddress('');
    setUserGender('');
    setUserAge('');
  };

  return (
    <PageShell
      title="Your profile"
      subtitle="Review and update your personal details."
      maxWidth="md"
      actions={
        isEditing ? (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button variant="contained" color="primary" onClick={handleSaveClick} sx={{ fontWeight: 900 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancelClick} sx={{ fontWeight: 900 }}>
              Cancel
            </Button>
          </Stack>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ fontWeight: 900 }}>
            Edit
          </Button>
        )
      }
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={2.25}>
            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  label="Name"
                  fullWidth
                  value={userName || ''}
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Name</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{userName}</Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  label="Email"
                  fullWidth
                  value={userEmail || ''}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Email</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{userEmail}</Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  label="New password"
                  fullWidth
                  type="password"
                  value={userPassword || ''}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Password</Typography>
                  <Typography sx={{ fontWeight: 900 }}>********</Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  label="Contact"
                  fullWidth
                  value={userContact || ''}
                  onChange={(e) => setUserContact(e.target.value)}
                />
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Contact</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{userContact}</Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  label="Location"
                  fullWidth
                  value={userAddress || ''}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Location</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{userAddress}</Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <Box>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    value={userGender || ''}
                    onChange={(e) => setUserGender(e.target.value)}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </Box>
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Gender</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{userGender}</Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              {isEditing ? (
                <TextField
                  label="Age"
                  fullWidth
                  value={userAge || ''}
                  onChange={(e) => setUserAge(e.target.value)}
                />
              ) : (
                <Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Age</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{userAge}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default UserProfile;
