"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { Specialty, SpecialtyFormData } from "@/types/backend";

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<Specialty[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<SpecialtyFormData>({
    name: "",
    code: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // default to page 1
  const [totalPages, setTotalPages] = useState(0);

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://appointment-service-e6za.onrender.com/api/v1/specialties?page=${currentPage}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Cannot fetch specialties");
      }
      const data = await res.json();
      const specialtiesData = data.data.items || [];

      if (!Array.isArray(specialtiesData)) {
        throw new Error("Data is not an array");
      }
      setSpecialties(specialtiesData);
      setFilteredSpecialties(specialtiesData); // initial list
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch specialties",
        severity: "error",
      });
      setSpecialties([]);
      setFilteredSpecialties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties(); // Only fetch specialties on initial mount or page change
  }, [currentPage]); // Trigger effect when currentPage changes

  const handleSearch = () => {
    const lowercased = searchText.toLowerCase();
    const filtered = specialties.filter((s) =>
      s.name.toLowerCase().includes(lowercased)
    );
    setFilteredSpecialties(filtered);
  };

  const handleOpenModal = (specialty?: Specialty) => {
    if (specialty) {
      setEditingId(specialty.id!);
      setFormData({ name: specialty.name, code: specialty.code });
    } else {
      setEditingId(null);
      setFormData({ name: "", code: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingId(null);
    setFormData({ name: "", code: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://appointment-service-e6za.onrender.com/api/v1/specialties/${editingId}`
        : "https://appointment-service-e6za.onrender.com/api/v1/specialties";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Cannot ${editingId ? "update" : "create"} specialty`
        );
      }
      const responseData = await res.json();
      setSnackbar({
        open: true,
        message:
          responseData.message ||
          `Specialty has been ${
            editingId ? "updated" : "created"
          } successfully`,
        severity: "success",
      });
      handleCloseModal();
      fetchSpecialties(); // Refresh data after submit
    } catch (error) {
      console.error(
        `Error when ${editingId ? "updating" : "creating"} specialty:`,
        error
      );
      setSnackbar({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : `Cannot ${editingId ? "update" : "create"} specialty`,
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this specialty?")) {
      try {
        const res = await fetch(
          `https://appointment-service-e6za.onrender.com/api/v1/specialties/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Cannot delete specialty");
        }
        const responseData = await res.json();
        setSnackbar({
          open: true,
          message:
            responseData.message || "Specialty has been deleted successfully",
          severity: "success",
        });
        fetchSpecialties(); // Refresh data after deletion
      } catch (error) {
        console.error("Error when deleting specialty:", error);
        setSnackbar({
          open: true,
          message:
            error instanceof Error ? error.message : "Cannot delete specialty",
          severity: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        borderRadius: 3,
        backgroundColor: "#fff",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Specialty Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Specialty List
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "8px 12px",
              outline: "none",
            }}
          />
          <Button
            variant="contained"
            sx={{ background: "#a855f7" }}
            onClick={handleSearch}
          >
            <FilterListIcon />
          </Button>
          <Button variant="outlined" onClick={() => handleOpenModal()}>
            Add Specialty
          </Button>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Doctors</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSpecialties.map((specialty) => (
            <TableRow key={specialty.id}>
              <TableCell>{specialty.code}</TableCell>
              <TableCell>{specialty.name}</TableCell>
              <TableCell>
                {new Date(specialty.createdAt!).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {specialty.doctors && specialty.doctors.length > 0
                  ? specialty.doctors
                      .map((doctor) => doctor.fullName)
                      .join(", ")
                  : "No doctors"}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleOpenModal(specialty)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(specialty.id!)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body2">
          Displaying page {currentPage}/{totalPages}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              size="small"
              sx={{
                backgroundColor:
                  currentPage === index + 1 ? "#a855f7" : "transparent",
              }}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            width: 400,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editingId ? "Edit Specialty" : "Create New Specialty"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained">
                {editingId ? "Update" : "Create"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
