const mockData = require('./mock-data-AP.json');

describe('Modify facebook url', () => {

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

    it('Modify the facebook url with valid and invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        // Scenarios with Faker.js
        let random_pos= mockData[Math.floor(Math.random() * mockData.length)];
        const scenarios = [
            { description: 'url ', data: random_pos.complete_url, valid: false},

        ];

        scenarios.forEach((scenario, index) => {
            cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(7) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);
            cy.get('input[placeholder="https://www.facebook.com/ghost"]').clear();

            // Type the data
            cy.get('input[placeholder="https://www.facebook.com/ghost"]').type(scenario.data);

            // Cancel the settings
            cy.contains('button', 'Cancel').click();
            // Validate the result
            if (scenario.valid) {
                //cy.reload();
                cy.wait(4000);
                cy.get('div.flex.items-center.mt-1')
                .eq(3) 
                .should('contain.text', scenario.data);
                takeScreenshot();
            } else {
                console.log('no se evidencia error o aivso');
                takeScreenshot();
            }
        });
    });
});
