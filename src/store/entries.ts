import { Entry } from "../exports"
import { makeAutoObservable } from "mobx"

class Entries {

    entries: Array<Entry> = []
    isFetching: boolean = false
    page: number = 1

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
        console.log(this.page)
    }

    fetchEntries() {
        this.setisFetching(true)
        fetch(`https://api.github.com/search/repositories?q=javascript&amp;sort=stars&amp;order=asc&amp;page=${this.page}`)
        .then(response => response.json())
        .then((response) => {
            this.setEntries([...this.entries, ...response.items.map((item:any) => ({
                id: item.id,
                name: item.name,
                url: item.url,
                owner: item.owner.login,
                owner_url: item.owner.url,
                avatar_url: item.owner.avatar_url,
                notes: ""
            }))])
        }).then(() => {
            this.setisFetching(false)
            this.setPage(this.page + 1)
        })
    }
}

export default new Entries()