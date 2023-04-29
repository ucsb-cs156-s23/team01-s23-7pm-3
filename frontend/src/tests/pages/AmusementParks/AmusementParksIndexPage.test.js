import { render, screen, waitFor } from "@testing-library/react";
import AmusementParksIndexPage from "main/pages/AmusementParks/AmusementParksIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/amusementParksUtils', () => {
    return {
        __esModule: true,
        amusementParkUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    amusementParks: [
                        {
                            "id": 3,
                            "name": "Disneyland Park",
                            "address": "1313 Disneyland Dr",
                            "description": "Disney-themed amusement park rides"
                        },
                    ]
                }
            }
        }
    }
});


describe("AmusementParksIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParksIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParksIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createAmusementParksButton = screen.getByText("Create Amusement Park");
        expect(createAmusementParksButton).toBeInTheDocument();
        expect(createAmusementParksButton).toHaveAttribute("style", "float: right;");

        const name = screen.getByText("Disneyland Park");
        expect(name).toBeInTheDocument();

        const address = screen.getByText("1313 Disneyland Dr");
        expect(address).toBeInTheDocument();

        const description = screen.getByText("Disney-themed amusement park rides");
        expect(description).toBeInTheDocument();

        expect(screen.getByTestId("AmusementParksTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("AmusementParksTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("AmusementParksTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParksIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const name = screen.getByText("Disneyland Park");
        expect(name).toBeInTheDocument();

        const address = screen.getByText("1313 Disneyland Dr");
        expect(address).toBeInTheDocument();

        const description = screen.getByText("Disney-themed amusement park rides");
        expect(description).toBeInTheDocument();

        const deleteButton = screen.getByTestId("AmusementParksTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/amusementParks"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `AmusementParksIndexPage deleteCallback: {"id":3,"name":"Disneyland Park","address":"1313 Disneyland Dr","description":"Disney-themed amusement park rides"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


