const mockData = require('./mock-data-AP.json');

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

        // Scenarios with Faker.js
        let random_pos= mockData[Math.floor(Math.random() * mockData.length)];
        const scenarios = [
            { description: 'long url description', data: random_pos.complete_url},
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(4) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);
            cy.get('input[placeholder="6xSjs40WnYC6yrY"]').clear();

            // Type the data
            cy.get('input[placeholder="6xSjs40WnYC6yrY"]').type(scenario.data);

            // Save the settings
            cy.get('#admin-x-settings-scroller button.cursor-pointer.bg-green').click();

            // Validate the result
            if (scenario.valid) {
                cy.reload();
                cy.get('div.mt-1.flex.flex-col')
                .should('contain.text', 'https://www.facebook.com/'+scenario.data);
            } else {
                console.log('no se evidencia error o aivso');
                takeScreenshot();
            }
        });
    });
});
