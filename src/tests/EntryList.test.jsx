import '@testing-library/jest-dom'
import EntryList from  "../components/entryList/EntryList";
import entries from "../store/entries";
import { render, within, fireEvent, waitForElementToBeRemoved } from "@testing-library/react"

describe('EntryList', () => {
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

      const intersectionObserverMock = () => ({
        observe: () => null,
        disconnect: () => null,
        unobserve: () => null
      })
      window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

      entries.setEntries([
        {
          id: '1',
          name: "testName",
          url: "testUrl",
          updated_at: new Date(),
          stars: 0,
          owner: "testOwner",
          owner_url: "testOwnerUrl",
          avatar_url: "testAvatarUrl",
          liked: false
        },
        {
          id: '2',
          name: "testName",
          url: "testUrl",
          updated_at: new Date(),
          stars: 0,
          owner: "testOwner",
          owner_url: "testOwnerUrl",
          avatar_url: "testAvatarUrl",
          liked: false
        }, 
      ])
    })

    it('should display correct amount per page', () => {
      const { getAllByTestId } = render(<EntryList/>)
      const cards = getAllByTestId("entryCard")
      expect(cards.length).toBe(2)
    })

    it('should invert like on like button click', () => {
      const { getAllByTestId } = render(<EntryList/>)
      const card = getAllByTestId("entryCard")[0]
      const entry = entries.entries[0]
      const likeButton = within(card).getByTestId("likeButton")
      fireEvent(likeButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(entry.liked).toBe(true)
    })

    it('should delete card on delete button click', async () => {
      const { getAllByTestId } = render(<EntryList/>)
      const card = getAllByTestId("entryCard")[0]
      const deleteButton = within(card).getByTestId("deleteButton")
      fireEvent(deleteButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      await waitForElementToBeRemoved(card)
      expect(entries.entries.length).toBe(1)
    })
})