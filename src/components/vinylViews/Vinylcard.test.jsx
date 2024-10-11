import { afterEach, describe, expect, it, vi } from "vitest"
import { VinylCard } from "./vinylcard"
import { cleanup, render, screen } from "@testing-library/react"
import { UserContext } from "../../views/ApplicationViews"
import { MemoryRouter, Router } from "react-router-dom"
import { getLikesByVinylId } from "../../services/likesServices"
import { act } from "react"


    vi.mock("../../services/likesServices",() => ({
        getLikesByVinylId: vi.fn(() => Promise.resolve([])),
        
        
    }))
    afterEach(cleanup);

describe('all the components of the vinyl show up on the card', () => {
    it('the title artist and pic url of the vinyl', () => {
        const mockVinyl = {
            id: 1,
            albumName: "Abbey Road",
            artist: "The Beatles",
            conditionId: 2,
            genreId: 1,
            albumArt: "https://m.media-amazon.com/images/I/619ibg3YiVS._SX300_SY300_QL70_FMwebp_.jpg",
            userId: 6
          }
        
         
            const mockCurrentUser = 1

            render(
                <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                     <MemoryRouter>
                        <VinylCard vinyl={mockVinyl} refreshOnClick={vi.fn()} />
                    </MemoryRouter>
                </UserContext.Provider>
                
            )


        const titleElement = screen.getByText(/abbey road/i)
        const artistElement = screen.getByText(/beatles/i)
        const picElement = screen.getByAltText(/album art/i)
        expect(titleElement).toBeInTheDocument()
        expect(artistElement).toBeInTheDocument()
        expect(picElement.src).toMatch(/https/i)
    })
    it('the like count shows based on likes', async () => {
        

            const mockVinyl = {
                id: 1,
                albumName: "Abbey Road",
                artist: "The Beatles",
                conditionId: 2,
                genreId: 1,
                albumArt: "https://m.media-amazon.com/images/I/619ibg3YiVS._SX300_SY300_QL70_FMwebp_.jpg",
                userId: 6
              }
            const mockLikes = [
                {
                    vinylId: 6,
                    userId: 3,
                    liked: true,
                    id: 10
                  },
                  {
                    vinylId: 2,
                    userId: 3,
                    liked: true,
                    id: 11
                  },
                  
            ]
            const mockCurrentUser = 1
          
    
                getLikesByVinylId.mockResolvedValueOnce( mockLikes)
      
                 act(() => {
                    render(
                        <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
                             <MemoryRouter>
                                <VinylCard vinyl={mockVinyl} refreshOnClick={vi.fn()} />
                            </MemoryRouter>
                        </UserContext.Provider>
                        
                    )

                })
                
    
         
            
            
            
                
        const likeCountElement = await screen.findByText('2')
    
        expect(likeCountElement).toBeInTheDocument()
    })
    
})