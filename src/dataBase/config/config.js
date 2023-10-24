module.exports = {

  "development": {
    "username": "julid",
    "password": '36311459',
    "database": "sportify_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": '',
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": '',
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
//en nuestro caso vamos a usar solo la de desarrollo, recomiendo que si no les anda cambien el root o password y verifiquen si su base tiene el mismo nombre
