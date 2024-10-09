import { render, screen} from "@testing-library/react"
import { FilterBar } from "./FilterBar"
import { jest } from "globals"
import { expect, vi } from "vitest"

const mockedSetFilteredVinyl= vi.fn()

describe('AddInput for search' ,() => {
    it('should render input for search element', async () => {
        render(
            <FilterBar 
                setFilteredVinyl={mockedSetFilteredVinyl}
                allVinyl={[]}
                />
        )
        const inputElement = screen.getByPlaceholderText(/search/i)
        expect(inputElement).toBeInTheDocument()
    } )
})