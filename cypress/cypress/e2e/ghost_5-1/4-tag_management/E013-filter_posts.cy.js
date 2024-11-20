describe('Filter posts by tag', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const NAME_TAG_2 = Cypress.env('NAME_TAG_2');
    const SCREENSHOT_PATH = 'E013-filter_posts_before/filter_posts';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Filter posts by tag', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);
        takeScreenshot();

        cy.get('a[data-test-nav="posts"]').click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('div.gh-contentfilter-menu.gh-contentfilter-tag[data-test-tag-select="true"]').click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('div.gh-contentfilter-menu-dropdown li.ember-power-select-option').contains(NAME_TAG_2).should('exist').click();
        cy.wait(2000);
        takeScreenshot();
    });
});
