const db = require('../dataBase/models')

const authEditProfile = async (req, res, next) => {
    const profileId = req.params.id;
    const userId = req.session.userId;

    try {
        const profile = await db.User.findByPk(profileId);
        if (!profile) {
            return res.status(404).send('El perfil no existe.');
        }
        if (profile.id !== userId) {
            return res.status(403).redirect(`/user/perfil/${profileId}`);
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};


module.exports = authEditProfile
