const mockData = require('./mock-data-AP.json');

describe('Modify facebook card', () => {

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

    it('Modify the facebook card with valid and invalid data', () => {
        cy.visit(LOCAL_HOST + "#/settings");

        let random_pos= mockData[Math.floor(Math.random() * mockData.length)];
        const scenarios = [
            { description: 'General', data: random_pos.title, valid: true },
        ];
        

        scenarios.forEach((scenario, index) => {
            cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(6) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);
            cy.wait(2000);
            cy.get('input[placeholder="My Blog').clear();

            // Type the data
            cy.wait(2000);
            cy.get('input[placeholder="My Blog').type(scenario.data);

            // Save the settings
            cy.wait(2000);
            cy.get('#admin-x-settings-scroller button.cursor-pointer.bg-green').click();

            
            // Validate the result
            if (scenario.valid) {
                cy.reload();
                cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div:nth-child(6) > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button').click();
                cy.get('input[placeholder="My Blog')
                .should('have.value', scenario.data);
            } else {
                console.log('no se evidencia error o aivso');
                takeScreenshot();
            }
        });
    });
});