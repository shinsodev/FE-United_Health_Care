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
import { specialtyService } from "@/services/specialtyService";
import { Specialty, SpecialtyFormData } from "@/types/specialty";

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
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

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const data = await specialtyService.getAll();
      setSpecialties(data || []);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch specialties",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

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
      if (editingId) {
        await specialtyService.update(editingId, formData);
        setSnackbar({
          open: true,
          message: "Specialty updated successfully",
          severity: "success",
        });
      } else {
        await specialtyService.create(formData);
        setSnackbar({
          open: true,
          message: "Specialty created successfully",
          severity: "success",
        });
      }
      handleCloseModal();
      fetchSpecialties();
    } catch (error) {
      console.error("Error saving specialty:", error);
      setSnackbar({
        open: true,
        message: "Failed to save specialty",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this specialty?")) {
      try {
        await specialtyService.delete(id);
        setSnackbar({
          open: true,
          message: "Specialty deleted successfully",
          severity: "success",
        });
        fetchSpecialties();
      } catch (error) {
        console.error("Error deleting specialty:", error);
        setSnackbar({
          open: true,
          message: "Failed to delete specialty",
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
        Specialties Management
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
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "8px 12px",
              outline: "none",
            }}
          />
          <Button variant="contained" sx={{ background: "#a855f7" }}>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specialties.map((specialty) => (
            <TableRow key={specialty.id}>
              <TableCell>{specialty.code}</TableCell>
              <TableCell>{specialty.name}</TableCell>
              <TableCell>
                {new Date(specialty.createdAt!).toLocaleDateString()}
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
          {specialties.length} results found. Showing page 1 of 1
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small">
            Previous
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#a855f7" }}
          >
            1
          </Button>
          <Button variant="outlined" size="small">
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
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
              required
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#a855f7" }}
              type="submit"
            >
              {editingId ? "Update" : "Create"}
            </Button>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
