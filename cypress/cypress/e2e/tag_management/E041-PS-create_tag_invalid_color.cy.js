const mockData = require('./MOCK_DATA.json');

describe('Create a new tag with invalid accent color', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with an invalid accent color format', () => {
        cy.visit(LOCAL_HOST + "#/tags/new/");
        cy.wait(3000);

        // Selección aleatoria de datos de mockData
        const randomData = mockData[Math.floor(Math.random() * mockData.length)];

        const randomTagName = randomData.tagName;

        // Asigna un color de acento inválido (con el carácter '#')
        const invalidAccentColor = randomData.accentColor;

        cy.get('input[data-test-input="tag-name"]').type(randomTagName);
        cy.get('input[data-test-input="accentColor"]').type(invalidAccentColor);
        cy.get('textarea[data-test-input="tag-description"]').type(randomData.description);

        cy.wait(1000);

        // Verificación de mensaje de error para color de acento inválido
        cy.get('p[data-test-error="accentColor"]').should('contain.text',
            'The colour should be in valid hex format');

        // Intentar enviar los cambios
        cy.get('span[data-test-task-button-state="idle"]').click();
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
