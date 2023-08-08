const mainController = {
    home:(req, res) => {
        res.render("home");
    },
    register: (req, res) => {
        res.render("login-register");
    }
}

module.exports = mainController;