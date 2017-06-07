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
        this.movies.push(movie)

        this.max++
        this.count++
    },

    buildListItem(movie) {
        const item = document.createElement('li')
        item.textContent = movie.name

        const promoteButton = document.createElement('button')
        promoteButton.setAttribute('id', 'prmB' + this.count)
        promoteButton.setAttribute('onClick', 'app.promoteItem(this.id)')
        promoteButton.setAttribute('type', 'button')
        promoteButton.setAttribute('class', 'warning button')
        promoteButton.innerHTML = '&nbsp + &nbsp'
        promoteButton.style.color = 'red'
        promoteButton.style.fontSize = '1.5rem'
        item.appendChild(promoteButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'delB' + this.count)
        deleteButton.setAttribute('onClick', 'deleteItem(this.id)')
        deleteButton.setAttribute('type', 'button')
        deleteButton.setAttribute('class', 'alert button')
        deleteButton.innerHTML = '&nbsp X &nbsp'
        deleteButton.style.color = 'whitesmoke'
        deleteButton.style.fontSize = '1.5rem'
        item.appendChild(deleteButton)

        const upButton = document.createElement('button')
        upButton.setAttribute('id', 'delB' + this.count)
        upButton.setAttribute('onClick', 'upItem(this.id)')
        upButton.setAttribute('type', 'button')
        upButton.setAttribute('class', 'primary button')
        upButton.innerHTML = '&nbsp ↑ &nbsp'
        upButton.style.color = 'gold'
        upButton.style.fontSize = '1.5rem'
        item.appendChild(upButton)

        const downButton = document.createElement('button')
        downButton.setAttribute('id', 'delB' + this.count)
        downButton.setAttribute('onClick', 'downItem(this.id)')
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

        const ul = document.querySelector('ul')
        const ulLen = ul.childNodes.length
        for (let k = 0; k < ulLen; k++) {
            for (let movie in this.movies) {
                const nm = 'prmB' + name
                console.log(this.movies)
                if (movie.bool && nm === clicked_id) {
                    movie.bool = false
                    document.querySelector(movie.id).style.border = 'thick solid crimson'
                } else if (nm === clicked_id) {
                    movie.bool = true
                    document.querySelector(movie.id).style.border = 'transparent'
                }
            }
        }
    },

    deleteItem(item_id) {
        console.log('deleting item')

        let k = 1
        for (let bool in boolList) {
            for (let name in list) {
                let split = new Array()
                split = name.split('')
                const id = '#el' + split[0]
                const nm = '#el' + name
                //boolList.splice(delList.indexOf(clicked_id), 1)
                this.movies[k].bool = false

                $(liList[delList.indexOf(clicked_id)]).remove()
            }
            k++
        }
    },

    upItem(clicked_id) {

    },

    downItem(clicked_id) {

    },
}

app.init({
    formSelector: '#movie-form',
    listSelector: '#movie-list',
})