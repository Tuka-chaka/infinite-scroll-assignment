import '@testing-library/jest-dom'
import Controls from  "../components/controls/Controls";
import entries from "../store/entries";
import { render, fireEvent } from "@testing-library/react"

describe('Controls', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), 
          removeListener: jest.fn(), 
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
    })

    it('should switch sort order', () => {
        const { getByText } = render(<Controls/>)
        const orderSwitch = getByText("По убыванию")
        fireEvent(orderSwitch,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
        expect(entries.isAscending).toBe(true)
      })

})