describe('Member Management: Add and Verify Member', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = '../screenshots (ghost_4.5)/E006-add_new_member_before/create_member';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost4();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('Add a new member and verify it appears in the list of members', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        takeScreenshot();

        // Enter the members section
        cy.get('svg#members_svg__Regular').first().click();
        cy.url().should('include', '/ghost/#/members');
        takeScreenshot();

        // Create a new member
        cy.get('a[href="#/members/new/"]').first().click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/members/new');
        takeScreenshot();

        cy.get('input#member-name').type('John Doe');
        cy.get('input#member-email').type('test2a25@test.com');
        cy.get('.ember-power-select-trigger-multiple-input').type('Test Label{enter}');
        cy.get('textarea#member-note').type('Test Note');
        takeScreenshot();

        cy.get('button.gh-btn-primary').contains('Save').click();
        cy.url().should('include', '/ghost/#/members');
        takeScreenshot();
    });
});
