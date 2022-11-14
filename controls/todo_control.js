const { todos } = require('../models');

module.exports = {
    /* -- Start Menambahkan Todo Baru -- */

    addTodo: async (req, res) => {
		const { title, desc } = req.body;

		if (!title) {
			return res.status(400)
				.send({ 
                    status: 'Gagal', 
                    pesan: 'Judul tidak boleh kosong!' 
                });
        }

		const idLama = await todos.find({ 
            author: req.user 
        }).sort({ id: -1 }).limit(1);

		const id = !idLama[0]?1 : idLama[0].id+1;

		const todo = new todos({
			id: id,
			title: title,
			desc: desc,
			status: false,
			author: req.user,
		});

		try {
			const simpan = await todo.save();
			res.status(201).send({
				idTodo: simpan.id,
				status: 'Berhasil',
				pesan: 'Todo baru berhasil ditambahkan',
			});

		} catch (error) {
			return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message });
		}
	},
    
    /* -- End Menambahkan Todo Baru -- */


    /* -- Start Melihat Semua Todo -- */

    getTodos: async (req, res) => {

        try {
            const todos = await todos.find({ 
                author: req.user 
            },
                '-_id id title status'
            );

            res.send({ 
                status: 'Berhasil', 
                pesan: 'Semua data todo berhasil ditemukan', 
                data: todos 
            });

        } catch (error) {
            return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message 
            });
        }
    },

    /* -- End Melihat Semua Todo -- */


    /* -- Start Melihat Todo -- */

    getTodo: async (req, res) => {

		const { id } = req.params;

		try {
			const todo = await todos.findOne({ 
                id: id, 
                author: req.user 
            },
				'-_id id title desc status'
			);

			if (!todo) {
				return res.status(404).send({ 
                    status: 'Gagal', 
                    pesan: 'Tidak dapat menemukan todo' 
                });
            }

			res.send({ 
                status: 'Berhasil', 
                pesan: 'Berhasil menemukan todo', 
                data: todo 
            });

		} catch (error) {
			return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message });
		}
	},

    /* -- End Melihat Todo -- */

    /* -- Start Mengupdate Todo -- */

    updateTodo: async (req, res) => {

		const { id } = req.params;

		if (!req.body) {
			return res.status(400).send({ 
                status: 'Gagal', 
                pesan: 'Halaman ini tidak boleh kosong!' 
            })
        }

		try {
			const periksa = await todos.findOne({ 
                id, 
                author: req.user 
            });

			if (!periksa) {
				return res.status(404).send({ 
                    status: 'Gagal', 
                    pesan: 'Tidak dapat menemukan todo!' 
                });
            }

			await todos.findOneAndUpdate({ 
                id, 
                author: req.user 
            }, 
            { 
                ...req.body 
            });
			
            res.send({
				status: 'Berhasil',
				pesan: 'Berhasil mengupdate todo',
			});

		} catch (error) {
			return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message 
            });
		}
	},

    /* -- End Mengupdate Todo -- */

    /* -- Start Menghapus Todo -- */

    deleteTodo: async (req, res) => {
		const { id } = req.params;

		try {
			const periksa = await todos.findOne({ 
                id, 
                author: req.user 
            });

			if (!checker) {
				return res.status(404).send({ 
                    status: 'Gagal', 
                    pesan: 'Tidak ditemukan todo!' });
            }

			await todos.deleteOne({ 
                id, 
                author: req.user 
            });

			res.send({ 
                status: 'Berhasil', 
                pesan: 'Berhasil menghapus todo' 
            });

		} catch (error) {
			return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message 
            });
		}
	},

    /* -- End Menghapus Todo -- */

    /* -- Start Menghapus Semua Todo -- */

    deleteTodos: async (req, res) => {

		try {
			await todos.deleteMany({ 
                author: req.user 
            });

			res.send({ 
                status: 'Berhasil', 
                pesan: 'Berhasil menghapus semua todo' 
            });

		} catch (error) {
			return res.status(500).send({ 
                status: 'Gagal', 
                pesan: error.message 
            });
		}
	}

    /* -- End Menghapus Semua Todo -- */
}