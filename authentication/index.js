const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	const jsonToken = req.headers.authorization;

	if (!jsonToken) return res.status(403).send({ 
        status: 'Gagal', 
        pesan: 'Anda tidak memiliki akses' });

	try {
		const decod = jwt.verify(jsonToken, process.env.SECRET_KEY);
		if (!decod._id)
			return res.status(401).send({ 
                status: 'Gagal', 
                pesan: 'Unauthorized' 
            });

		req.user = decod._id;

		next();

	} catch (error) {
		return res.status(500).send({ 
            status: 'Gagal', 
            pesan: error.message });
	}
};