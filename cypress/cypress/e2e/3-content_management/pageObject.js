class ghost_5 {
    constructor() {
        this.ghost_5 = 'ghost_5';
    }

    GetSaveButton() {
        return cy.get('[data-testid="save-button"]');
    }

    GetCancelButton() {
        return cy.get('[data-testid="cancel-button"]');
    }

    GetPublishButton() {
        return cy.get('[data-testid="publish-button"]');
    }

    SectionPage() {
        return cy.get('[data-test-nav="pages"]');
    }
}
