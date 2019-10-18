function criarCliente(nome, telefone, email, rua, bairro, estado, cep, area, obs, callback) {
    pool.query('INSERT INTO clientes (clientenome, clientetelefone, clienteemail, clienterua, clientebairro, clienteestado, clientecep, clientearea, clienteobs) VALUES ($1) RETURNING *;', [nome, telefone, email, rua, bairro, estado, cep, area, obs], function (err, res) {
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

function updateClientes(id, nome, telefone, email, rua, bairro, estado, cep, area, obs, callback) {
    pool.query('UPDATE clientes SET clientenome, clientetelefone, clienteemail, clienterua, clientebairro, clienteestado, clientecep, clientearea, clienteobs = $1 WHERE clienteid = $2 RETURNING *;', [nome, telefone, email, rua, bairro, estado, cep, area, obs, id], function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows[0]);
        }
    });
}
