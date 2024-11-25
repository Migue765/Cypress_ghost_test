import 'cypress-file-upload';
Cypress.Commands.add('LoginGhost', () => {
    cy.session("Login", () => {
        cy.visit(Cypress.env('LOCAL_HOST'));
        cy.wait(2000);

        cy.url().then((url) => {
            if (url.includes('/setup')) {
                // Fill out the user creation form
                cy.get('input[data-test-blog-title-input]').type('My Blog');
                cy.get('#name').type(Cypress.env('NAME'));
                cy.get('#email').type(Cypress.env('EMAIL'));
                cy.get('#password').type(Cypress.env('PASSWORD'));
                cy.get('[data-test-button="setup"]').click();
                cy.wait(5000);

            } else {
                // Log in with the existing user
                cy.visit(Cypress.env('LOCAL_HOST') + '#/signin');
                cy.get('#identification').type(Cypress.env('EMAIL'));
                cy.get('#password').type(Cypress.env('PASSWORD'));
                cy.get('[data-test-task-button-state="idle"]').click();
            }
        });
        cy.url().should('include', '/ghost/#/dashboard');
    });
});

Cypress.Commands.add('deleteAllTags', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    function deleteTagIfExists() {
        cy.get('section.view-container.content-list').then($section => {
            if ($section.find('a[title="Edit tag"]').length > 0) {
                cy.get('a[title="Edit tag"]').first().click();
                cy.get('button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]').click();
                cy.get('div.modal-content[data-test-modal="confirm-delete-tag"]').contains('Delete').click();
                deleteTagIfExists();
            }
        });
    }

    cy.visit(LOCAL_HOST + "#/tags");
    cy.wait(1000);
    deleteTagIfExists();
});

Cypress.Commands.add('LoginGhost4', () => {
    cy.session("Login", () => {
        cy.visit(Cypress.env('LOCAL_HOST'));
        cy.wait(2000);

        cy.url().then((url) => {
            if (url.includes('/setup')) {
                // Fill out the user creation form
                cy.get('span').contains('Create your account →').click();
                cy.get('input#blog-title').type('My Blog');
                cy.get('#name').type(Cypress.env('NAME'));
                cy.get('#email').type(Cypress.env('EMAIL'));
                cy.get('#password').type(Cypress.env('PASSWORD'));
                cy.get('span').contains('Last step: Invite staff users →').click();
                cy.wait(1000);
                cy.get('.gh-flow-skip').click();
            } else {
                // Log in with the existing user
                cy.visit(Cypress.env('LOCAL_HOST') + '#/signin');
                cy.get('input[name="identification"]').type(Cypress.env('EMAIL'));
                cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
                cy.get('span').contains('Sign in →').click();
            }
        });
        cy.url().should('include', '/ghost/#/dashboard');
    });
});

Cypress.Commands.add('createTags', (nameTag = Cypress.env('NAME_TAG_1')) => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const TAG_COLOR = Cypress.env('TAG_COLOR');
    const DESCRIPTION = Cypress.env('DESCRIPTION');

    cy.visit(LOCAL_HOST + "#/tags/new");
    cy.wait(2000);
    cy.get('input[data-test-input="tag-name"]').type(nameTag);
    cy.get('input[data-test-input="accentColor"]').type(TAG_COLOR);
    cy.get('textarea[data-test-input="tag-description"]').type(DESCRIPTION);
    cy.wait(1000);
    cy.get('span[data-test-task-button-state="idle"]').click();
    cy.wait(1000);
});

Cypress.Commands.add('enableNewsletterSubscription', () => {
    cy.visit(Cypress.env('LOCAL_HOST') + "#/settings");
    cy.get('#\\:ro\\:').then(($button) => {
        if ($button.attr('aria-checked') === 'false' || $button.attr('data-state') === 'unchecked') {
            cy.wrap($button).click();
        }
    });
});

Cypress.Commands.add('enableAllNewsletterDesignOptions', () => {
    cy.visit(Cypress.env('LOCAL_HOST') + "#/settings");
    cy.get('a#newsletters').click();
    cy.get('div.grow.py-2').first().click();
    cy.get('button#design').click();

    cy.get('button[role="switch"]').then(($buttons) => {
        Cypress._.each(Cypress._.reverse($buttons), ($el) => {
            const isPostTitleButton = $el.id === ':r2j:';

            if (!isPostTitleButton && ($el.getAttribute('aria-checked') === 'false' || $el.getAttribute('data-state') === 'unchecked')) {
                cy.wrap($el).click({force: true}).then(() => {
                    cy.wrap($el).should('have.attr', 'aria-checked', 'true');
                    cy.wrap($el).should('have.attr', 'data-state', 'checked');
                });
            }
        });
    });
    cy.visit(Cypress.env('LOCAL_HOST') + "#/dashboard");
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent Cypress from failing the test
    return false;
});

Cypress.Commands.add('enableAllNewsletterDesignOptions', () => {
    cy.visit(Cypress.env('LOCAL_HOST') + "#/settings");
    cy.get('a#newsletters').click();
    cy.get('div.grow.py-2').first().click();
    cy.get('button#design').click();

    cy.get('button[role="switch"]').then(($buttons) => {
        Cypress._.each(Cypress._.reverse($buttons), ($el) => {
            const isPostTitleButton = $el.id === ':r2j:';

            if (!isPostTitleButton && ($el.getAttribute('aria-checked') === 'false' || $el.getAttribute('data-state') === 'unchecked')) {
                cy.wrap($el).click({force: true}).then(() => {
                    cy.wrap($el).should('have.attr', 'aria-checked', 'true');
                    cy.wrap($el).should('have.attr', 'data-state', 'checked');
                });
            }
        });
    });
    cy.visit(Cypress.env('LOCAL_HOST') + "#/dashboard");
});
