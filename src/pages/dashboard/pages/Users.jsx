import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ismodalopen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [viewUserModalOpen, setViewUserModalOpen] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Filter users based on search, status, and role
  const filterUsers = (search, status, role) => {
    let filtered = users.filter((user) => {
      const nameMatch = `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const statusMatch = status ? user.status == status : true;
      const roleMatch = role ? user.role == role : true;
      return nameMatch && statusMatch && roleMatch;
    });
    setFilteredUsers(filtered);
  };

  // Handle Search, Status, and Role Filters
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value, statusFilter, roleFilter);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    filterUsers(searchQuery, e.target.value, roleFilter);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    filterUsers(searchQuery, statusFilter, e.target.value);
  };

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("No token found.");
      }

      const response = await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted user from both states
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));

      toast.success("User deleted successfully");
      setModalOpen(false);
      setViewUserModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error.response || error.message);
      toast.error("Error deleting user");
    }
  };

  // Open modal for deleting user
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Open modal for viewing user details
  const openViewUserModal = (user) => {
    setUserDetails(user);
    setSelectedUser(user); // Set selectedUser when opening view modal
    setViewUserModalOpen(true);
  };

  // Close modals
  const handleClose = () => {
    setModalOpen(false);
    setViewUserModalOpen(false);
    setSelectedUser(null);
    setUserDetails(null);
  };

  return (
    <div className="bg-red-50 dark:bg-gray-800" >
    <Box  sx={{ backgroundColor: "transparent", minHeight: "100vh", p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={handleStatusFilter}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={handleRoleFilter}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">Admin</MenuItem>
              <MenuItem value="2">User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" className="text-center font-extrabold p-2" gutterBottom>
            ALL <span className="text-[#3498db] font-extrabold text-3xl">{users.length}</span> Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.first_name} {user.last_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role == "1" ? "Admin" : "User"}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        <img
                          src={user?.image ? `http://localhost:8000/storage/${user.image}` : "/assets/images/userman.jpeg"}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                          alt="user"
                        />
                      </TableCell>
                      <TableCell>
                        {user.role == "1" ? null : (
                          <button
                            className="m-2 bg-[#e74c3c] text-white px-2 py-1 rounded"
                            onClick={() => openDeleteModal(user)}
                          >
                            Delete
                          </button>
                        )}
                        <button
                          className="bg-[#2980b9] text-white px-2 py-1 rounded mr-2"
                          onClick={() => openViewUserModal(user)}
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      <ToastContainer />

      {/* View User Modal */}
      {viewUserModalOpen && userDetails && (
        <div className="w-full h-screen flex items-center justify-center bg-black/70 fixed top-0 left-0 transition-all duration-300 ease-in-out">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full transform scale-95 transition-all duration-300 ease-in-out">
            <div className="flex justify-center mb-6">
              <img
                src={`http://localhost:8000/storage/${userDetails.image}`}
                alt="user"
                className="w-[150px] h-[150px] rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn">
              User Details
            </h2>
            <div className="text-white space-y-4">
              <p><strong className="text-yellow-300">Name:</strong> {userDetails.first_name} {userDetails.last_name}</p>
              <p><strong className="text-yellow-300">Email:</strong> {userDetails.email}</p>
              <p><strong className="text-yellow-300">Status:</strong> {userDetails.status}</p>
              <p><strong className="text-yellow-300">Role:</strong> {userDetails.role == "1" ? "Admin" : "User"}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
                onClick={handleClose}
              >
                Close
              </button>
              {userDetails.role != "1" && (
                <button
                  className="px-6 py-3 bg-[#e74c3c] text-white font-semibold rounded-lg shadow-md hover:bg-[#c0392b] transition-all duration-300 ml-2"
                  onClick={() => deleteUser(userDetails.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal */}
      {ismodalopen && selectedUser && (
        <div className="w-full h-screen flex items-center justify-center bg-black/50 fixed top-0 left-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Delete User</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-[#e74c3c] text-white rounded-md mr-2"
                onClick={() => deleteUser(selectedUser.id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-gray-900 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Box>
    </div>
  );
};

export default Users;