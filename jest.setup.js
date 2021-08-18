import '@testing-library/jest-dom/extend-expect';

/* eslint-disable global-require */
require('isomorphic-fetch');

jest.mock('next/router', () => require('next-router-mock'));
/* eslint-enable global-require */
