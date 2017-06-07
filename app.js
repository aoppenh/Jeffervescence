const app = {
    init(formSelector) {
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.addMovie)
    },

    addMovie(ev) {
        ev.preventDefault()

        const movieName = ev.target.movieName.value
    },
}

app.init('#movieForm')