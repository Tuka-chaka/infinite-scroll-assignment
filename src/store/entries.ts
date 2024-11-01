import { Entry } from "../exports"
import { makeAutoObservable } from "mobx"

class Entries {

    entries: Array<Entry> = []
    isFetching: boolean = false
    page: number = 1
    sort: string = "stars"
    isAscending: boolean = false

    constructor () {
        makeAutoObservable(this)
    }

    setEntries = (newEntries: Array<Entry>) => {
        this.entries = newEntries
    }

    setisFetching = (value: boolean) => {
        this.isFetching = value
    }

    setPage = (value: number) => {
        this.page = value
    }

    setSort = (value: string) => {
        this.sort = value
        this.page = 1
        this.entries = []
    }

    setIsAscending = (value: boolean) => {
        this.isAscending = value
        this.page = 1
        this.entries = []
    }


    deleteEntry (id: string) {
        this.setEntries(this.entries.filter(entry => entry.id !== id))
    }

    likeEntry (entry: Entry) {
        entry.liked = !entry.liked
    }


    fetchEntries() {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        this.setisFetching(true)
        fetch(`https://api.github.com/search/repositories?q=javascript&amp;per_page=40&amp;sort=${this.sort}&amp;order=${this.isAscending ? "asc" : "desc"}&amp;page=${this.page}`, {
            headers: {
                'User-Agent': 'infinite-scroll-assignment'
              }} 
        )
        .then(response => response.json())
        .then((response) => {
            this.setEntries([...this.entries, ...response.items.map((item:any) => ({
                id: item.id,
                name: item.name,
                url: item.html_url,
                updated_at: new Date(item.pushed_at),
                stars: item.stargazers_count,
                owner: item.owner.login,
                owner_url: item.owner.html_url,
                avatar_url: item.owner.avatar_url,
                liked: false
            }))])
        }).then(() => {
            this.setisFetching(false)
            this.setPage(this.page + 1)
        })
        /* eslint-enable @typescript-eslint/no-explicit-any */
    }
}

export default new Entries()