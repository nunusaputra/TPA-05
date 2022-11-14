const jwt = require('jsonwebtoken');
const { user } = require('../models');
const validator = require('validator')

module.exports = {
    /* -- Start Membuat User Baru -- */

    register: async (req, res) => {
		const { 
            username: username, 
            email: email, 
            password: password,
            noHP: noHP 
        } = req.body;

		if (!username || !email || !password) {
			return res.status(400).send({ 
                status: 'Gagal', 
                pesan: 'Kolom tidak boloh kosong!' });
		}


        // Mengecek email tidak valid
        if(email) {
            if(!validator.isEmail(email)) {
                return res.status(400).send({
                    status: 'Gagal',
                    pesan: 'Email tidak valid!'
                })
            }
        }
        

		// Mengecek email duplikat
		const periksa = await user.findOne({ 
            email 
        });

		if (periksa) {

			return res.status(400).send({ 
                status: 'Gagal', 
                pesan: 'Email sudah terpakai' 
            });
        }

        // Mengecek Nomer Handphone Tidak Valid
        if(noHP) {
            if(!validator.isMobilePhone(noHP, 'id-ID')) {
                return res.status(400).send({
                    status: 'Gagal',
                    pesan: 'Nomer Handphone anda tidak valid!'
                })
            }
        }

        const users = new user({ 
            username: username, 
            email: email, 
            password: password,
            noHP: noHP 
        });

		try {
			const simpan = await users.save();
			res.status(201).send({
				idUser: simpan._id,
				status: 'Berhasil',
				pesan: 'User baru berhasil ditambahkan',
			});

		} catch (error) {
			return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message 
            });
		}
	},

    /* -- End Membuat User Baru -- */


    /* Start Menu Login User -- */

    login: async (req, res) => {

		const { 
            email: email, 
            password: password 
        } = req.body;

		const users = await user.findOne({ 
            email 
        });

		if (!users) {
			return res.status(404).send({ 
                status: 'Gagal', 
                pesan: 'User tidak ditemukan' });
        }

		if (users.password != password) {
			return res.status(400).send({ 
                status: 'Gagal', 
                pesan: 'Password anda salah!' 
            });
		}

		const jsonToken = jwt.sign({ 
            _id: user._id 
        }, process.env.SECRET_KEY, {
			expiresIn: '8h',
		});

		res.send({ 
            status: 'Berhasil', 
            pesan: 'Login Berhasil', jsonToken 
        });
	},

    /* End Menu Login User -- */
}