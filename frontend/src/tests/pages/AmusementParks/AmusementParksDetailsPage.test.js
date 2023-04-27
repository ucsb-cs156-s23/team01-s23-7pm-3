import { render, screen } from "@testing-library/react";
import AmusementParksDetailsPage from "main/pages/AmusementParks/AmusementParksDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/amusementParksUtils', () => {
    return {
        __esModule: true,
        amusementParksUtils: {
            getById: (_id) => {
                return {
                    amusementParks: {
                        id: 3,
                        name: "Disneyland Park",
                        description: "Disney-themed amusement park rides"
                    }
                }
            }
        }
    }
});

describe("AmusementParksDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParksDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AmusementParksDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Disneyland Park")).toBeInTheDocument();
        expect(screen.getByText("Disney-themed amusement park rides")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


