const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');


describe('Content Management: Create and Verify Post', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');


    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('Create a new post and verify it appears in the list of posts', () => {
        cy.request('GET', APIREST + '?schema=page').then((response) => {

            expect(response.status).to.eq(200);


            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];

            cy.visit(LOCAL_HOST + "#/dashboard");
            cy.wait(2000);

            cy.get('[data-test-nav-custom="posts-Published"]').click();
            cy.url().should('include', '/ghost/#/posts');

            cy.get('[data-test-new-post-button]').click();
            cy.wait(2000);
            cy.url().should('include', '/ghost/#/editor/post');


            let titleFake = radom_data.titulo;
            let contentFake = radom_data.contenido;
            cy.get('.gh-editor-title').type(titleFake);
            cy.get('[data-secondary-instance="false"]').type(contentFake);

            cy.get('[data-test-button="publish-flow"]').first().click();
            cy.get('[data-test-button="continue"]').click();
            cy.get('[data-test-button="confirm-publish"]').click();

            cy.get('[data-test-button="close-publish-flow"]').click();

            cy.url().should('include', '/ghost/#/posts');

            cy.get('div.posts-list.gh-list.feature-memberAttribution')
                .should('contain', titleFake);

            cy.get('div.posts-list.gh-list.feature-memberAttribution').first().click();
            radom_data = response.body[Math.floor(Math.random() * response.body.length)];
            titleFake = radom_data.titulo;
            contentFake = radom_data.contenido;
            cy.get('.gh-editor-title').clear();
            cy.get('.gh-editor-title').type(titleFake);
            cy.get('[data-secondary-instance="false"]').clear();
            cy.get('[data-secondary-instance="false"]').type(contentFake);
            cy.get('[data-test-task-button-state="idle"]').first().click();
            cy.visit(LOCAL_HOST + "#/posts");
            cy.get('div.posts-list.gh-list.feature-memberAttribution')
                .should('contain', titleFake);

            //Delete post
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
});
