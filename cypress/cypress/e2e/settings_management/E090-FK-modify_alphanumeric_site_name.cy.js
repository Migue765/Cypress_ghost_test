import { faker } from '@faker-js/faker';

describe('Modify Site Name', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E016-modify_site_name_before/modify_site_name';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Modify the site name with valid and invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        const scenarios = [
            {
                description: 'Alphanumeric title',
                data: Array.from({ length: 15 }, () =>
                    faker.string.alphanumeric()
                ).join(''),
                valid: true,
            },
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);
            cy.get('input[placeholder="Site title"]').clear();

            // Type the data
            cy.get('input[placeholder="Site title"]').type(scenario.data);

            // Save the settings
            cy.get('#admin-x-settings-scroller button.cursor-pointer.bg-green').click();

            // Validate the result
            if (scenario.valid) {
                cy.get('div.flex.items-center.mt-1')
                .first()
                .should('contain.text', scenario.data);
            } else {
                console.log('no se evidencia error o aivso');
                takeScreenshot();
            }
        });
    });
});