import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import AmusementParkEditPage from "main/pages/AmusementParks/AmusementParkEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/amusementParksUtils', () => {
    return {
        __esModule: true,
        amusementParkUtils: {
            update: (_amusementPark) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    amusementPark: {
                        id: 3,
                        name: "Universal Studio",
                        address: "Universal City, California, U.S",
                        description: "Universal cinema theme park"
                    }
                }
            }
        }
    }
});


describe("AmusementParkEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParkEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParkEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("AmusementParkForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Universal Studio')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Universal City, California, U.S')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Universal cinema theme park')).toBeInTheDocument();
    });

    test("redirects to /amusementParks on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
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
                    <AmusementParkEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const addressInput = screen.getByLabelText("Address");
        expect(addressInput).toBeInTheDocument();

        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Disneyland' } })
            fireEvent.change(addressInput, { target: { value: '1313 Disneyland Drive, Anaheim, California, U.S' } })
            fireEvent.change(descriptionInput, { target: { value: 'Disney theme park' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/amusementParks"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedAmusementPark: {"amusementPark":{"id":3,"name":"Disneyland","address":"1313 Disneyland Drive, Anaheim, California, U.S","description":"Disney theme park"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


