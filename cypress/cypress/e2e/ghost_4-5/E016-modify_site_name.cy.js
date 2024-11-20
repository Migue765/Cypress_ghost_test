describe('Modify Site Name', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = '../screenshots (ghost_4.5)/E016-modify_site_name_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost4();
    });

    it('Modify the site name in the general settings and verify the change in the interface', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        takeScreenshot();
        cy.get('a[href="#/settings/general/"]').first().click();
        takeScreenshot();
        cy.get('button.gh-btn').contains('Expand').click();
        takeScreenshot();
        cy.get('input.gh-input.ember-view').clear();
        cy.wait(1000);
        cy.get('input.gh-input.ember-view').first().type('New title site', {force: true});
        cy.wait(1000);
        takeScreenshot();
        cy.get('button.gh-btn-primary').contains('Save settings').click();
        takeScreenshot();
        cy.reload();
        takeScreenshot();
        cy.contains('New title site').should('exist');
        takeScreenshot();
    });
});
