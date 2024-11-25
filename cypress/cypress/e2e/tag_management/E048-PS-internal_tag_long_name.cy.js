const mockData = require('./MOCK_DATA.json');

describe('Create a new tag with long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new internal tag with a long name', () => {
        cy.visit(LOCAL_HOST + "#/tags/new");
        cy.wait(3000);

        // Selección aleatoria de datos de mockData
        const randomData = mockData[Math.floor(Math.random() * mockData.length)];

        // Generación de un nombre muy largo que empieza con #
        const longTagName = `#${randomData.longTagName}`;

        cy.get('input[data-test-input="tag-name"]').type(longTagName);
        cy.get('input[data-test-input="accentColor"]').type(randomData.accentColor.replace(/^#/, ''));
        cy.get('textarea[data-test-input="tag-description"]').type(randomData.description);
        cy.wait(1000);
        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        // Verificación la existencia de aviso por nombre demasiado largo
        cy.get('.mr2 > .error > :nth-child(1)').should('contain.text',
            'Tag names cannot be longer than')
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
