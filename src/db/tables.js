var ID_TYPE = {
    type: 'INTEGER',
    primary: true,
    notnull: true
},
ID_JOIN_TYPE = function(ref, nil) {
    return {
        type: 'INTEGER',
        ref: ref,
        notnull: !nil
    };
};

exports.tables = {
    users: {
        id: ID_TYPE,
        login: {
            type: 'TEXT',
            notnull: true,
            unique: true
        },
        password: {
            type: 'TEXT',
            notnull: true
        },
        active: {
            type: 'INTEGER',
            notnull: true,
            'default': 1
        }
    },
    roles: {
        id: ID_TYPE,
        name: {
            type: 'TEXT',
            notnull: true,
            unique: true
        }
    },
    permissions: {
        id: ID_TYPE,
        name: {
            type: 'TEXT',
            notnull: true,
            unique: true
        }
    },
    role_permissions: {
        role_id: ID_JOIN_TYPE('roles'),
        permission_id: ID_JOIN_TYPE('permissions')
    },
    rights: {
        user_id: ID_JOIN_TYPE('users'),
        role_id: ID_JOIN_TYPE('roles'),
        pier_id: ID_JOIN_TYPE('piers', true)
    },
    piers: {
        id: ID_TYPE,
        name: {
            type: 'TEXT',
            notnull: true,
            unique: true
        },
        endpoint: {
            type: 'TEXT',
            notnull: true,
            unique: true
        }
    }
};

exports.defaults = {
    users: [{
        login: 'admin',
        password: 'admin'
    }],
    permissions: [
        { id: 1, name: 'add_item' },
        { id: 2, name: 'delete_own_item' },
        { id: 3, name: 'delete_item' },
        { id: 4, name: 'download_item' },
        { id: 5, name: 'view_item' }
    ],
    roles: [
        { id: 1, name: 'admin' },
        { id: 2, name: 'trusted' },
        { id: 3, name: 'client' }
    ],
    role_permissions: [
        { role_id: 1, permission_id: 1 },
        { role_id: 1, permission_id: 3 },
        { role_id: 1, permission_id: 4 },
        { role_id: 1, permission_id: 5 },
        { role_id: 2, permission_id: 1 },
        { role_id: 2, permission_id: 2 },
        { role_id: 2, permission_id: 4 },
        { role_id: 2, permission_id: 5 },
        { role_id: 3, permission_id: 4 },
        { role_id: 3, permission_id: 5 }
    ],
    rights: [
        { user_id: 1, role_id: 1, pier_id: null }
    ]
};