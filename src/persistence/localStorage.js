export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('products'));
    if (products) {
        return products;
    } else {
        return [];
    }
}


//gurdar en el local Storage 

export const setInLocalStorage = (productsIn) => {
    if (productsIn) {
        //traer elementos 
        let productsInLocal = handleGetProductLocalStorage();
        console.log(productsIn);
        const existingIndex = productsInLocal.findIndex((productsLocal) => productsLocal.id === productsIn.id)
        //verificar si el elemento existe 
        if (existingIndex !== -1) {
            //si existe debe remplazarse 
            productsInLocal[existingIndex] = productsIn;

        } else {
            //si no agregarse 
            productsInLocal.push(productsIn);

        }
        //setear el nuevo array
        localStorage.setItem('products', JSON.stringify(productsInLocal))
    }
}