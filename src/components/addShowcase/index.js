import React, { useState, useEffect } from "react";
import "./style.css";
import { PiListThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { GrDirections } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
<<<<<<< HEAD
import EditModal from "../editModal";
import AddModal from "../addModal";
=======
import EditModal from "../modal";
import { useNavigate } from "react-router-dom";
>>>>>>> b44feff (Implement the navbar and chage the button to add a new showcase)

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

<<<<<<< HEAD
  const openModal = (vitrine) => {
    setSelectedVitrine(vitrine);
=======
  const navigate = useNavigate();

  const handleAddShowcase = () => {
    navigate("/add-showcase");
  };

  const openModal = () => {
>>>>>>> b44feff (Implement the navbar and chage the button to add a new showcase)
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
<<<<<<< HEAD
      {vitrines.map((vitrine) => (
        <div className="showCase" key={vitrine.id}>
          <div>
            <PiListThin />
          </div>
          <div className="showCaseDescription">
            <p>
              ({vitrine.id}) {vitrine.title} <br />
              Vitrine
            </p>
          </div>
          <div className="editIcons">
            <MdEdit onClick={() => openModal(vitrine)} />
            <GrDirections />
            <MdOutlineClose onClick={() => handleDelete(vitrine.id)} />
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
      <button className="addShowcase" onClick={handleAddShowcase}>
        + Adicionar Vitrine
      </button>
      {isAddModalOpen && (
        <AddModal
          open={isAddModalOpen}
          onClose={closeHandleAddShowcase}
          onSave={handleAdd}
        />
=======
      <div className="showCase">
        <div>
          <PiListThin />
        </div>
        <div className="showCaseDescription">
          <p>(2279) Sugestões com base no seu interesse <br/> Vitrine</p>
        </div>
        <div className="editIcons">
          <MdEdit onClick={openModal} />
          <GrDirections />
          <MdOutlineClose />
        </div>
      </div>
      {isModalOpen && (
        <EditModal open={isModalOpen} onClose={closeModal}/>
        // <div className="modal">
        //   <div className="modal-content">
        //     <span className="close" onClick={closeModal}>
        //       &times;
        //     </span>
        //     <form onSubmit={handleSubmit}>
        //       <div className="modalName">
        //         <label htmlFor="name">Nome:</label>
        //         <input
        //           type="text"
        //           id="name"
        //           name="name"
        //           value={formData.name}
        //           onChange={handleChange}
        //           required
        //         />
        //       </div>
        //       <div>
        //         <label htmlFor="description">Descrição:</label>
        //         <textarea
        //           id="description"
        //           name="description"
        //           value={formData.description}
        //           onChange={handleChange}
        //           required
        //         ></textarea>
        //       </div>
        //       {/* Adicione outros campos conforme necessário */}
        //       <button type="submit">Salvar</button>
        //     </form>
        //   </div>
        // </div>
>>>>>>> b44feff (Implement the navbar and chage the button to add a new showcase)
      )}
      <button className="addShowcase" onClick={handleAddShowcase}>
          + Adicionar Vitrine
        </button>
    </div>
  );
};

export default AddShowcase;
