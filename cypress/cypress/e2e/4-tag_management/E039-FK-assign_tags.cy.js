import { faker } from '@faker-js/faker';

describe('Assign multiple tags to a post and verify they are saved correctly', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    // Generación de datos aleatorios
    const NAME_TAG_1 = faker.lorem.word(); // Generación de un nombre de etiqueta aleatorio
    const NAME_TAG_2 = faker.lorem.word(); // Generación de otro nombre de etiqueta aleatorio

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags(); // Asegúrate de que esta función esté creando las etiquetas con los nombres generados
    });

    it('Assign multiple tags to a post and verify they are saved correctly', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(1000);

        cy.get('a[data-test-nav-custom="posts-Published"]').click();
        cy.wait(1000);

        cy.get('li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status:first a.gh-list-data.gh-post-list-title').click({ force: true });
        cy.wait(1000);

        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon[title="Settings"]').click();
        cy.wait(1000);

        // Usamos los nombres de etiquetas generados aleatoriamente
        cy.get('div#tag-input').click().type(NAME_TAG_1 + '{enter}').type(NAME_TAG_2 + '{enter}');
        cy.wait(1000);

        // Verificamos que las etiquetas se hayan asignado correctamente
        cy.contains(NAME_TAG_1).should('exist');
        cy.contains(NAME_TAG_2).should('exist');
    });
});
