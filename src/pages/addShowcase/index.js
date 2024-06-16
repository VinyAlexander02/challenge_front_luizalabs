import React, { useState, useEffect } from "react";
import "./style.css";
import { PiListThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import EditModal from "../../components/editModal";
import AddModal from "../../components/addModal";

const AddShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [vitrines, setVitrines] = useState([]);
  const [selectedVitrine, setSelectedVitrine] = useState(null);

  const handleAddShowcase = () => {
    setAddModalOpen(true);
  };

  const closeHandleAddShowcase = () => {
    setAddModalOpen(false);
  };

  const openModal = (vitrine) => {
    setSelectedVitrine(vitrine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVitrine(null);
  };

  const handleUpdate = (updatedData) => {
    const updatedVitrines = vitrines.map((vitrine) =>
      vitrine.id === updatedData.id ? { ...vitrine, ...updatedData } : vitrine
    );
    setVitrines(updatedVitrines);
    localStorage.setItem("vitrines", JSON.stringify(updatedVitrines));
  };

  const handleAdd = (newVitrineData) => {
    const updatedVitrines = [...vitrines, newVitrineData];
    setVitrines(updatedVitrines);
    localStorage.setItem("vitrines", JSON.stringify(updatedVitrines));
  };

  const handleDelete = (vitrineId) => {
    const updatedVitrines = vitrines.filter(
      (vitrine) => vitrine.id !== vitrineId
    );
    setVitrines(updatedVitrines);
    localStorage.setItem("vitrines", JSON.stringify(updatedVitrines));
  };

  useEffect(() => {
    const storedVitrines = JSON.parse(localStorage.getItem("vitrines")) || [];
    setVitrines(storedVitrines);
  }, []);

  return (
    <div>
      <h2>Vitrines</h2>
      {vitrines.map((vitrine) => (
        <div
          className="showCase"
          key={vitrine.id}
          data-testid={`showCase-${vitrine.id}`}
        >
          <div>
            <PiListThin />
          </div>
          <div className="showCaseDescription">
            <p>
              ( {vitrine.id} ) {vitrine.title} <br />
              Vitrine
            </p>
          </div>
          <div className="editIcons">
            <MdEdit
              onClick={() => openModal(vitrine)}
              data-testid="edit"
              style={{ cursor: "pointer" }}
            />
            <MdOutlineClose
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(vitrine.id)}
              data-testid="delete"
            />
          </div>
        </div>
      ))}
      {isModalOpen && (
        <EditModal
          open={isModalOpen}
          onClose={closeModal}
          onUpdate={handleUpdate}
          vitrine={selectedVitrine}
        />
      )}
      <button className="addShowcaseBtn" onClick={handleAddShowcase}>
        + Adicionar Vitrine
      </button>
      {isAddModalOpen && (
        <AddModal
          open={isAddModalOpen}
          onClose={closeHandleAddShowcase}
          onSave={handleAdd}
        />
      )}
    </div>
  );
};

export default AddShowcase;
