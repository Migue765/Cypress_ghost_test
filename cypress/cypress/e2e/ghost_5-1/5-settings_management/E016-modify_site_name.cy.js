describe('Modify Site Name', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E016-modify_site_name_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Modify the site name in the general settings and verify the change in the interface', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        takeScreenshot();
        cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
        takeScreenshot();
        cy.get('input[placeholder="Site title"]').clear();
        takeScreenshot();
        cy.get('input[placeholder="Site title"]').type('New title site');
        takeScreenshot();
        cy.get('#admin-x-settings-scroller button.cursor-pointer.bg-green').click();
        takeScreenshot();
        cy.reload();
        takeScreenshot();
        cy.contains('New title site').should('exist');
        takeScreenshot();
    });
});
