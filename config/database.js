const sql = require('msnodesqlv8');

const connectionString =
    'server=DESKTOP-B7CJM7P\\SQLEXPRESS;Database=APIProdutosDB;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}';

function conectarBanco(callback) {
    sql.open(connectionString, (err, conn) => {
        if (err) {
            console.error('Erro ao conectar ao SQL Server:', err);
            callback(err, null);
            return;
        }

        callback(null, conn);
    });
}

module.exports = conectarBanco;