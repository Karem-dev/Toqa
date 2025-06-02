import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Trash2,
  Download,
  Upload,
  Plus,
  User,
  Smartphone,
  Mail,
  DollarSign,
  Search,
  Users,
  Edit2,
  ChevronUp,
  ChevronDown,
  Filter,
  MoreVertical,
  Calendar,
  BarChart2,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react";
import { TablePagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function UserManagement() {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("users");
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("darkMode");
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      console.error("Error loading theme from localStorage:", error);
      return false;
    }
  });

  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
    role: "User",
    paymentStatus: "Unpaid",
    amountPaid: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    try {
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      Swal.fire({
        icon: "error",
        title: "Storage Error",
        text: "Failed to save data. Please check your browser storage settings.",
      });
    }
  }, [users, darkMode]);

  const calculateTotalPayments = useCallback(() => {
    return users.reduce((total, user) => total + Number(user.amountPaid), 0);
  }, [users]);

  const validateUser = (user) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,}$/;

    if (!user.name || user.name.trim() === "") {
      errors.push("Name is required");
    }

    if (!phoneRegex.test(user.phone)) {
      errors.push("Invalid phone number (minimum 10 digits)");
    }

    if (user.email && !emailRegex.test(user.email)) {
      errors.push("Invalid email format");
    }

    if (Number(user.amountPaid) < 0) {
      errors.push("Amount paid cannot be negative");
    }

    return errors;
  };

  const addUser = async () => {
    const validationErrors = validateUser(newUser);

    if (validationErrors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Errors",
        html: validationErrors.map((error) => `<p>${error}</p>`).join(""),
      });
      return;
    }

    const result = await Swal.fire({
      title: editingIndex !== null ? "Update User?" : "Add New User?",
      text: "Are you sure you want to proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const userToSave = {
          ...newUser,
          email: newUser.email || null,
          paymentStatus: newUser.amountPaid > 0 ? "Paid" : "Unpaid",
        };

        if (editingIndex !== null) {
          const updatedUsers = [...users];
          updatedUsers[editingIndex] = userToSave;
          setUsers(updatedUsers);
          setEditingIndex(null);
        } else {
          setUsers([...users, userToSave]);
        }

        setNewUser({
          name: "",
          phone: "",
          email: "",
          role: "User",
          paymentStatus: "Unpaid",
          amountPaid: 0,
        });
        setIsModalOpen(false);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text:
            editingIndex !== null
              ? "User updated successfully!"
              : "User added successfully!",
        });
      } catch (error) {
        console.error("Error saving user:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save user. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteUser = async (index) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been removed.",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete user. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const editUser = (index) => {
    const userToEdit = users[index];
    setNewUser({
      ...userToEdit,
      email: userToEdit.email || "",
    });
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const saveUsersToFile = async () => {
    if (users.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Users",
        text: "There are no users to save",
      });
      return;
    }

    setIsLoading(true);
    try {
      const dataToSave = {
        users: users,
        darkMode: darkMode,
        exportDate: new Date().toISOString(),
      };

      const jsonString = JSON.stringify(dataToSave, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `user_management_${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error("Error exporting users:", error);
      Swal.fire({
        icon: "error",
        title: "Export Error",
        text: "Failed to export users. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsersFromFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      const parsedData = JSON.parse(text);
      const validUsers = Array.isArray(parsedData)
        ? parsedData
        : parsedData.users || [];

      const filteredUsers = validUsers.filter((user) => {
        const errors = validateUser(user);
        return errors.length === 0;
      });

      if (filteredUsers.length !== validUsers.length) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Users Removed",
          text: `${
            validUsers.length - filteredUsers.length
          } invalid users were filtered out`,
        });
      }

      setUsers(filteredUsers);

      if (parsedData.darkMode !== undefined) {
        setDarkMode(parsedData.darkMode);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a valid JSON file.",
        footer: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filter and search logic
  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPayment =
      paymentFilter === "All" || user.paymentStatus === paymentFilter;

    return matchesSearch && matchesPayment;
  });

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "n" && event.ctrlKey) {
        event.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const quickActions = [
    {
      icon: <Calendar size={20} />,
      label: "Schedule Payment",
      action: () => {},
    },
    {
      icon: <BarChart2 size={20} />,
      label: "View Analytics",
      action: () => {},
    },
    { icon: <Settings size={20} />, label: "Settings", action: () => {} },
    { icon: <Bell size={20} />, label: "Notifications", action: () => {} },
    { icon: <HelpCircle size={20} />, label: "Help", action: () => {} },
  ];

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-8 p-6 rounded-xl shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-gray-500">
                  Manage your users and track payments efficiently
                </p>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{filteredUsers.length}</h3>
            </div>
            <div className="p-3 bg-blue-500 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Payments</p>
              <h3 className="text-2xl font-bold">
                ${calculateTotalPayments().toFixed(2)}
              </h3>
            </div>
            <div className="p-3 bg-green-500 rounded-full">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Paid Users</p>
              <h3 className="text-2xl font-bold">
                {filteredUsers.filter((u) => u.paymentStatus === "Paid").length}
              </h3>
            </div>
            <div className="p-3 bg-purple-500 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Unpaid Users</p>
              <h3 className="text-2xl font-bold">
                {
                  filteredUsers.filter((u) => u.paymentStatus === "Unpaid")
                    .length
                }
              </h3>
            </div>
            <div className="p-3 bg-red-500 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className={`w-full mx-auto bg-white shadow-2xl rounded-xl overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4 transition-colors duration-300 ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <MoreVertical size={20} />
              </button>
              {showQuickActions && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        darkMode ? "hover:bg-gray-600" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {action.icon}
                        <span>{action.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={
                darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setNewUser({
                  name: "",
                  phone: "",
                  email: "",
                  role: "User",
                  paymentStatus: "Unpaid",
                  amountPaid: 0,
                });
                setEditingIndex(null);
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              <span>Add User</span>
            </motion.button>
          </div>
        </div>

        <div
          className={`p-4 flex flex-col sm:flex-row justify-between items-center gap-4 ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, phone, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 p-2 rounded-lg border w-full ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
            {showAdvancedFilters && (
              <div
                className={`absolute top-full left-0 mt-2 p-4 rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className={`p-2 rounded-lg border w-full ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="All">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveUsersToFile}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
            >
              <Download size={20} />
              <span>Export</span>
            </motion.button>
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg cursor-pointer disabled:opacity-50"
            >
              <Upload size={20} />
              <span>Import</span>
              <input
                type="file"
                accept="application/json"
                onChange={loadUsersFromFile}
                className="hidden"
                disabled={isLoading}
              />
            </motion.label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? "bg-gray-700" : "bg-gray-100"}>
              <tr>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("phone")}
                >
                  Phone{" "}
                  {sortConfig.key === "phone" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortConfig.key === "email" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("paymentStatus")}
                >
                  Payment Status{" "}
                  {sortConfig.key === "paymentStatus" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("amountPaid")}
                >
                  Amount Paid{" "}
                  {sortConfig.key === "amountPaid" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b ${
                    darkMode
                      ? index % 2 === 0
                        ? "hover:bg-gray-700 bg-gray-600"
                        : "hover:bg-gray-800 bg-gray-700"
                      : index % 2 === 0
                      ? "hover:bg-gray-100 bg-gray-50"
                      : "hover:bg-gray-300 bg-gray-100"
                  }`}
                >
                  <td className="p-4">
                    <User size={20} className="inline mr-3" />
                    {user.name}
                  </td>
                  <td className="p-4">
                    <Smartphone size={20} className="inline mr-3" />
                    <a
                      href={`https://wa.me/+2${user.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode ? "text-white" : "text-black"
                      } px-2 py-1 rounded hover:underline`}
                    >
                      {user.phone}
                    </a>
                  </td>
                  <td className="p-4">
                    <Mail size={20} className="inline mr-3" />
                    {user.email ? user.email : "N/A"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        user.paymentStatus === "Paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {user.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <DollarSign size={20} className="inline mr-3" />$
                    {Number(user.amountPaid).toFixed(2)}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => editUser(users.indexOf(user))}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteUser(users.indexOf(user))}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className={`p-4 text-center ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    No users found matching the criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              color: darkMode ? "#fff" : "#000",
              backgroundColor: darkMode ? "#374151" : "#f3f4f6",
              "& .MuiIconButton-root": {
                color: darkMode ? "#fff" : "#000",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  color: darkMode ? "#fff" : "#000",
                },
              "& .MuiTablePagination-menuItem": {
                color: darkMode ? "#fff" : "#000",
              },
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-2xl p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                {editingIndex !== null ? "Edit User" : "Add New User"}
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div className="relative">
                  <select
                    value={newUser.paymentStatus}
                    onChange={(e) =>
                      setNewUser({ ...newUser, paymentStatus: e.target.value })
                    }
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Amount Paid"
                    value={newUser.amountPaid}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        amountPaid: Number(e.target.value),
                      })
                    }
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-red-700 text-gray-100"
                        : "bg-red-500 text-white"
                    } hover:opacity-90 transition-opacity`}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addUser}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-lg bg-indigo-800 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading
                      ? "Saving..."
                      : editingIndex !== null
                      ? "Update"
                      : "Add"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
