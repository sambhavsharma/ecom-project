
export function brandsList(brands: any) {

    let brandsList = []
    
    if(!brands)
        return brandsList;

    for (let brand of brands) {
        brandsList.push(brandObj(brand))
    }
    return brandsList;
}

export function brandObj(brand: any) {

    if(!brand)
        return {};

    return {
        id: brand.id,
        code: brand.code,
        name: brand.name
    }
}