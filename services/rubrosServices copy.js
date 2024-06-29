import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const rubrosApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getItemsServices: builder.query({
      query: async () => {
        let combinedData = [];
        
        try {
          // Obtener datos de categorías, subcategorías y subsubcategorías
          const [categoriesResponse, subcategoriesResponse, subsubcategoriesResponse] = await Promise.all([
            fetch(`${baseUrl}/categories.json`),
            fetch(`${baseUrl}/subcategories.json`),
            fetch(`${baseUrl}/subsubcategories.json`),
          ]);

          // Verificar si las respuestas son válidas
          if (!categoriesResponse.ok || !subcategoriesResponse.ok || !subsubcategoriesResponse.ok) {
            throw new Error('Error al obtener datos del servidor');
          }

          const categoriesData = await categoriesResponse.json();
          const subcategoriesData = await subcategoriesResponse.json();
          const subsubcategoriesData = await subsubcategoriesResponse.json();

          // Verificar si los datos se cargaron correctamente
          console.log("Categorías:", categoriesData);
          console.log("Subcategorías:", subcategoriesData);
          console.log("Subsubcategorías:", subsubcategoriesData);

          // Transformar y combinar los datos según la estructura deseada
          combinedData = [];

          // Iterar sobre las categorías
          Object.entries(categoriesData).forEach(([categoryId, category]) => {
            const categoryName = category.name;
            const categoryImage = category.img_name;

            // Filtrar subcategorías pertenecientes a esta categoría
            const matchingSubcategories = Object.values(subcategoriesData).filter(subcategory => subcategory.category_id === Number(categoryId));

            // Iterar sobre las subcategorías
            matchingSubcategories.forEach(subcategory => {
              const subcategoryId = subcategory.id;
              const subcategoryName = subcategory.name;
              const subcategoryImage = subcategory.img_name;

              // Filtrar subsubcategorías pertenecientes a esta subcategoría
              const matchingSubsubcategories = Object.values(subsubcategoriesData).filter(subsubcategory => subsubcategory.subcategory_id === subcategoryId);

              // Iterar sobre las subsubcategorías y construir los objetos finales
              matchingSubsubcategories.forEach(subsubcategory => {
                const subsubcategoryId = subsubcategory.id;
                const subsubcategoryName = subsubcategory.name;
                const subsubcategoryImage = subsubcategory.image;

                // Construir el objeto según la estructura deseada
                combinedData.push({
                  categoryid: Number(categoryId),
                  category: categoryName,
                  categoryimage: categoryImage,
                  subcategoryid: subcategoryId,
                  subcategory: subcategoryName,
                  subcategoryimage: subcategoryImage,
                  subsubcategoryid: subsubcategoryId,
                  subsubcategory: subsubcategoryName,
                  subsubcategoryimage: subsubcategoryImage,
                });
              });
            });
          });

        } catch (error) {
          console.error("Error al obtener datos:", error);
          throw error; // Lanzar el error para que sea manejado por RTK Query
        }
        console.log('Datos combinados:', combinedData);
        return combinedData;
      },
    }),
  }),
});

export const { useGetItemsServicesQuery } = rubrosApi;
