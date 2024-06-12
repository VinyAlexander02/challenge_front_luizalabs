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
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const newVitrine = {
      id: uuidv4(),
      title: title,
      products: products,
    };

    console.log("Saving new vitrine:", newVitrine); // Log the new vitrine

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newVitrine),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Response from API:", json); // Log the response
        onSave(json);
        handleClose();
      })
      .catch((error) => {
        console.error("Error saving vitrine:", error); // Log any errors
      });
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
}
