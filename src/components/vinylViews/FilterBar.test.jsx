import { act, fireEvent, render, screen, waitFor} from "@testing-library/react"
import { FilterBar } from "./FilterBar"
import { jest } from "globals"
import { describe, expect, vi } from "vitest"
import { getGenres } from "../../services/genreService"

const mockedSetFilteredVinyl= vi.fn()

vi.mock('../../services/genreService', () => ({
    getGenres: vi.fn(() => Promise.resolve([]))
}));

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

    it('should be able to type into input', async () => {
        render(
            <FilterBar 
                setFilteredVinyl={mockedSetFilteredVinyl}
                allVinyl={[]}
                />
        ) 
        const inputElement = screen.getByPlaceholderText(/search/i)
        act(() => {
            fireEvent.change(inputElement, {target: {value: 'pink floyd'} })
        })
        expect(inputElement.value).toBe('pink floyd')
    } )
    
})

describe('change genre with dropdown', () => {
    it('genre dropdown should render', () =>{
        render(
            <FilterBar 
                setFilteredVinyl={mockedSetFilteredVinyl}
                allVinyl={[]}
                />
        )
        const dropDownElement = screen.getByLabelText(/genre/i)
        expect(dropDownElement).toBeInTheDocument()
    })

    it('genre dropdown value should change when new option is changed', async () =>{
        const mockGenres = [
            {id: 1, name:'Rock'},
            {id: 2, name: 'Jazz'}
        ]
        getGenres.mockResolvedValueOnce( mockGenres)
        render(
            <FilterBar 
                setFilteredVinyl={mockedSetFilteredVinyl}
                allVinyl={[]}
                />
        )
        await waitFor(() => {
            expect(screen.getByText('Rock')).toBeInTheDocument();
            expect(screen.getByText('Jazz')).toBeInTheDocument();
          });
        const dropDownElement = screen.getByLabelText(/genre/i)
        
        act(() => {
            fireEvent.change(dropDownElement, {target: {value: '1'}})
        })
        expect(dropDownElement.value).toBe('1')
    })
    it('genre dropdown filters vinylcards', async () =>{
        const mockGenres = [
            {id: 1, name:'Rock'},
            {id: 2, name: 'Jazz'}
        ]
        const mockVinyl = [
            { id: 1, albumName: 'Rock Album 1', artist: 'Artist 1', genreId: 1 },
            { id: 2, albumName: 'Jazz Album 1', artist: 'Artist 2', genreId: 2 }      
        ]
        getGenres.mockResolvedValueOnce( mockGenres)

        render(
            <FilterBar 
                setFilteredVinyl={mockedSetFilteredVinyl}
                allVinyl={[...mockVinyl]}
                />
        )
        await waitFor(() => {
            expect(screen.getByText('Rock')).toBeInTheDocument();
            expect(screen.getByText('Jazz')).toBeInTheDocument();
          });
        const dropDownElement = screen.getByLabelText(/genre/i)
        
        act(() => {
            fireEvent.change(dropDownElement, {target: {value: '1'}})
        })
        act(() => {
            expect(mockedSetFilteredVinyl).toBeCalledWith([mockVinyl[0]])
        })
    })
})