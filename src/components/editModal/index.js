import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditModal = ({ open, onClose, onUpdate, vitrine }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    if (vitrine) {
      setTitle(vitrine.title || "");
      setPrice(vitrine.price || "");
      setDescription(vitrine.description || "");
      setProducts(vitrine.products || "");
    }
  }, [vitrine]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const updatedVitrine = {
      id: vitrine.id,
      title,
      price,
      description,
      products,
    };

    onUpdate(updatedVitrine);
    handleClose();
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
        Editar Vitrine
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
        <p style={{ fontSize: "12px", color: "gray", marginBottom: "15px" }}>
          Código da Vitrine: {vitrine && vitrine.id}
        </p>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="title"
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
              id="price"
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
              id="description"
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
              id="products"
              label="Produtos"
              variant="outlined"
              required
              fullWidth
              value={products}
              onChange={(e) => setProducts(e.target.value)}
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

export default EditModal;
