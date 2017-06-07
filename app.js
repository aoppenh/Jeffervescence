const app = {
    init(formSelector) {
        this.max = 0
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.addMovie.bind(this))
    },

    addMovie(ev) {
        ev.preventDefault()

        const f = ev.target

        const movie = {
            id: this.max + 1,
            name: f.movieName.value,
        }
        this.max++
    },
}

app.init('#movieForm')