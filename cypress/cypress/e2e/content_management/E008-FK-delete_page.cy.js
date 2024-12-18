import { faker } from '@faker-js/faker';

describe('Content Management: Delete and Verify Post', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new post and verify it appears in the list of posts', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('[data-test-nav="pages"]').click();
        cy.url().should('include', '/ghost/#/pages');

        cy.get('[data-test-new-page-button]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/editor/page');

        cy.get('.gh-editor-title', { timeout: 10000 }).should('be.visible');

        let titleFake = faker.lorem.words(5);
        cy.get('.gh-editor-title').type(titleFake);
        cy.get('[data-secondary-instance="false"]').type("hello");
        cy.get('[data-test-button="publish-flow"]').first().click();
        cy.get('[data-test-button="continue"]').click();
        cy.get('[data-test-button="confirm-publish"]').click();

        cy.get('[data-test-button="close-publish-flow"]').click();


        cy.get(".view-container.content-list").find('.gh-list-row.gh-posts-list-item.gh-post-list-plain-status')
            .each((el, index) => {
                if (el.text().includes(titleFake)) {
                    cy.get(`.gh-list-row.gh-posts-list-item.gh-post-list-plain-status:eq(${index})`).click();
                    cy.get('[data-test-psm-trigger]').click();
                    cy.get('[data-test-button="delete-post"]').click();
                    cy.get('[data-test-button="delete-post-confirm"]').click();
                }
            });

        cy.get('section.gh-canvas.gh-canvas-sticky').find('.view-container.content-list').should('not.contain', titleFake);
    });
});
