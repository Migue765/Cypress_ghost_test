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

        // Scenarios with Faker.js
        const scenarios = [
            { description: 'Numeric title', data: faker.number.int({ min: 10, max: 100 }).toString(), valid: true },
            {
                description: 'Alphanumeric title',
                data: Array.from({ length: 15 }, () =>
                    faker.string.alphanumeric()
                ).join(''),
                valid: true,
            },
            {
                description: 'Valid title',
                data: faker.string.alpha({ length: 20 }),
                valid: true,
            },
            {
                description: 'Title too long',
                data: faker.string.alpha({ length: 300 }), 
                valid: false,
            },
            { description: 'Numeric title', data: faker.number.int({ min: 10, max: 100 }).toString(), valid: true },
            {
                description: 'Alphanumeric title',
                data: Array.from({ length: 15 }, () =>
                    faker.string.alphanumeric()
                ).join(''),
                valid: true,
            },
        ];

        scenarios.forEach((scenario, index) => {
            cy.get('#admin-x-settings-scroller > div > div:nth-child(1) > div > div.relative.flex-col.gap-6.rounded-xl.transition-all.hover\:border-grey-200.border.p-5.hover\:shadow-sm.md\:p-7.flex.border-grey-200.shadow-sm.undefined.border-grey-250.dark\:border-grey-925 > div.flex.items-start.justify-between.gap-4 > div:nth-child(2) > div > button.opacity-40.bg-grey-200.text-black.dark\:bg-grey-900.dark\:text-white.false.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-7.px-3').click();
            cy.log(`Scenario ${index + 1}: ${scenario.description}`);
            cy.get('input[placeholder="Site description"]').clear();

            // Type the data
            cy.get('input[placeholder="Site description"]').type(scenario.data);

            // Save the settings
            cy.get('#admin-x-settings-scroller button.cursor-pointer.bg-green').click();

            // Validate the result
            if (scenario.valid) {
                cy.get('div.flex.items-center.mt-1')
                .eq(2) 
                .should('contain.text', scenario.data);
            } else {
                console.log('no se evidencia error o aivso');
                takeScreenshot();
            }
        });
    });
});

