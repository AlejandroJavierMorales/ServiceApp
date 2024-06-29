const formatRubrosData = (categoriesData, subcategoriesData, subsubcategoriesData) =>{
    if (categoriesData && subcategoriesData && subsubcategoriesData) {
        const combinedData = [];
        // Convertir los datos en arrays ordenados
        const categoriesArray = Object.values(categoriesData).sort((a, b) => a.name.localeCompare(b.name));
        const subcategoriesArray = Object.values(subcategoriesData).sort((a, b) => a.name.localeCompare(b.name));
        const subsubcategoriesArray = Object.values(subsubcategoriesData).sort((a, b) => a.name.localeCompare(b.name));
    
        // Iterar sobre las categorías
        categoriesArray.forEach(category => {
          const categoryId = category.id;
          const categoryName = category.name;
          const categoryImage = category.img_name;
    
          // Filtrar subcategorías pertenecientes a esta categoría
          const matchingSubcategories = subcategoriesArray.filter(subcategory => subcategory.category_id === categoryId);
    
          // Iterar sobre las subcategorías
          matchingSubcategories.forEach(subcategory => {
            const subcategoryId = subcategory.id;
            const subcategoryName = subcategory.name;
            const subcategoryImage = subcategory.img_name;
    
            // Filtrar subsubcategorías pertenecientes a esta subcategoría
            const matchingSubsubcategories = subsubcategoriesArray.filter(subsubcategory => subsubcategory.subcategory_id === subcategoryId);
    
            // Iterar sobre las subsubcategorías
            matchingSubsubcategories.forEach(subsubcategory => {
              const subsubcategoryId = subsubcategory.id;
              const subsubcategoryName = subsubcategory.name;
              const subsubcategoryImage = subsubcategory.image;
    
              // Construir el objeto según la estructura deseada
              combinedData.push({
                subcategoryid: subcategoryId,
                subcategory: subcategoryName,
                subcategoryimage: subcategoryImage,
                subsubcategoryid: subsubcategoryId,
                subsubcategory: subsubcategoryName,
                subsubcategoryimage: subsubcategoryImage,
                categoryid: categoryId,
                category: categoryName,
                categoryimage: categoryImage,
              });
            });
    
            // Si no hay subsubcategorías para esta subcategoría, agregar solo la subcategoría
            if (matchingSubsubcategories.length === 0) {
              combinedData.push({
                subcategoryid: subcategoryId,
                subcategory: subcategoryName,
                subcategoryimage: subcategoryImage,
                subsubcategoryid: null,
                subsubcategory: null,
                subsubcategoryimage: null,
                categoryid: categoryId,
                category: categoryName,
                categoryimage: categoryImage,
              });
            }
          });
    
          // Si no hay subcategorías para esta categoría, agregar solo la categoría
          if (matchingSubcategories.length === 0) {
            combinedData.push({
              subcategoryid: null,
              subcategory: null,
              subcategoryimage: null,
              subsubcategoryid: null,
              subsubcategory: null,
              subsubcategoryimage: null,
              categoryid: categoryId,
              category: categoryName,
              categoryimage: categoryImage,
            });
          }
        });
        return combinedData;
      }
}
export {formatRubrosData};