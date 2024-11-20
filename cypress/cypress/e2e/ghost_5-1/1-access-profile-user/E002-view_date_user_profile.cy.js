describe('Access profile: view date user profile ', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E002-view_date_user_profile_before/view_date_user_profile';
    let screenshotCounter = 1;
    const NAME = Cypress.env('NAME');

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('View date user', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        takeScreenshot();

        // click profile section
        cy.get('div.gh-user-avatar.relative').click();
        takeScreenshot();
        cy.get('.dropdown-menu.dropdown-triangle-top').should('be.visible');
        cy.get('a[data-test-nav="user-profile"').click();
        takeScreenshot();
        cy.url().should('include', '/ghost/#/settings/staff/jaime');
        takeScreenshot();
        cy.get('input[class*="peer z-[1]"]').should('exist') .should('be.visible').invoke('val')
        .then((actualValue) => {
      if (actualValue !== NAME) {
        throw new Error(`El valor del campo es "${actualValue}", pero se esperaba "${NAME}".`);
      }
      cy.log(`El valor del campo es correcto: ${actualValue}`);
    });

    });




});
