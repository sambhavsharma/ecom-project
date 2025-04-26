

export function productAttributesList(attributes: any) {

    if(!attributes)
        return [];

    var attributesList = [];
    for (let attribute of attributes) {
        attributesList.push(productAttributeObj(attribute));
    }

    return attributesList;
}

export function productAttributeObj(attribute: any) {
    let name = attribute.attribute ? attribute.attribute.name : '';


    return {
        id: attribute.id,
        name: name,
        value: attribute.value
    };
}