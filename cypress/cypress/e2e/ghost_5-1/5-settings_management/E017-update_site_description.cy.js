describe('Update Site Description', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E017-update_site_description_before/update_site_description';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Update the site description in the general settings', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        takeScreenshot();
        cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
        takeScreenshot();
        cy.get('input[placeholder="Site description"]').clear();
        takeScreenshot();
        cy.get('input[placeholder="Site description"]').type('New Site Description');
        takeScreenshot();
        cy.get('#admin-x-settings-scroller button.cursor-pointer.bg-green').click();
        takeScreenshot();
        cy.reload();
        takeScreenshot();
        cy.contains('New Site Description').should('exist');
        takeScreenshot();
    });
});
