

export function attributesList(attributes: any) {

    if(!attributes)
        return [];

    var attributesList = [];
    for (let attribute of attributes) {
        attributesList.push(attributeObj(attribute));
    }

    return attributesList;
}

export function attributeObj(attribute: any) {
    let attr = attribute.attribute;

    return {
        id: attr.id,
        name: attr.name,
        values: attr.values,
        default_value: attr.default_value
    };
}