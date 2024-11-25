const mockData = require('./MOCK_DATA.json');

describe('Create a new tag with long description', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a valid name, accent color, and a long description', () => {
        cy.visit(LOCAL_HOST + "#/tags/new/");
        cy.wait(3000);

        // Selecciona aleatoriamente los datos del mockData
        const randomData = mockData[Math.floor(Math.random() * mockData.length)];


        const validTagName = randomData.tagName;
        const validAccentColor = randomData.accentColor.replace(/^#/, '');
        const longDescription = randomData.longDescription;

        cy.get('input[data-test-input="tag-name"]').type(validTagName);
        cy.get('input[data-test-input="accentColor"]').type(validAccentColor);
        cy.get('textarea[data-test-input="tag-description"]').type(longDescription); // Usar la descripción larga
        cy.wait(1000);

        // Verificación de que la etiqueta se haya creado
        cy.get('p.response').contains('Description cannot be longer than 500 characters');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
