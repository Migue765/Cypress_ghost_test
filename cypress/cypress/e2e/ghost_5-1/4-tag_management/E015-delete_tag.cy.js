describe('Delete a tag and verify it is not in the tag list', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E015-delete_tag_before/delete_tag';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Delete a tag and verify it is not in the tag list', () => {
        cy.visit(LOCAL_HOST + "#/tags");
        cy.wait(1000);
        takeScreenshot();

        function deleteTagIfExists() {
            cy.get('section.view-container.content-list').then($section => {
                if ($section.find('a[title="Edit tag"]').length > 0) {
                    cy.get('a[title="Edit tag"]').first().click();
                    takeScreenshot();
                    cy.get('button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]').click();
                    takeScreenshot();
                    cy.get('div.modal-content[data-test-modal="confirm-delete-tag"]').contains('Delete').click();
                    takeScreenshot();
                    deleteTagIfExists();
                }
            });
        }

        deleteTagIfExists();
    });

});
