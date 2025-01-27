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

const EditModal = ({ open, onClose, onUpdate, vitrine }) => {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (vitrine) {
      setTitle(vitrine.title || "");
      setProducts(vitrine.products || "");
    }
  }, [vitrine]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    if (title === "") {
      swal("Ops!", "O campo título precisa ser preenchido", "error");
      return;
    }

    if (products === "") {
      swal("Ops!", "O campo produtos precisa ser preenchido", "error");
      return;
    }

    const validation = await validateProductIds(products);

    if (!validation.isValid) {
      setErrorMessage(`Os seguintes IDs são inválidos: ${validation.invalidIds.join(', ')}`);
      swal('OPS!', `Os seguintes IDs são inválidos: ${validation.invalidIds.join(', ')}`, 'error');
      return;
    }

    setErrorMessage(""); // Limpa qualquer erro anterior

    const updatedVitrine = {
      id: vitrine.id,
      title,
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
              id="products"
              label="Produtos"
              variant="outlined"
              required
              fullWidth
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              placeholder='ex: 1,2,3,4,5'
            />
          </Grid>
        </Grid>
        {errorMessage && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}
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
