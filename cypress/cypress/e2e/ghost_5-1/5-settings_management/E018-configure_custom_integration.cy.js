describe('Configure Custom Integration', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E018-configure_custom_integration_before/configure_custom_integration';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Configure a custom integration in the advanced section and verify its creation', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        takeScreenshot();
        cy.get('#integrations').scrollIntoView();
        takeScreenshot();
        cy.get('#integrations').click();
        takeScreenshot();
        cy.get('#admin-x-settings-scroller > div > div:nth-child(6) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > button').click();
        takeScreenshot();
        cy.get('input[placeholder="Custom integration"]').type('Custom Integration');
        takeScreenshot();
        cy.get('#modal-backdrop button.bg-black').click();
        takeScreenshot();
        cy.contains('Custom Integration').should('exist');
        takeScreenshot();
    });
});
