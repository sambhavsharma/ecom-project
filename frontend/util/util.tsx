
export default function removeFromArrayByIndex(array: [], index: number) {
    
    //array.splice(index, 1);
    array.splice(index, 1);
}

export default function removeFromArrayByValue(array: [], value: string) {
    const index = array.indexOf(value);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

export default function removeFromArrayByObjectValue(array: [], key: string, value: string) {

    array.splice(array.findIndex(item => item[key] === value), 1)
}