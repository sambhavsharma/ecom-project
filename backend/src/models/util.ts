const Brand = require("../models/brand");
const Category = require("../models/category");

export async function getMenu() {

    try {
        let menu = []

        menu.push(await getBrandMenu());
        menu = [
            ...menu,
            ...await getCategoryMenu()
        ]
        
        return menu;

    } catch (error) { 
        // console.log(error);
        return {error};
    }
}

async function getBrandMenu() {
    
    let designerMenu = {
        title: 'Designer',
        code: 'designer'
    }

    const brands = await Brand.list({}, 20);
    designerMenu['children'] = brands;

    return designerMenu;
}

async function getCategoryMenu() {
    
    let categoryMenu = [];
    const categories = await Category.listMenu();

    for (let mainCategory of categories.main) {
        categoryMenu.push({
            title: mainCategory.name,
            code: mainCategory.code,
            children: mainCategory.children,
        })
    }

    return categoryMenu;
}