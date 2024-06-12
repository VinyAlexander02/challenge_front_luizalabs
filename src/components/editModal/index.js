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

export default function EditModal({
  open,
  onClose,
  vitrineId,
  vitrineTitle,
  vitrineProduct,
  onUpdate,
}) {
  const [title, setTitle] = useState(vitrineTitle);
  const [product, setProduct] = useState(vitrineProduct);

  useEffect(() => {
    setTitle(vitrineTitle);
    setProduct(vitrineProduct);
  }, [vitrineId, vitrineTitle, vitrineProduct]);

  const handleSave = () => {
    const updatedVitrine = {
      title: title,
      products: product,
    };

    onUpdate(vitrineId, updatedVitrine);

    onClose();
  };

  const handleUpdate = (vitrineId, updatedData) => {
    fetch(`https://fakestoreapi.com/products/${vitrineId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedVitrine) => {
        console.log("Vitrine atualizada:", updatedVitrine);
        // Aqui você pode adicionar lógica para atualizar a vitrine na tela ou no localStorage, se necessário
      })
      .catch((error) => {
        console.error("Erro ao atualizar vitrine:", error);
      });
  };

  return (
    <BootstrapDialog
      onClose={onClose}
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
        onClick={onClose}
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Produto"
              variant="outlined"
              required
              fullWidth
              value={product}
              onChange={(e) => setProduct(e.target.value)}
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
}
