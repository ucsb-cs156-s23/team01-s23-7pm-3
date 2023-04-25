// Get ice cream shops from local storage
const get = () => {
    const iceCreamShopValue = localStorage.getItem("iceCreamShops");
    if (iceCreamShopValue === undefined) {
        const iceCreamShopCollection = { nextId: 1, iceCreamShops: [] }
        return set(iceCreamShopCollection);
    }
    const iceCreamShopCollection = JSON.parse(iceCreamShopValue);
    if (iceCreamShopCollection === null) {
        const iceCreamShopCollection = { nextId: 1, iceCreamShops: [] }
        return set(iceCreamShopCollection);
    }
    return iceCreamShopCollection;
};