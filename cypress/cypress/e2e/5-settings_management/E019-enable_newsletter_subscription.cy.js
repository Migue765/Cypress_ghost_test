describe('Enable Newsletter Subscription', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E019-enable_newsletter_subscription_before/enable_newsletter_subscription';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Enable newsletter subscription and verify the option is available', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        takeScreenshot();
        cy.get('#\\:ro\\:').click();
        takeScreenshot();
        cy.get('#\\:ro\\:').should('be.enabled');
        takeScreenshot();
    });
});
