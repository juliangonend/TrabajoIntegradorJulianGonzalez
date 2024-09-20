import { handleGetProductLocalStorage } from "../persistence/localStorage"
import { handleRenderList } from "../views/store"

export const handleSearchProductByName=()=>{
    const inputHeader = document.getElementById('inputHeader')
    const products =handleGetProductLocalStorage()
    const result = products.filter((el)=>
         el.title.toLowerCase().includes(inputHeader.value)

    );
    console.log(result)
    handleRenderList(result)
}