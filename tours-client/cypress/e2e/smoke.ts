/// <reference types="../support/index" />
/// <reference types="cypress" />

describe(`app`, () => {
  it(`should work`, () => {
    cy.visit(`/`).assertRoute(`/`);
    cy.contains('Edit src/App.tsx and save to reload.');
  });
});
