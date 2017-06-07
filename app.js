const app = {
    init(selectors) {
        this.max = 0
        this.listEmpty = true
        this.list = document.querySelector(selectors.listSelector)
        this.movies = []
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addMovie.bind(this))
    },

    addMovie(ev) {
        ev.preventDefault()

        const f = ev.target

        const movie = {
            id: this.max + 1,
            name: f.movieName.value,
        }

        const listItem = this.buildListItem(movie)
        this.list.appendChild(listItem)
        this.movies[this.max + 1] = movie

        this.max++
    },

    buildListItem(movie) {
        const item = document.createElement('li')
        item.setAttribute('id', 'el' + movie.id)
        item.textContent = movie.name
        movie.el = item.id

        const promoteButton = document.createElement('button')
        promoteButton.setAttribute('id', 'prmB' + movie.id)
        promoteButton.setAttribute('onClick', 'app.promoteItem(this.id)')
        promoteButton.setAttribute('type', 'button')
        promoteButton.setAttribute('class', 'success button')
        promoteButton.innerHTML = '&nbsp + &nbsp'
        promoteButton.style.color = 'blue'
        promoteButton.style.fontSize = '1.5rem'
        movie.prm = promoteButton
        item.appendChild(promoteButton)

        const demoteButton = document.createElement('button')
        demoteButton.setAttribute('id', 'demB' + movie.id)
        demoteButton.setAttribute('onClick', 'app.demoteItem(this.id)')
        demoteButton.setAttribute('type', 'button')
        demoteButton.setAttribute('class', 'warning button')
        demoteButton.innerHTML = '&nbsp - &nbsp'
        demoteButton.style.color = 'red'
        demoteButton.style.fontSize = '1.5rem'
        movie.del = demoteButton
        item.appendChild(demoteButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delB' + movie.id)
        deleteButton.setAttribute('onClick', 'app.deleteItem(this.id)')
        deleteButton.setAttribute('type', 'button')
        deleteButton.setAttribute('class', 'alert button')
        deleteButton.innerHTML = '&nbsp X &nbsp'
        deleteButton.style.color = 'whitesmoke'
        deleteButton.style.fontSize = '1.5rem'
        movie.del = deleteButton
        item.appendChild(deleteButton)

        const upButton = document.createElement('button')
        upButton.setAttribute('id', 'upB' + movie.id)
        upButton.setAttribute('onClick', 'app.upItem(this.id)')
        upButton.setAttribute('type', 'button')
        upButton.setAttribute('class', 'primary button')
        upButton.innerHTML = '&nbsp ↑ &nbsp'
        upButton.style.color = 'gold'
        upButton.style.fontSize = '1.5rem'
        movie.up = upButton
        item.appendChild(upButton)

        const downButton = document.createElement('button')
        downButton.setAttribute('id', 'dwnB' + movie.id)
        downButton.setAttribute('onClick', 'app.downItem(this.id)')
        downButton.setAttribute('type', 'button')
        downButton.setAttribute('class', 'primary button')
        downButton.innerHTML = '&nbsp ↓ &nbsp'
        downButton.style.color = 'gold'
        downButton.style.fontSize = '1.5rem'
        movie.down = downButton
        item.appendChild(downButton)

        return item
    },

    promoteItem(clicked_id) {
        console.log('promoting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen + 1; k++) {
            for (let movie in this.movies) {
                const nm = 'prmB' + movie
                const ed = '#el' + movie
                if (nm === clicked_id) {
                    document.querySelector(ed).style.color = 'crimson'
                    document.querySelector(ed).style.fontSize = '1.5rem'
                }
            }
        }
    },

    demoteItem(clicked_id) {
        console.log('demoting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen + 1; k++) {
            for (let movie in this.movies) {
                const nm = 'demB' + movie
                const ed = '#el' + movie
                if (nm === clicked_id) {
                    document.querySelector(ed).style.color = 'black'
                    document.querySelector(ed).style.fontSize = '1rem'
                }
            }
        }
    },

    deleteItem(clicked_id) {
        console.log('deleting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 1; k < lLen + 1; k++) {
            for (let j = 1; j < this.movies.length; j++) {
                const nm = '#el' + this.movies[j].id


                if (clicked_id === this.movies[j].del.id) {
                    $(nm).remove()
                }
            }
        }
    },

    upItem(clicked_id) {
        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 1; k < lLen + 1; k++) {
            for (let j = 1; j < this.movies.length; j++) {
                const nm = '#el' + this.movies[j].id

                if (clicked_id === this.movies[j].up.id) {
                    const temp = document.getElementById(this.movies[j].el).innerHTML
                    if (this.movies[j].id > 1) {
                        console.log('upping item')
                        document.getElementById(this.movies[j].el).innerHTML = document.getElementById(this.movies[j].el).previousSibling.innerHTML
                        document.getElementById(this.movies[j].el).previousSibling.innerHTML = temp
                    }
                }
            }
        }
    },

    downItem(clicked_id) {
        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 1; k < lLen + 1; k++) {
            for (let j = 1; j < this.movies.length; j++) {
                const nm = '#el' + this.movies[j].id

                if (clicked_id === this.movies[j].down.id) {
                    const temp = document.getElementById(this.movies[j].el).innerHTML
                    if (this.movies[j].id < this.movies.length) {
                        console.log('dropping item')
                        document.getElementById(this.movies[j].el).innerHTML = document.getElementById(this.movies[j].el).previousSibling.innerHTML
                        document.getElementById(this.movies[j].el).previousSibling.innerHTML = temp
                    }
                }
            }
        }
    },
}

app.init({
    formSelector: '#movie-form',
    listSelector: '#movie-list',
})