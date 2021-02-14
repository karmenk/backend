'use strict'

module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert('clients', [
        {
          id: 1,
          name: 'Client 1',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          id: 2,
          name: 'Client 2',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Client 3',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Client 4',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Client 5',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Client 6',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Client 7',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'Client 8',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'Client 9',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'Client 10',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])

      await queryInterface.bulkInsert('users', [
        {
          id: 1,
          clientId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          clientId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])

      await queryInterface.bulkInsert('accounts', [
        {
          id: 1,
          userId: 1,
          username: 'user1',
          password: '$2b$12$lS5lvIoBvT/Hl0NeS3EFM.yYgHha.VnBIFO.Rs6PJLW0SdZ1XBXWC',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          userId: 2,
          username: 'user2',
          password: '$2b$12$3zyh4wn7y8eGGxQlFc5HROcQNVPbTQW03Rxn.iM1nGZ7xkYXhmREO',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])

    } catch (e) {
      console.log(e)
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.bulkDelete('accounts', {})
      await queryInterface.bulkDelete('users', {})
      await queryInterface.bulkDelete('clients', {})
    } catch (e) {
      console.log(e)
    }
  }
}
