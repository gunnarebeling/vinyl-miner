import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, it } from 'vitest';
import { AllVinyl } from './AllVinyl';
import { div } from 'framer-motion/client';
import { getAllVinyl } from '../../services/vinylServices';

vi.mock('../../services/vinylServices', () => ({
    getAllVinyl: vi.fn()
}))

const mockVinyls = [
    { id: 1, name: 'Vinyl 1', genre: 'Rock' },
  ]; 
  describe('AllVinyl Component', () => {
    beforeEach(() => {
      // Reset the mock before each test
      getAllVinyl.mockResolvedValue(mockVinyls);
    });
  
    it('renders All Vinyl title', () => {
      render(<AllVinyl />);
      expect(screen.getByText(/All Vinyl/i)).toBeInTheDocument(); // Replace with actual expected text
    });
  
    
  });

it('renders All Vinyl title', () => {
  render(<AllVinyl />);
  expect(screen.getByText(/All Vinyl/i)).toBeInTheDocument(); // Replace with actual expected text
});

  





