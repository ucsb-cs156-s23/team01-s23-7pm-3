// get restaurants from local storage
const get = () => {
    const amusementParksValue = localStorage.getItem("amusementParks");
    if (amusementParksValue === undefined) {
        const amusementParksCollection = { nextId: 1, amusementParks: [] }
        return set(amusementParksCollection);
    }
    const amusementParksCollection = JSON.parse(amusementParksValue);
    if (amusementParksCollection === null) {
        const amusementParksCollection = { nextId: 1, amusementParks: [] }
        return set(amusementParksCollection);
    }
    return amusementParksCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const amusementParksCollection = get();
    const amusementParks = amusementParksCollection.amusementParks;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = amusementParks.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `amusementParks with id ${id} not found` };
    }
    return { amusementPark: amusementParks[index] };
}

// set restaurants in local storage
const set = (amusementParksCollection) => {
    localStorage.setItem("amusementParks", JSON.stringify(amusementParksCollection));
    return amusementParksCollection;
};

// add a restaurant to local storage
const add = (amusementPark) => {
    const amusementParksCollection = get();
    amusementPark = { ...amusementPark, id: amusementParksCollection.nextId };
    amusementParksCollection.nextId++;
    amusementParksCollection.amusementParks.push(amusementPark);
    set(amusementParksCollection);
    return amusementPark;
};

// update a restaurant in local storage
const update = (amusementPark) => {
    const amusementParksCollection = get();

    const amusementParks = amusementParksCollection.amusementParks;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = amusementParks.findIndex((r) => r.id == amusementPark.id);
    if (index === -1) {
        return { "error": `amusementPark with id ${amusementPark.id} not found` };
    }
    amusementParks[index] = amusementPark;
    set(amusementParksCollection);
    return { amusementParksCollection: amusementParksCollection };
};

// delete a restaurant from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const amusementParksCollection = get();
    const amusementParks = amusementParksCollection.amusementParks;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = amusementParks.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `amusementPark with id ${id} not found` };
    }
    amusementParks.splice(index, 1);
    set(amusementParksCollection);
    return { amusementParksCollection: amusementParksCollection };
};

const amusementParkUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { amusementParkUtils };