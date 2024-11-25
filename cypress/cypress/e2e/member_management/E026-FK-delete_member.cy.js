describe('Member Management: Edit and Save Member Information', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E007-edit_member_before/edit_member';
    let screenshotCounter = 1;

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

    it('Edit an existing member\'s information and save the changes', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);
        takeScreenshot();

        // Verify that the user has logged in successfully
        cy.url().should('include', '/ghost/#/dashboard');
        takeScreenshot();

        // Enter the members section
        cy.get('[data-test-nav="members"]').click();
        cy.url().should('include', '/ghost/#/members');
        takeScreenshot();

        // Create a new page
        cy.get('.gh-members-list-row').first().click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/members');
        takeScreenshot();
        cy.get('[data-test-input="member-name"]').clear();
        cy.get('[data-test-input="member-name"]').type('Miguel Gómez');
        cy.get('[data-test-input="member-email"]').clear();
        cy.get('[data-test-input="member-email"]').type('test2a25@test.com');
        cy.get('.ember-power-select-trigger-multiple-input').type('Test Label 2{enter}');
        cy.get('[data-test-input="member-note"]').type('Edited Note');
        takeScreenshot();

        cy.get('[data-test-button="save"]').click();
        takeScreenshot();

        cy.url().should('include', '/ghost/#/members');
        takeScreenshot();
    });
});
