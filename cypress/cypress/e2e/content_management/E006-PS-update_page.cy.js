const mockData = require('./ap_mock_data.json');


describe('Content Management: Create and Verify Page', () => {


    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Create a new page and verify it appears in the list of pages', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('[data-test-nav="pages"]').click();
        cy.url().should('include', '/ghost/#/pages');

        cy.get('[data-test-new-page-button]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/editor/page');

        cy.get('.gh-editor-title', { timeout: 10000 }).should('be.visible');

        let radom_pos = mockData[Math.floor(Math.random() * mockData.length)];
        let titleFake = radom_pos.titulo;
        let contentFake = radom_pos.contenido
        cy.get('.gh-editor-title').type(titleFake);
        cy.get('[data-secondary-instance="false"]').type(contentFake);
        cy.get('[data-test-button="publish-flow"]').first().click();
        cy.get('[data-test-button="continue"]').click();
        cy.get('[data-test-button="confirm-publish"]').click();
        cy.get('[data-test-button="close-publish-flow"]').click();
        cy.get('div.posts-list.gh-list.feature-memberAttribution')
            .should('contain', titleFake);

        cy.get('div.posts-list.gh-list.feature-memberAttribution').first().click();
        radom_pos = mockData[Math.floor(Math.random() * mockData.length)];
        titleFake = radom_pos.titulo;
        contentFake = radom_pos.contenido
        cy.get('.gh-editor-title').clear();
        cy.get('.gh-editor-title').type(titleFake);
        cy.get('[data-secondary-instance="false"]').clear();
        cy.get('[data-secondary-instance="false"]').type(contentFake);
        cy.get('[data-test-task-button-state="idle"]').first().click();
        cy.visit(LOCAL_HOST + "#/pages");
        cy.get('div.posts-list.gh-list.feature-memberAttribution')
            .should('contain', titleFake);

        cy.url().should('include', '/ghost/#/pages');

        //Delete pages
        cy.get('.gh-list-row.gh-posts-list-item.gh-post-list-plain-status').each(
            ($el, index, $list) => {
                cy.get('div.posts-list.gh-list.feature-memberAttribution').first().click();
                cy.get('[data-test-psm-trigger]').click();
                cy.get('[data-test-button="delete-post"]').click();
                cy.get('[data-test-button="delete-post-confirm"]').click();
            }
        )
    });
});
