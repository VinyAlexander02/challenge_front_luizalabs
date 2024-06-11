import React, { useState } from "react";
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

  return (
    <div>
      <h2>Vitrines</h2>
      <div className="showCase">
        <div>
          <PiListThin />
        </div>
        <div className="showCaseDescription">
          <p>
            (2279) Sugestões com base no seu interesse <br /> Vitrine
          </p>
        </div>
        <div className="editIcons">
          <MdEdit onClick={openModal} />
          <GrDirections />
          <MdOutlineClose />
        </div>
      </div>
      {isModalOpen && <EditModal open={isModalOpen} onClose={closeModal} />}
      <button className="addShowcase" onClick={handleAddShowcase}>
        + Adicionar Vitrine
      </button>
      {isAddModalOpen && (
        <AddModal open={isAddModalOpen} onClose={closeHandleAddShowcase} />
      )}
    </div>
  );
};

export default AddShowcase;
