import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import AmusementParkCreatePage from "main/pages/AmusementParks/AmusementParkCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/amusementParksUtils', () => {
    return {
        __esModule: true,
        amusementParkUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("AmusementParkCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParkCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /amusementParks on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "amusementPark": {
                id: 3,
                name: "Disneyland",
                address: "1313 Disneyland Drive, Anaheim, California, U.S",
                description: "Disney theme park"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParkCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const addressInput = screen.getByLabelText("Address");
        expect(addressInput).toBeInTheDocument();

        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Disneyland' } })
            fireEvent.change(addressInput, { target: { value: '1313 Disneyland Drive, Anaheim, California, U.S' } })
            fireEvent.change(descriptionInput, { target: { value: 'Disney theme park' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/amusementParks"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdAmusementPark: {"amusementPark":{"id":3,"name":"Disneyland","address":"1313 Disneyland Drive, Anaheim, California, U.S","description":"Disney theme park"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


