import React, { useState } from "react";
import "./style.css";
import { PiListThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { GrDirections } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
import EditModal from "../modal";
import { useNavigate } from "react-router-dom";

const AddShowcase = () => {
  const [formData, setFormData] = useState({
    name: "(Nome da Vitrine)",
    description: "(Descrição da Vitrine)",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    console.log("Nova vitrine cadastrada:", formData);
    closeModal();
    // Redirecione ou execute outras ações conforme necessário
  };

  const navigate = useNavigate();

  const handleAddShowcase = () => {
    navigate("/add-showcase");
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
      )}
      <button className="addShowcase" onClick={handleAddShowcase}>
          + Adicionar Vitrine
        </button>
    </div>
  );
};

export default AddShowcase;
