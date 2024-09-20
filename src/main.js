import { handleGetProductLocalStorage, setInLocalStorage } from "./persistence/localStorage.js";
import "../src/style.css"
import { renderCategories } from "./services/categories.js";
import { handleGetProductsToStore , handleRenderList} from "./views/store.js";
import { handleSearchProductByName } from "./services/searchBar.js";
import Swal from "sweetalert2";

//aplicacion 

export let activeCategory = null;
export const setActiveCategory = (categoryIn) => {
  activeCategory = categoryIn
}
handleGetProductsToStore();
renderCategories()
export let activeProduct = null
export let setActiveProduct = (productIn) => {
  activeProduct = productIn
}




// ========POPUP=========

const buttonAdd = document.getElementById('buttonAddElement');
const buttonCancel = document.getElementById('cancelButton');
    
buttonAdd.addEventListener('click', () => { openModal() })


//FUNCINOES ABRIR Y CERRAR MODAL
export const openModal = () => {
  const modal = document.getElementById("modalPopUp");
  modal.style.display = 'flex'
  const buttonDelete = document.getElementById("deleteButton")
  if (activeProduct) {
    buttonDelete.style.display = "block";
  } else {
    buttonDelete.style.display = "none";
  }

  if (activeProduct) {
    const title = document.getElementById("title"),
      img = document.getElementById("img"),
      price = document.getElementById("price"),
      categories = document.getElementById("category");
      title.value = activeProduct.title
      img.value = activeProduct.img
      price.value = activeProduct.price
      categories.value = activeProduct.categories


  }
}
buttonCancel.addEventListener('click', () => { 
  closeModal()})
 const closeModal = () => {
  console.log('aa') 
  const modal = document.getElementById("modalPopUp");
  modal.style.display = 'none' 
  setActiveProduct(null)
  resetModal()
}



  const resetModal = () => {
    const title = document.getElementById('title');
    const img = document.getElementById('img');
    const price = document.getElementById('price');
    const categories = document.getElementById('category');
    title.value = '';
    img.value = '';
    price.value = 0;
    categories.value = 'seleccione una categoria';
  }
  const acceptButton = document.getElementById('acceptButton')
  acceptButton.addEventListener('click', () => {
    handleSaveOrModifyElement()
  })


  const handleSaveOrModifyElement = () => {
    const title = document.getElementById('title').value;
    const img = document.getElementById('img').value;
    const price = document.getElementById('price').value;
    const categories = document.getElementById('category').value;
    console.log(categories.value)
    let newProduct = null
    if (activeProduct) {
      newProduct = {
        ...activeProduct,
        title,
        img,
        price,
        categories,
      }
    } else {
      newProduct = {
        id: new Date().toISOString(),
        title,
        img,
        price,
        categories,
      }
    };
    Swal.fire({
      title: "Correcto!",
      text: "Producto guardado correctamente!",
      icon: "success"
    });
    setInLocalStorage(newProduct)
    // Limpieza de los campos de entrada
    handleGetProductLocalStorage()
    closeModal()
  }

  
  

  
  // eliminar productos 
   const handleDeleteProducts=()=>{
    Swal.fire({
        title: "Desea eliminar elemento?",
        text: "Si lo eliminas sera permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
      if (result.isConfirmed) {
        const products = handleGetProductLocalStorage();
        const result = products.filter((el)=>el.id!== activeProduct.id)
      //setear el nuevo array 
      localStorage.setItem('products', JSON.stringify(result));
      const newProduct = handleGetProductsToStore();
      closeModal()
      handleRenderList(newProduct);
    }else{
      closeModal()
    }
  });
  }
    


  const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', ()=>{
      handlebuttonDelete()
    })
    const handlebuttonDelete=()=>{
        handleDeleteProducts()
    }

  ///buscar por nombre 
  const buttonSearch = document.getElementById("buttonSearch");
  buttonSearch.addEventListener('click', ()=>{
      handleSearchProductByName();
  });