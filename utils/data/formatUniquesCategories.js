const formatUniqueCategories = (dataArrayOfCategoriesSubCategoriesAndSubSubCategories) => {
    
    const flatArray = [];
    
    if (dataArrayOfCategoriesSubCategoriesAndSubSubCategories?.length > 0) {
        dataArrayOfCategoriesSubCategoriesAndSubSubCategories.forEach((item, index) => {
            const { categoryid, category, categoryimage, subcategoryid, subcategory, subsubcategoryid, subsubcategory } = item;

            // Add category if it has no subcategories
            if (!subcategory) {
                flatArray.push({
                    id: index,
                    name: category,
                    image: categoryimage,
                    category_id: categoryid,
                    subcategory_id: null,
                    subsubcategory_id: null,
                });
            }

            // Add subcategory if it has no subsubcategories
            if (subcategory && !subsubcategory) {
                flatArray.push({
                    id: index,
                    name: subcategory,
                    image: item.subcategoryimage,
                    category_id: categoryid,
                    subcategory_id: subcategoryid,
                    subsubcategory_id: null,
                });
            }

            // Add subsubcategory
            if (subsubcategory) {
                flatArray.push({
                    id: index,
                    name: subsubcategory,
                    image: item.subsubcategoryimage,
                    category_id: categoryid,
                    subcategory_id: subcategoryid,
                    subsubcategory_id: subsubcategoryid,
                });
            }
        });

        // Sort the array by name
        return flatArray.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        return [];
    }
}

export default formatUniqueCategories;
