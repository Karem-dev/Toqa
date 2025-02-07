import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Avatar, Paper, Snackbar } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setFormData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...user });
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...user });
    setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      handleImageUpload(formData);
    }
  };

  const handleImageUpload = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/upload-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(prev => ({ ...prev, image: response.data.image }));
      toast.success("Profile image updated successfully"); // Show success toast
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading image"); // Show error toast
    }
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors) {
      setError("Please fill all required fields correctly");
      return;
    }

    try {
      setLoading(true); // Add loading state

      // Create FormData object
      const formDataObj = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        // Skip null or undefined values
        if (formData[key] != null && formData[key] !== undefined) {
          // Handle file objects separately
          if (key === 'image' && formData[key] instanceof File) {
            formDataObj.append('image', formData[key]);
          } else if (key !== 'image') { // Don't append image if it's not a File
            formDataObj.append(key, formData[key]);
          }
        }
      });

      // Log the request payload for debugging
      console.log('Form Data Contents:');
      for (let pair of formDataObj.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/user/update",
        formDataObj,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            // Let axios set the Content-Type with boundary for FormData
          }
        }
      );

      if (response.data.user) {
        setUser(response.data.user);
        setIsEditing(false);
        setError(null);
        toast.success("Profile updated successfully"); // Success toast
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Update Error:', error);
      console.error('Error Response:', error.response?.data);

      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update profile"
      );
      toast.error(error.response?.data?.message || "Failed to update profile"); // Error toast
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.first_name?.trim()) return "First name is required";
    if (!formData.last_name?.trim()) return "Last name is required";
    if (!formData.email?.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Card sx={{ padding: 3 }}>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>
          )}

          {user && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 2, textAlign: "center" }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        marginBottom: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                      src={user.image ? `http://localhost:8000/storage/${user.image}` : "/assets/images/default-avatar.png"}
                      alt={user.first_name}
                    />
                  </label>
                  <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={!isEditing}
                    value={formData.first_name || ''}
                    name="first_name"
                    onChange={handleChange}
                    error={error && !formData.first_name}
                    helperText={error && !formData.first_name && "First name is required"}
                  />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={!isEditing}
                    value={formData.last_name || ''}
                    name="last_name"
                    onChange={handleChange}
                    error={error && !formData.last_name}
                    helperText={error && !formData.last_name && "Last name is required"}
                  />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={!isEditing}
                    value={formData.email || ''}
                    name="email"
                    onChange={handleChange}
                    error={error && !formData.email}
                    helperText={error && !formData.email && "Email is required"}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} variant="contained" color="primary">
                        Save Changes
                      </Button>
                      <Button onClick={handleCancel} variant="outlined">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEdit} variant="contained" color="secondary">
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      <ToastContainer />
    </Box>
  );
};

export default Profile;
