
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        { id: 1,
          title: 'go to store for milk',
          
        },
        { id: 2,
          title: 'walk the dog',
          
        },
        { id: 3,
          title: 'go to the gym',
          
        },
        { id: 4,
          title: 'stop the damn leafblowers outside',
          
        },
        { id: 5,
          title: 'get the mail',
          
        },
        { id: 6,
          title: 'get some headphones',
          
        },
      ]);
    });
};
