const mockData = require('./mock_data.json');

describe('Create a new tag with long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a very long name', () => {
        cy.visit(LOCAL_HOST + "#/tags/new/");
        cy.wait(3000);

        // Selecciona aleatoriamente los datos de mockData
        const randomData = mockData[Math.floor(Math.random() * mockData.length)];

        const longTagName = randomData.longDescription; // Campo para el nombre de la etiqueta

        cy.get('input[data-test-input="tag-name"]').type(longTagName);
        cy.get('input[data-test-input="accentColor"]')
            .type(randomData.accentColor.replace(/^#/, ''));
        cy.get('textarea[data-test-input="tag-description"]').type(randomData.description);
        cy.wait(1000);

        cy.get('.mr2 > .error > :nth-child(1)').should('contain.text',
            'Tag names cannot be longer than');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
