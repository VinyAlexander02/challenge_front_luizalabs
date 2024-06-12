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

  const handleSave = (newVitrine) => {
    const updatedVitrines = [...vitrines, newVitrine];
    setVitrines(updatedVitrines);
    localStorage.setItem("vitrines", JSON.stringify(updatedVitrines));
    console.log("Updated vitrines:", updatedVitrines); // Log the updated vitrines
  };

  useEffect(() => {
    const storedVitrines = JSON.parse(localStorage.getItem("vitrines")) || [];
    setVitrines(storedVitrines);
    console.log("Loaded vitrines from localStorage:", storedVitrines); // Log loaded vitrines
  }, []);

  return (
    <div>
      <h2>Vitrines</h2>
      {vitrines.map((vitrine, index) => (
        <div className="showCase" key={vitrine.id}> {/* Use the unique id as key */}
          <div>
            <PiListThin />
          </div>
          <div className="showCaseDescription">
            <p>
              {vitrine.id}
              {vitrine.title} <br />
              vitrine
            </p>
          </div>
          <div className="editIcons">
            <MdEdit onClick={openModal} />
            <GrDirections />
            <MdOutlineClose />
          </div>
        </div>
      ))}
      {isModalOpen && <EditModal open={isModalOpen} onClose={closeModal} />}
      <button className="addShowcase" onClick={handleAddShowcase}>
        + Adicionar Vitrine
      </button>
      {isAddModalOpen && (
        <AddModal
          open={isAddModalOpen}
          onClose={closeHandleAddShowcase}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AddShowcase;
