const app = {
    init(selectors) {
        this.max = 0
        this.listEmpty = true
        this.list = document.querySelector(selectors.listSelector)
        this.movies = []

        document.querySelector('#res').setAttribute('onClick', 'app.clearMem()')

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addMovie.bind(this))

        this.load()
    },

    addMovie(ev) {
        ev.preventDefault()

        const f = ev.target

        const movie = {
            id: this.max,
            name: f.movieName.value,
            year: f.movieYear.value,
        }

        this.loadMovie(movie)

        f.reset()
    },

    loadMovie(movie) {
        const listItem = this.buildListItem(movie)
        this.list.appendChild(listItem)

        this.movies.unshift(movie)
        this.save()

        if (this.listEmpty === false) {
            this.list.insertBefore(listItem, this.list.childNodes[0])
        } else {
            this.list.appendChild(listItem)
            this.listEmpty = false
        }

        this.max++
    },

    load() {
        const moviesJSON = JSON.parse(localStorage.getItem('movies'))

        if (moviesJSON) {
            moviesJSON.reverse().map(this.loadMovie.bind(this))
        }
    },

    save() {
        localStorage.setItem('movies', JSON.stringify(this.movies))
    },

    clearMem() {
        console.log('clearing list')

        localStorage.clear()

        $('li').remove()
    },

    buildListItem(movie) {
        const item = document.createElement('li')
        item.setAttribute('id', 'el' + movie.id)
        item.dataset.id = movie.id
        item.textContent = movie.name + ' ~ (' + movie.year + ') '
        item.setAttribute('contentEditable', 'true')
        console.log(movie.name + ' : name')
        movie.el = item.id

        const saveButton = document.createElement('button')
        saveButton.setAttribute('id', 'savB' + movie.id)
        saveButton.setAttribute('onClick', 'app.saveItem(this.id)')
        saveButton.setAttribute('type', 'button')
        saveButton.setAttribute('class', 'success button')
        saveButton.setAttribute('contentEditable', 'false')
        saveButton.innerHTML = '&nbsp $ &nbsp'
        saveButton.style.color = 'whitesmoke'
        saveButton.style.fontSize = '1.6rem'
        movie.del = saveButton
        item.appendChild(saveButton)

        const promoteButton = document.createElement('button')
        promoteButton.setAttribute('id', 'prmB' + movie.id)
        promoteButton.setAttribute('onClick', 'app.promoteItem(this.id)')
        promoteButton.setAttribute('type', 'button')
        promoteButton.setAttribute('class', 'secondary button')
        promoteButton.setAttribute('contentEditable', 'false')
        promoteButton.innerHTML = '&nbsp + &nbsp'
        promoteButton.style.color = 'blue'
        promoteButton.style.fontSize = '1.6rem'
        movie.prm = promoteButton
        item.appendChild(promoteButton)

        const demoteButton = document.createElement('button')
        demoteButton.setAttribute('id', 'demB' + movie.id)
        demoteButton.setAttribute('onClick', 'app.demoteItem(this.id)')
        demoteButton.setAttribute('type', 'button')
        demoteButton.setAttribute('class', 'warning button')
        demoteButton.setAttribute('contentEditable', 'false')
        demoteButton.innerHTML = '&nbsp ─ &nbsp'
        demoteButton.style.color = 'red'
        demoteButton.style.fontSize = '1.6rem'
        movie.del = demoteButton
        demoteButton.disabled = true
        item.appendChild(demoteButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delB' + movie.id)
        deleteButton.setAttribute('onClick', 'app.deleteItem(this.id)')
        deleteButton.setAttribute('type', 'button')
        deleteButton.setAttribute('class', 'alert button')
        deleteButton.setAttribute('contentEditable', 'false')
        deleteButton.innerHTML = '&nbsp X &nbsp'
        deleteButton.style.color = 'whitesmoke'
        deleteButton.style.fontSize = '1.6rem'
        movie.del = deleteButton
        item.appendChild(deleteButton)

        // document.querySelector('#swap').setAttribute('onClick', 'app.swapItems(this.id)')

        // const upButton = document.createElement('button')
        // upButton.setAttribute('id', 'upB' + movie.id)
        // upButton.setAttribute('onClick', 'app.upItem(this.id)')
        // upButton.setAttribute('type', 'button')
        // upButton.setAttribute('class', 'primary button')
        // upButton.setAttribute('contentEditable', 'false')
        // upButton.innerHTML = '&nbsp ↑ &nbsp'
        // upButton.style.color = 'gold'
        // upButton.style.fontSize = '1.6rem'
        // movie.up = upButton
        // item.appendChild(upButton)

        // const downButton = document.createElement('button')
        // downButton.setAttribute('id', 'dwnB' + movie.id)
        // downButton.setAttribute('onClick', 'app.downItem(this.id)')
        // downButton.setAttribute('type', 'button')
        // downButton.setAttribute('class', 'primary button')
        // downButton.setAttribute('contentEditable', 'false')
        // downButton.innerHTML = '&nbsp ↓ &nbsp'
        // downButton.style.color = 'gold'
        // downButton.style.fontSize = '1.6rem'
        // movie.down = downButton
        // item.appendChild(downButton)

        return item
    },

    promoteItem(clicked_id) {
        console.log('promoting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let j = 0; j < this.movies.length; j++) {
            const nm = 'prmB' + this.movies[j].id
            const dm = 'demB' + this.movies[j].id
            const pm = 'prmB' + this.movies[j].id
            const ed = '#el' + this.movies[j].id

            if (nm === clicked_id) {
                document.querySelector(ed).style.color = 'crimson'
                document.querySelector(ed).style.fontSize = '2.9rem'
                document.getElementById(pm).disabled = true
                document.getElementById(dm).disabled = false
            }
        }
    },

    demoteItem(clicked_id) {
        console.log('demoting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let j = 0; j < this.movies.length; j++) {
            const nm = 'demB' + this.movies[j].id
            const dm = 'demB' + this.movies[j].id
            const pm = 'prmB' + this.movies[j].id
            const ed = '#el' + this.movies[j].id

            if (nm === clicked_id) {
                document.querySelector(ed).style.color = 'goldenrod'
                document.querySelector(ed).style.fontSize = '2rem'
                document.getElementById(dm).disabled = true
                document.getElementById(pm).disabled = false
            }
        }
    },

    deleteItem(clicked_id) {
        console.log('deleting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let j = 0; j < this.movies.length; j++) {
            const nm = '#el' + this.movies[j].id

            if (clicked_id === this.movies[j].del.id) {
                $(nm).remove()

                for (let i = 0; i < this.movies.length; i++) {
                    const nd = '#el' + this.movies[i].id
                    if (nm === nd) {
                        this.movies.splice(i, 1)
                        this.save()
                        break
                    }
                }
            }
        }
    },

    upItem(clicked_id) {
        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let j = 1; j < this.movies.length; j++) {
            const nm = '#el' + this.movies[j].id
            if (clicked_id === this.movies[j].up.id) {
                if (this.movies[j].id < this.movies.length + 1) {
                    console.log('upping item')
                    const current = '#' + this.movies[j].el
                    const next = '#' + this.movies[j + 1].el
                    console.log($(current).text())
                    console.log($(next).text())
                    $(current).insertAfter($(next))
                }
            }
        }
    },

    downItem(clicked_id) {
        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let j = 1; j < this.movies.length; j++) {
            const nm = '#el' + this.movies[j].id

            if (clicked_id === this.movies[j].down.id) {
                if (this.movies[j].id > 1) {
                    console.log('dropping item')
                    const current = '#' + this.movies[j].el
                    const next = '#' + this.movies[j - 1].el
                    $(current).insertBefore($(next))
                }
            }
        }
    },

    saveItem(clicked_id) {
        console.log('saving edited item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let j = 0; j < this.movies.length; j++) {
            const nm = 'savB' + this.movies[j].id
            const ed = '#el' + this.movies[j].id

            if (nm === clicked_id) {
                const split = document.querySelector(ed).textContent.split('')
                this.movies[j].name = document.querySelector(ed).textContent.substring(0, split.indexOf('~'))
                localStorage.setItem('movies', JSON.stringify(this.movies))
            }
        }
    },

    swapItems(clicked_id) {
        console.log('swapping items')

        const swap1 = document.querySelector('#swap1').innerHTML
        const swap2 = document.querySelector('#swap2').innerHTML

        document.querySelector('#swap1').innerHTML = swap2
        document.querySelector('#swap2').innerHTML = swap1
    },
}

app.init({
    formSelector: '#movie-form',
    listSelector: '#movie-list',
})