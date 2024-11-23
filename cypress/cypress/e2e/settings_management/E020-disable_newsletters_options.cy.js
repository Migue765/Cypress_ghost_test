describe('Disable NewsLetters design options', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E020-disable_newsletters_options_before/disable_newsletters_options';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.enableNewsletterSubscription();
        cy.enableAllNewsletterDesignOptions();
    });

    it('Process to disable all design options of newsletters section', () => {
        cy.visit(LOCAL_HOST + "#/settings");
        takeScreenshot();

        cy.get('a#newsletters').click();
        takeScreenshot();

        cy.get('div.grow.py-2').first().click();
        takeScreenshot();

        cy.get('button#design').click();
        takeScreenshot();

        cy.get('button[role="switch"]').then(($buttons) => {
            Cypress._.each(Cypress._.reverse($buttons), ($el) => {
                const isPostTitleButton = $el.id === ':r2j:';

                if (!isPostTitleButton && ($el.getAttribute('aria-checked') === 'true' || $el.getAttribute('data-state') === 'checked')) {
                    cy.wrap($el).click({force: true}).then(() => {
                        cy.wrap($el).should('have.attr', 'aria-checked', 'false');
                        cy.wrap($el).should('have.attr', 'data-state', 'unchecked');
                    });
                }
            });
        });
        takeScreenshot();

        cy.get('button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4[type="button"]').contains('Save').click();
    });
});
