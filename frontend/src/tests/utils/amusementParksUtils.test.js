import { amusementParksFixtures } from "fixtures/amusementParksFixtures";
import { amusementParksUtils } from "main/utils/amusementParksUtils";

describe("amusementParkUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "amusementParks".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "amusementParks") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When amusementParks is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = amusementParksUtils.get();

            // assert
            const expected = { nextId: 1, amusementParks: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("amusementParks", expectedJSON);
        });

    //     test("When amusementParks is null in local storage, should set to empty list", () => {

    //         // arrange
    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock(null));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.get();

    //         // assert
    //         const expected = { nextId: 1, amusementParks: [] } ;
    //         expect(result).toEqual(expected);

    //         const expectedJSON = JSON.stringify(expected);
    //         expect(setItemSpy).toHaveBeenCalledWith("amusementParks", expectedJSON);
    //     });

    //     test("When amusementParks is [] in local storage, should return []", () => {

    //         // arrange
    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, amusementParks: [] }));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.get();

    //         // assert
    //         const expected = { nextId: 1, amusementParks: [] };
    //         expect(result).toEqual(expected);

    //         expect(setItemSpy).not.toHaveBeenCalled();
    //     });

    //     test("When amusementParks is JSON of three amusementParks, should return that JSON", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;
    //         const mockamusementParkCollection = { nextId: 10, amusementParks: threeamusementParks };

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock(mockamusementParkCollection));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.get();

    //         // assert
    //         expect(result).toEqual(mockamusementParkCollection);
    //         expect(setItemSpy).not.toHaveBeenCalled();
    //     });
    });


    // describe("getById", () => {
    //     test("Check that getting a amusementPark by id works", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;
    //         const idToGet = threeamusementParks[1].id;

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         // act
    //         const result = amusementParkUtils.getById(idToGet);

    //         // assert

    //         const expected = { amusementPark: threeamusementParks[1] };
    //         expect(result).toEqual(expected);
    //     });

    //     test("Check that getting a non-existing amusementPark returns an error", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         // act
    //         const result = amusementParkUtils.getById(99);

    //         // assert
    //         const expectedError = `amusementPark with id 99 not found`
    //         expect(result).toEqual({ error: expectedError });
    //     });

    //     test("Check that an error is returned when id not passed", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         // act
    //         const result = amusementParkUtils.getById();

    //         // assert
    //         const expectedError = `id is a required parameter`
    //         expect(result).toEqual({ error: expectedError });
    //     });

    // });
    // describe("add", () => {
    //     test("Starting from [], check that adding one amusementPark works", () => {

    //         // arrange
    //         const amusementPark = amusementParkFixtures.oneamusementPark[0];
    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, amusementParks: [] }));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.add(amusementPark);

    //         // assert
    //         expect(result).toEqual(amusementPark);
    //         expect(setItemSpy).toHaveBeenCalledWith("amusementParks",
    //             JSON.stringify({ nextId: 2, amusementParks: amusementParkFixtures.oneamusementPark }));
    //     });
    // });

    // describe("update", () => {
    //     test("Check that updating an existing amusementPark works", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;
    //         const updatedamusementPark = {
    //             ...threeamusementParks[0],
    //             name: "Updated Name"
    //         };
    //         const threeamusementParksUpdated = [
    //             updatedamusementPark,
    //             threeamusementParks[1],
    //             threeamusementParks[2]
    //         ];

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.update(updatedamusementPark);

    //         // assert
    //         const expected = { amusementParkCollection: { nextId: 5, amusementParks: threeamusementParksUpdated } };
    //         expect(result).toEqual(expected);
    //         expect(setItemSpy).toHaveBeenCalledWith("amusementParks", JSON.stringify(expected.amusementParkCollection));
    //     });
    //     test("Check that updating an non-existing amusementPark returns an error", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         const updatedamusementPark = {
    //             id: 99,
    //             name: "Fake Name",
    //             description: "Fake Description"
    //         }

    //         // act
    //         const result = amusementParkUtils.update(updatedamusementPark);

    //         // assert
    //         const expectedError = `amusementPark with id 99 not found`
    //         expect(result).toEqual({ error: expectedError });
    //         expect(setItemSpy).not.toHaveBeenCalled();
    //     });
    // });

    // describe("del", () => {
    //     test("Check that deleting a amusementPark by id works", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;
    //         const idToDelete = threeamusementParks[1].id;
    //         const threeamusementParksUpdated = [
    //             threeamusementParks[0],
    //             threeamusementParks[2]
    //         ];

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.del(idToDelete);

    //         // assert

    //         const expected = { amusementParkCollection: { nextId: 5, amusementParks: threeamusementParksUpdated } };
    //         expect(result).toEqual(expected);
    //         expect(setItemSpy).toHaveBeenCalledWith("amusementParks", JSON.stringify(expected.amusementParkCollection));
    //     });
    //     test("Check that deleting a non-existing amusementPark returns an error", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    //         setItemSpy.mockImplementation((_key, _value) => null);

    //         // act
    //         const result = amusementParkUtils.del(99);

    //         // assert
    //         const expectedError = `amusementPark with id 99 not found`
    //         expect(result).toEqual({ error: expectedError });
    //         expect(setItemSpy).not.toHaveBeenCalled();
    //     });
    //     test("Check that an error is returned when id not passed", () => {

    //         // arrange
    //         const threeamusementParks = amusementParkFixtures.threeamusementParks;

    //         const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    //         getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, amusementParks: threeamusementParks }));

    //         // act
    //         const result = amusementParkUtils.del();

    //         // assert
    //         const expectedError = `id is a required parameter`
    //         expect(result).toEqual({ error: expectedError });
    //     });
    //});
});

