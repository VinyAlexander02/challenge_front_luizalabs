// Função para buscar todos os produtos da API
const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  };
  
  // Função para validar os IDs dos produtos
  const validateProductIds = async (productIds) => {
    const allProducts = await fetchProducts();
    const validIds = allProducts.map(product => product.id);
    const ids = productIds.split(',').map(id => parseInt(id.trim()));
  
    const invalidIds = ids.filter(id => !validIds.includes(id));
  
    if (invalidIds.length > 0) {
      return {
        isValid: false,
        invalidIds
      };
    } else {
      return { isValid: true };
    }
  };
  
  export default validateProductIds;
  