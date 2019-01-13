'use strict';

const faker = require('faker');
const Dashboard = require('../../models/dashboard');

const dashboardMock = module.exports = {};

dashboardMock.pCreateMock = () => {
  const mock = {};
  mock.request = {
    title: faker.random.word(),
    tiles: [],
  };

  return Dashboard.create(mock.request.title, mock.request.tiles)
    .then((createdDashboard) => {
      mock.dashboard = createdDashboard;
      return mock;
    })
    .catch((error) => {
      console.log(error);
    });
};

dashboardMock.pCleanDashboardMocks = () => Dashboard.remove({});
