import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, TextField } from "@mui/material";
import validateProductIds from "../products"; 
import swal from "sweetalert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    const validationResult = await validateProductIds(products);

    if (!validationResult.isValid) {
      setError(
        `IDs inválidos encontrados: ${validationResult.invalidIds.join(", ")}`
      );
      swal(
        "OPS!",
        `Os seguintes IDs são inválidos: ${validationResult.invalidIds.join(", ")}`,
        "error"
      );
      return;
    }

    const newVitrine = {
      id: generateId(),
      title,
      price,
      description,
      image: "https://i.pravatar.cc",
      products,
    };

    onSave(newVitrine);
    handleClose();
  };

  const generateId = () => {
    const min = 1000;
    const max = 9999;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Adicionar Vitrine
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          left: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Título"
              variant="outlined"
              required
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Preço"
              variant="outlined"
              required
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Produtos"
              variant="outlined"
              required
              fullWidth
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddModal;
