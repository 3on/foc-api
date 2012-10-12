var sqlite = require('sqlite-wrapper');

function Db(options) {
    this._sql = sqlite(options.db, options.debug);
}

Db.prototype.addUser = function(login, password, cb) {
    this._sql.insert('users', { login: login, password: password }, cb);
};

Db.prototype.deactivateUser = function(id, cb) {
    this._sql.updateById('users', id, { active: false }, cb);
};

Db.prototype.login = function(login, password, cb) {
    this._sql.selectOne('users', null, null, 'login=? and password=?', [login, password], cb);
};

Db.prototype.retrieveRights = function(userId, cb) {
    this._sql.select('rights', {
        'users': 'rights.user_id=users.id',
        'roles': 'roles.id=rights.role_id',
        'piers': 'piers.id=rights.pier_id'
    }, {
        'roles.name': 'role_name',
        'piers.name': 'pier_name',
        'piers.id': 'pier_id'
    });
};

module.exports = function(options) {
    return new Db(options);
};