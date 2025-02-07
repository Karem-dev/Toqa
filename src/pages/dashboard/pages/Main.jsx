import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { User } from "lucide-react";

// Setting up Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Main = () => {
  // Graph Data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Website Views",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Daily Sales",
        data: [33, 53, 85, 41, 44, 65, 50],
        backgroundColor: "#66bb6a",
      },
    ],
  };

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("auth_token")); // Assuming token is stored in localStorage
const [activeusers , setactiveusers]= useState([]);
const [inactiveusers , setinactiveusers]= useState([]);
const [admins , setadmins]= useState([]);
const [user , setuser]= useState([]);
  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setactiveusers(response.data.filter(user => user.status == "active"));
      setinactiveusers(response.data.filter(user => user.status!= "active"));
      setadmins(response.data.filter(user => user.role ==1));
      setuser(response.data.filter(user => user.role ==2));

      // Update the users state with the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]); // Run effect when token changes



  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[ 
          { title: "All Users", value: users.length, change: "+3%", color: "#10b33b" },
          { title: "ADMINS", value: admins.length, change: "Just updated", color: "#1f7ef2" },
        { title: "USERS", value: user.length, change: "Just updated", color: "#0eaaed" },
          { title: "Active Users", value: activeusers.length, change: "+55%", color: "#ed600e" },
          { title: "Inactive Users", value: inactiveusers.length, change: "+1%", color: "#101412" },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: `${stat.color}`, color: "white" }}>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2">{stat.change}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graph Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Website Views (Line Chart)
              </Typography>
              <Line data={lineChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Sales (Bar Chart)
              </Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Some Users 
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>status</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, 5).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name} {user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className={`${user.role ==1 ? "text-green-500" : "text-gray-500"}`}>
  {user.role == 1 ? "Admin" : "User"}
</TableCell>

                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <img  src={
            user?.image
              ? `http://localhost:8000/storage/${user.image}`  // Corrected string interpolation
              : "/assets/images/userman.jpeg"
          } className="w-[50px] h-[50px] rounded-full object-cover" alt="user" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Main;
