const app = {
    init(selectors) {
        this.max = 0
        this.count = 0
        this.listEmpty = true
        this.list = document.querySelector(selectors.listSelector)
        this.movies = new Array()
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
            bool: false,
        }

        const listItem = this.buildListItem(movie)
        this.list.appendChild(listItem)
        this.movies[this.max + 1] = movie

        this.max++
        this.count++
    },

    buildListItem(movie) {
        const item = document.createElement('li')
        item.setAttribute('id', 'el' + movie.id)
        console.log(item.getAttribute('id'))
        item.textContent = movie.name

        const promoteButton = document.createElement('button')
        promoteButton.setAttribute('id', 'prmB' + movie.id)
        promoteButton.setAttribute('onClick', 'app.promoteItem(this.id)')
        promoteButton.setAttribute('type', 'button')
        promoteButton.setAttribute('class', 'success button')
        promoteButton.innerHTML = '&nbsp + &nbsp'
        promoteButton.style.color = 'blue'
        promoteButton.style.fontSize = '1.5rem'
        item.appendChild(promoteButton)

        const demoteButton = document.createElement('button')
        demoteButton.setAttribute('id', 'prmB' + movie.id)
        demoteButton.setAttribute('onClick', 'app.demoteItem(this.id)')
        demoteButton.setAttribute('type', 'button')
        demoteButton.setAttribute('class', 'warning button')
        demoteButton.innerHTML = '&nbsp - &nbsp'
        demoteButton.style.color = 'red'
        demoteButton.style.fontSize = '1.5rem'
        item.appendChild(demoteButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delB' + movie.id)
        deleteButton.setAttribute('onClick', 'app.deleteItem(this.id)')
        deleteButton.setAttribute('type', 'button')
        deleteButton.setAttribute('class', 'alert button')
        deleteButton.innerHTML = '&nbsp X &nbsp'
        deleteButton.style.color = 'whitesmoke'
        deleteButton.style.fontSize = '1.5rem'
        item.appendChild(deleteButton)

        const upButton = document.createElement('button')
        upButton.setAttribute('id', 'delB' + movie.id)
        upButton.setAttribute('onClick', 'app.upItem(item)')
        upButton.setAttribute('type', 'button')
        upButton.setAttribute('class', 'primary button')
        upButton.innerHTML = '&nbsp ↑ &nbsp'
        upButton.style.color = 'gold'
        upButton.style.fontSize = '1.5rem'
        item.appendChild(upButton)

        const downButton = document.createElement('button')
        downButton.setAttribute('id', 'delB' + movie.id)
        downButton.setAttribute('onClick', 'app.downItem(item)')
        downButton.setAttribute('type', 'button')
        downButton.setAttribute('class', 'primary button')
        downButton.innerHTML = '&nbsp ↓ &nbsp'
        downButton.style.color = 'gold'
        downButton.style.fontSize = '1.5rem'
        item.appendChild(downButton)

        return item
    },

    promoteItem(clicked_id) {
        console.log('promoting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen; k++) {
            for (let movie in this.movies) {
                const nm = 'prmB' + movie
                const ed = '#el' + movie
                if (nm === clicked_id) {
                    movie.bool = false
                    document.querySelector(ed).style.border = 'thick solid crimson'
                }
            }
        }
    },

    demoteItem(clicked_id) {
        console.log('demoting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen; k++) {
            for (let movie in this.movies) {
                const nm = 'prmB' + movie
                const ed = '#el' + movie
                if (nm === clicked_id) {
                    movie.bool = false
                    document.querySelector(ed).style.border = 'transparent'
                }
            }
        }
    },

    deleteItem(clicked_id) {
        console.log('deleting item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen; k++) {
            for (let movie in this.movies) {
                const nm = '#el' + movie
                console.log(nm)
                movie.bool = false

                //liList[delList.indexOf(clicked_id)]
                if (k === movie) {
                    $(nm).remove()
                }
                //document.querySelector(nm).style.border = 'thick solid crimson'
            }
        }
    },

    upItem(item) {
        let current
        let next

        console.log('upping item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen; k++) {
            for (let movie in this.movies) {
                const nm = '#el' + movie
                console.log(nm)
                movie.bool = false

                //$(liList[delList.indexOf(clicked_id)]).remove()
                document.querySelector(nm).style.border = 'thick solid crimson'
            }
        }
    },

    downItem(item) {
        let current
        let next

        console.log('dropping item')

        const l = document.querySelector('ol')
        const lLen = l.childNodes.length
        for (let k = 0; k < lLen; k++) {
            for (let movie in this.movies) {
                const nm = '#el' + movie
                console.log(nm)
                movie.bool = false

                //$(liList[delList.indexOf(clicked_id)]).remove()
                document.querySelector(nm).style.border = 'thick solid crimson'
            }
        }
    },
}

app.init({
    formSelector: '#movie-form',
    listSelector: '#movie-list',
})