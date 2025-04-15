

export function categoriesList(categories: any) {

    var categoriesList = [];
    for (let category of categories) {
        categoriesList.push(categoryObj(category));
    }

    let categoriesListMap = {main: [], list: {}};

    //console.log(categoriesList);

    for (let category of categoriesList) {
        
        let sub_categories = categoriesList.filter((c) => c.parent_category_id == category.id);
        let subcat_map = {};

        for (let category of sub_categories) {
            subcat_map[category.id] = category;
        }
        
        //console.log(subcat_map);
        //category["children"] = subcat_map;
        category["children"] = sub_categories;

        if(!category.parent_category_id) {
            // We couild also just send category IDs here, and let the receiver calculate these objects.
            // But this way is easier to use, and I don't expect too much data
            // Anyway, I don't like how this is being done. I should rewrite this.
            categoriesListMap["main"].push(category);
        }

        // let c_obj = {};
        // c_obj[category.id] = category;

        categoriesListMap["list"][category.id] = category;
    }

    // var queue = [];
    //categoriesList

    return categoriesListMap;
}

export function categoryObj(category: any) {

    return {
        id: category.id,
        name: category.name,
        parent_category_id: category.parent_category_id,
        parent: category.parent ? categoryObj(category.parent) : {}
    }
}