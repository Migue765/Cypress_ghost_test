const mockData = require('./mock-data-AP.json');

describe('Modify tiers long description prev', () => {

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

    it('Modify the tiers description with valid and invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        // Scenarios with Faker.js
        let random_pos= mockData[Math.floor(Math.random() * mockData.length)];
        const scenarios = [
            { description: 'General', data: random_pos.partial_url, valid: false },
        ];
        

        scenarios.forEach((scenario, index) => {
            cy.get('div[data-testid="tier-card"][data-tier="free"]').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);
            cy.get('input[placeholder="Free preview').clear();

            // Type the data
            cy.get('input[placeholder="Free preview').type(scenario.data);

            // Save the settings
            cy.contains('button', 'Save')
            .should('be.visible') 
            .click();       

            // Validate the result
            if (scenario.valid) {
                cy.wait(4000);
                cy.get('div.mt-4.w-full.text-\\[1\\.55rem\\].font-semibold.leading-snug.text-grey-900')
                .should('have.text', scenario.data);

            } else {
                console.log('no se evidencia error o aivso');
                takeScreenshot();
            }
        });
    });
});
