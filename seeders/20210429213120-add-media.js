'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Media", [
      {
        room_id: 1,
        file_name: '01-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 1,
        file_name: '01-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 1,
        file_name: '01-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 2,
        file_name: '02-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 2,
        file_name: '02-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 2,
        file_name: '03-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 3,
        file_name: '03-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 3,
        file_name: '03-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 3,
        file_name: '03-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 4,
        file_name: '04-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 4,
        file_name: '04-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 4,
        file_name: '04-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 5,
        file_name: '05-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 5,
        file_name: '05-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 5,
        file_name: '05-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 6,
        file_name: '06-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 6,
        file_name: '06-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 6,
        file_name: '06-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 7,
        file_name: '07-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 7,
        file_name: '07-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 7,
        file_name: '07-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 8,
        file_name: '08-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 8,
        file_name: '08-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 8,
        file_name: '08-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 9,
        file_name: '09-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 9,
        file_name: '09-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 9,
        file_name: '09-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 10,
        file_name: '10-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 10,
        file_name: '10-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 10,
        file_name: '10-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 11,
        file_name: '11-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 11,
        file_name: '11-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 11,
        file_name: '11-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 12,
        file_name: '12-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 12,
        file_name: '12-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 12,
        file_name: '12-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 13,
        file_name: '13-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 13,
        file_name: '13-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 13,
        file_name: '13-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 14,
        file_name: '14-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 14,
        file_name: '14-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 14,
        file_name: '14-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 15,
        file_name: '15-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 15,
        file_name: '15-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 15,
        file_name: '15-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 16,
        file_name: '16-01.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 16,
        file_name: '16-02.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 16,
        file_name: '16-03.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Media", null, {});
    
  }
};
