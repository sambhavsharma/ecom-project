export async function addressObj(address: any) {

    return {
       address1: address.address1,
       address2: address.address2,
       address3: address.address3,
       city: address.city,
       state: address.state,
       country: address.country,
       postcode: address.postcode
    }
}