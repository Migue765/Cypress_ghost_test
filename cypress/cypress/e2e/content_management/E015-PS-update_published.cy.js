const mockData = require('./ps_mock_page.json');

describe('Content Management: Create and Verify Post', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E009-create_published_before/create_published';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('Create a new post and verify it appears in the list of posts', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);

        cy.get('[data-test-nav-custom="posts-Published"]').click();
        cy.url().should('include', '/ghost/#/posts');

        cy.get('[data-test-new-post-button]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/editor/post');

        let radom_pos = mockData[Math.floor(Math.random() * mockData.length)];
        let titleFake = radom_pos.titulo;
        let contentFake = radom_pos.contenido;
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
        radom_pos = mockData[Math.floor(Math.random() * mockData.length)];
        titleFake = radom_pos.titulo;
        contentFake = radom_pos.contenido
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
