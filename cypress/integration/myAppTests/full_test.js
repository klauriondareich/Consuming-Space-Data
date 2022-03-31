// Cypress tests

// Tests if api url are accessible

// Test if all menu items are accessible

// Passed Tests
describe('Access Homepage', () => {
    it('Go in homepage', () => {
      cy.visit('http://localhost:3000/launches')
      cy.get('a').contains('Tous les lancements').click()
      })
  })

  describe('Access all launchees page', () => {
    it('Go in all launches page', () => {
      cy.visit('http://localhost:3000/all_launches')
      cy.get('a').contains('Tous les lancements').click()
      })
  })

  describe('Access Welcome page', () => {
    it('Go in welcome page', () => {
      cy.visit('http://localhost:3000')
      cy.get('a').contains('Welcome in Space World').click()
      })
  })

  // Failed test : because this page doesn't exist 
  describe('Access 404 page', () => {
    it('Go 404 page', () => {
      cy.visit('http://localhost:3000/notFound')
      cy.get('a').contains('Page not found').click()
      })
  })

  // Test if api page is accessible
  describe('Access Api page', () => {
    it('Getting api page', () => {
      cy.visit('https://api.spacex.land/rest/')
      })
  })