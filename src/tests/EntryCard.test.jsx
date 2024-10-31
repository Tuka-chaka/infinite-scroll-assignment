
import '@testing-library/jest-dom'
import EntryCard from "../components/entryCard/EntryCard";
import entries from "../store/entries";
import { render } from "@testing-library/react"

const mockEntry = {
    id: 'testId',
    name: "testName",
    url: "testUrl",
    updated_at: new Date(),
    stars: 0,
    owner: "testOwner",
    owner_url: "testOwnerUrl",
    avatar_url: "testAvatarUrl",
    liked: false
}

describe('EntryCard', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        })
      })

    it('should display correct repo name', () => {
        const { getByTestId } = render(<EntryCard entry={mockEntry}/>)
        const name = getByTestId("repoName").textContent
        expect(name).toEqual("testName")
    })

    it('should display correct repo author', () => {
        const { getByTestId } = render(<EntryCard entry={mockEntry}/>)
        const author = getByTestId("authorName").textContent
        expect(author).toEqual("testOwner")
    })

    it('should display correct star count with trailing whitespace', () => {
        const { getByTestId } = render(<EntryCard entry={mockEntry}/>)
        const stars = getByTestId("stars").textContent
        expect(stars).toEqual("0 ")
    })

    it('should display correct date with trailing whitespace', () => {
        const { getByTestId } = render(<EntryCard entry={mockEntry}/>)
        const date = getByTestId("date").textContent
        expect(date).toEqual(new Date().toLocaleDateString() + " ")
    })
    
})

