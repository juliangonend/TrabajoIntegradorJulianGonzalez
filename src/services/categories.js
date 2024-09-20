// ======CATEGOIRA===

import { activeCategory } from "../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

const handleFilterProductsByCategory=(categoryIn)=>{
    const products = handleGetProductLocalStorage()
  
    switch(categoryIn){
        case activeCategory:
            handleRenderList(products)
            break;
        case "todo" :
            handleRenderList(products)
            break;
        case "hamburguesas" :
        case "papas"   :
        case "gaseosas":
            const result = products.filter((el)=> el.categories  == categoryIn)
            handleRenderList(result)
            break
        case "mayorPrecio":
            const resultPrecio = products.sort((a,b)=> b.price - a.price);
            handleRenderList(resultPrecio)
            break
        case "menorPrecio":
            const resultPrecioMenor = products.sort((a,b)=> a.price - b.price);
            handleRenderList(resultPrecioMenor)
            break
        default: 
            break
    }



}

export const renderCategories =()=>{
    const ulList = document.getElementById('listFilter')
    ulList.innerHTML=`
    <li id="todo">Todos los productos </li>
    <li id="hamburguesas">Hamburguesas</li>
    <li id="papas">Papas</li>
    <li id="gaseosas">Gaseosas</li>
    <li id="mayorPrecio">Mayor Precio </li>
    <li id="menorPrecio">Menor Precio </li>
    `;

    const liElements = ulList.  querySelectorAll('li');
    liElements.forEach((liElement)=>{
        liElement.addEventListener('click',()=>{
            handleClick(liElement)
        })
    })
    const handleClick=(element)=>{
        handleFilterProductsByCategory(element.id)
        liElements.forEach((el)=>{
            if (el.classList.contains("liActive")){
                el.classList.remove("liActive");
            }else{
                if(element==el){
                    el.classList.add("liActive")
                }
            }
        })
    }
};