// ====================Store===============

import { openModal, setActiveProduct } from "../main"
import { handleGetProductLocalStorage } from "../persistence/localStorage"

export const handleGetProductsToStore=()=>{
    
    const products = handleGetProductLocalStorage()
    handleRenderList(products)
}





export const handleRenderList=(productsIn)=>{
    const burgers = productsIn.filter((el)=> el.categories == 'hamburguesas')
    const papas = productsIn.filter((el)=> el.categories == 'papas')
    const gaseosas = productsIn.filter((el)=> el.categories == 'gaseosas')

    
    const renderProductGroup = (products , title)=>{
    if(products.length>0){
        const productsHTML = products.map((product, index)=>{
            return `<div class="containerTargetItem" id='product-${product.categories}-${index}'>
                <div>
                    <img src=${product.img}>
                </div>
                <div>
                    <p><b> ${product.title}</b></p>
                </div>
                <div>
                    <p><b>Precio :$ ${product.price}</b></p>
                </div>
            </div>`
            });

        return  `
        <section class="sectionStore">
        <h3>${title}</h3>
        <div class="containerProductStore">
            ${productsHTML.join('')}
        </div>
        </section>`;
    }else{

        return ''
    }
    
}
    //renderizar cada uno de los productos dentro de su categoria 


    const appContainer = document.getElementById('storeContainer')
    appContainer.innerHTML = `
    ${renderProductGroup(burgers , "Hamburguesas")}
    ${renderProductGroup(papas , "Papas")}
    ${renderProductGroup(gaseosas , "Gaseosas")}
    `

//añadiendo eventos de manera dinamica 
    const addEvents = (productIn )=>{
        if(productIn){
            productIn.forEach((element , index) => {
                const productContainer = document.getElementById(`product-${element.categories}-${index}`)
            productContainer.addEventListener('click', ()=>{
                setActiveProduct(element)
                openModal()
            })
        })
        }}
    addEvents(burgers)
    addEvents(papas)
    addEvents(gaseosas)
    }