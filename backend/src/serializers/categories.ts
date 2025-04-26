const AttributesSerializer = require("../serializers/attributes");

export function categoriesList(categories: any) {

    var categoriesList = [];
    for (let category of categories) {
        categoriesList.push(categoryObj(category));
    }

    let categoriesListMap = {main: [], list: {}};

    for (let category of categoriesList) {
        
        let sub_categories = categoriesList.filter((c) => c.parent_category_id == category.id);
        let subcat_map = {};

        for (let category of sub_categories) {
            subcat_map[category.id] = category;
        }
        
        category["children"] = sub_categories;

        if(!category.parent_category_id) {
            // We couild also just send category IDs here, and let the receiver calculate these objects.
            // But this way is easier to use, and I don't expect too much data
            // Anyway, I don't like how this is being done. I should rewrite this.
            categoriesListMap["main"].push(category);
        }

        categoriesListMap["list"][category.id] = category;
    }

    return categoriesListMap;
}

export function categoryObj(category: any) {

    return {
        id: category.id,
        name: category.name,
        parent_category_id: category.parent_category_id,
        parent: category.parent ? categoryObj(category.parent) : {},
        attributes: AttributesSerializer.attributesList(category.attributes)
    }
}

export function baseCategoryObj(category: any) {

    if(!category)
        return {};

    return {
        id: category.id,
        name: category.name
    }
}