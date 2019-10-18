const Pool = require('pg').Pool;
const pool = new Pool({
    host: '172.20.0.3',
    user: 'postgres',
    database: 'clientes',
    password: 'dashboard',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})


module.exports = function (app) {
    function criarCliente(nome, telefone, email, rua, bairro, estado, cep, area, obs, callback) {
        pool.query('INSERT INTO clientes (clientenome, clientetelefone, clienteemail, clienterua, clientebairro, clienteestado, clientecep, clientearea, clienteobs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', [nome, telefone, email, rua, bairro, estado, cep, area, obs], function (err, res) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res.rows[0]);
            }
        });
    }

    function todosClientes(callback) {
        pool.query('SELECT * FROM clientes;', function (err, res) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res.rows);
            }
        });
    }

    function deleteClientes(id, callback) {
        pool.query('DELETE FROM clientes WHERE clienteid = $1', [id], function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    function updateTask(id, nome, telefone, email, rua, bairro, estado, cep, area, obs, callback) {
        pool.query('UPDATE clientes SET clientenome = $1, clientetelefone = $2, clienteemail = $3, clienterua = $4, clientebairro = $5, clienteestado = $6, clientecep = $7, clientearea = $8, clienteobs = $9 WHERE clienteid = $10 RETURNING *;', [nome, telefone, email, rua, bairro, estado, cep, area, obs, id], function (err, res) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res.rows[0]);
            }
        });
    }
    // Handle PUT request to /api/tasks/
    // Creates a new task and return it


    // app.put('/api/clientes/', function (req, res) {
    //     const nome = req.body.nome;
    //     const telefone = req.body.telefone;
    //     const email = req.body.email;
    //     const rua = req.body.rua;
    //     const bairro = req.body.bairro;
    //     const estado = req.body.estado;
    //     const cep = req.body.cep;
    //     const area = req.body.area;
    //     const obs = req.body.obs;
    //     criarCliente(nome, telefone, email, rua, bairro, estado, cep, area, obs, function (err, cliente) {
    //         if (err) {
    //             res.sendStatus(500)
    //         } else {
    //             res.send(JSON.stringify(cliente))
    //         }
    //     })
    // })


    app.post('/api/clientes/', function (req, res) {
        const nome = req.body.clientenome;
        const telefone = req.body.clientetelefone;
        const email = req.body.clienteemail;
        const rua = req.body.clienterua;
        const bairro = req.body.clientebairro;
        const estado = req.body.clienteestado;
        const cep = req.body.clientecep;
        const area = req.body.clientearea;
        const obs = req.body.clienteobs;
        criarCliente(nome, telefone, email, rua, bairro, estado, cep, area, obs, function (err, cliente) {
            if (err) {
                res.sendStatus(500)
            } else {
                res.send(JSON.stringify(cliente))
            }
        })

    })



    // Handle GET request to /api/tasks/
    // Returns all tasks
    app.get('/api/clientes/', function (req, res) {
        todosClientes(function (err, clientes) {
            if (err) {
                res.sendStatus(500)
            } else {
                res.send(JSON.stringify(clientes))
            }
        })
    })

    // Handle delete requests to /api/tasks/task_id
    // Deletes a task and return a status code 200
    app.delete('/api/clientes/:id', function (req, res) {
        const id = req.params.id;
        deleteClientes(id, function (err) {
            if (err) {
                console.log('err')
                res.sendStatus(500)
            } else {
                console.log(res)
                res.sendStatus(200)
            }
        })
    })

    // Handle post requests to /api/tasks/task_id
    // Update task's is_done column and return it
    app.put('/api/clientes/:id', function (req, res, err) {
        const id = req.params.id;
        const nome = req.body.clientenome;
        const telefone = req.body.clientetelefone;
        const email = req.body.clienteemail;
        const rua = req.body.clienterua;
        const bairro = req.body.clientebairro;
        const estado = req.body.clienteestado;
        const cep = req.body.clientecep;
        const area = req.body.clientearea;
        const obs = req.body.clienteobs;
        updateTask(id, nome, telefone, email, rua, bairro, estado, cep, area, obs, function (err, cliente) {
            if (err) {
                res.sendStatus(500)
            } else {
                res.send(JSON.stringify(cliente))
            }
        })

    })
}
