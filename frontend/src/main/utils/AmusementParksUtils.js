// get restaurants from local storage
const get = () => {
    const AmusementParksValue = localStorage.getItem("AmusementParks");
    if (AmusementParksValue === undefined) {
        const AmusementParksCollection = { nextId: 1, AmusementParks: [] }
        return set(AmusementParksCollection);
    }
    const AmusementParksCollection = JSON.parse(AmusementParksValue);
    if (AmusementParksCollection === null) {
        const AmusementParksCollection = { nextId: 1, AmusementParks: [] }
        return set(AmusementParksCollection);
    }
    return AmusementParksCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const AmusementParksCollection = get();
    const AmusementParks = AmusementParksCollection.AmusementParks;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = AmusementParks.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `AmusementParks with id ${id} not found` };
    }
    return { AmusementPark: AmusementParks[index] };
}

// set restaurants in local storage
const set = (AmusementParksCollection) => {
    localStorage.setItem("AmusementParks", JSON.stringify(AmusementParksCollection));
    return AmusementParksCollection;
};

// add a restaurant to local storage
const add = (AmusementPark) => {
    const AmusementParksCollection = get();
    AmusementPark = { ...AmusementPark, id: AmusementParksCollection.nextId };
    AmusementParksCollection.nextId++;
    AmusementParksCollection.AmusementParks.push(AmusementPark);
    set(AmusementParksCollection);
    return AmusementPark;
};

// update a restaurant in local storage
const update = (AmusementPark) => {
    const AmusementParksCollection = get();

    const AmusementParks = AmusementParksCollection.AmusementParks;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = AmusementParks.findIndex((r) => r.id == AmusementPark.id);
    if (index === -1) {
        return { "error": `AmusementPark with id ${restaurant.id} not found` };
    }
    AmusementParks[index] = AmusementPark;
    set(AmusementParksCollection);
    return { AmusementParksCollection: AmusementParksCollection };
};

// delete a restaurant from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const AmusementParksCollection = get();
    const AmusementParks = AmusementParksCollection.AmusementParks;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = AmusementParks.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `AmusementPark with id ${id} not found` };
    }
    AmusementParks.splice(index, 1);
    set(AmusementParksCollection);
    return { AmusementParksCollection: AmusementParksCollection };
};

const AmusementParksUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { AmusementParksUtils };