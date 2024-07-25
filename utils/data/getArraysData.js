import { useContext } from "react";
import { GeneralContext } from "../../context/GeneralContext";
const { dataOfServer
    } = useContext(GeneralContext);

const getArraysData = () => {

    

    //Procesa los datos brutos del servidor (Categorias-SubCategorias y SubSubCategorias 
    //Saca las Categorias Unicas y Subcategorias Unicas ya que  dataOfServer es 
    //Categorias LeftJoin SubCategorias Left JOin SubSubCategorias 
   
    // Creamos un objeto de mapa para almacenar categorías únicas.
    const uniqueCategoriesMap = new Map();
    const uniqueSubCategoriesMap = new Map();
    // Iteramos sobre el array de objetos resultantes.
    dataOfServer.forEach(item => {
        // Verificamos si la categoría ya está en el mapa.
        if (!uniqueCategoriesMap.has(item.categoryid)) {
            // Si no está en el mapa, la añadimos con su ID como clave y el objeto completo como valor.
            uniqueCategoriesMap.set(item.categoryid, item);
        }
        if (!uniqueSubCategoriesMap.has(item.subcategoryid)) {
            uniqueSubCategoriesMap.set(item.subcategoryid, item);
        }
    });

    const uniqueCategories = Array.from(uniqueCategoriesMap.values());
    const uniqueSubCategories = Array.from(uniqueSubCategoriesMap.values());

    setCategories(uniqueCategories); //Setea array de Categorias en la variable de contexto correspondiente
    setSubCategories(uniqueSubCategories);//Setea array de SubCategorias en la variable de contexto correspondiente


}
export default getArraysData;