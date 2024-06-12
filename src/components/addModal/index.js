// AddModal.js

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
  const [category, setCategory] = useState("");

  const handleClose = () => {
    onClose();
  };

  const generateId = () => {
    const min = 1000;
    const max = 9999;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString();
  };

  const handleSave = () => {
    const newVitrine = {
      id: generateId(),
      title: title,
      price: price,
      description: description,
      image: "https://i.pravatar.cc",
      category: category,
    };

    console.log("Saving new vitrine:", newVitrine);

    onSave(newVitrine);

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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
