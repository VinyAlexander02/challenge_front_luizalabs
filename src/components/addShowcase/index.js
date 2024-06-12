import React, { useState, useEffect } from "react";
import "./style.css";
import { PiListThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { GrDirections } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
import EditModal from "../editModal";
import AddModal from "../addModal";

const AddShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [vitrines, setVitrines] = useState([]);

  const handleAddShowcase = () => {
    setAddModalOpen(true);
  };

  const closeHandleAddShowcase = () => {
    setAddModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (vitrineId, updatedData) => {
    const updatedVitrines = vitrines.map((vitrine) =>
      vitrine.id === vitrineId ? { ...vitrine, ...updatedData } : vitrine
    );
    setVitrines(updatedVitrines);
    localStorage.setItem("vitrines", JSON.stringify(updatedVitrines));
  };

  const handleAdd = (newVitrineData) => {
    setVitrines([...vitrines, newVitrineData]);
    localStorage.setItem(
      "vitrines",
      JSON.stringify([...vitrines, newVitrineData])
    );
  };

  useEffect(() => {
    const storedVitrines = JSON.parse(localStorage.getItem("vitrines")) || [];
    setVitrines(storedVitrines);
  }, []);

  return (
    <div>
      <h2>Vitrines</h2>
      {vitrines.map((vitrine) => (
        <div className="showCase" key={vitrine.id}>
          <div>
            <PiListThin />
          </div>
          <div className="showCaseDescription">
            <p>
              ({vitrine.id}){vitrine.products}
              {vitrine.title}
            </p>
          </div>
          <div className="editIcons">
            <MdEdit
              onClick={() =>
                openModal(vitrine.id, vitrine.title, vitrine.products)
              }
            />
            <GrDirections />
            <MdOutlineClose />
          </div>
        </div>
      ))}
      {isModalOpen && (
        <EditModal
          open={isModalOpen}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
      <button className="addShowcase" onClick={handleAddShowcase}>
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
