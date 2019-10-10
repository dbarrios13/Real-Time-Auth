
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('user').insert([
    {
      id: 1,
      name: 'David',
      email: 'dbarrios@gmail.com',
      username: 'dbarrios',
      password: 'password'
    },
    {
      id: 2,
      name: 'Juan',
      email: 'juan@gmail.com',
      username: 'juan1',
      password: 'password'
    }
  ]);
};
