import { faker } from '@faker-js/faker';
describe('Access profile: View error update website', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E005-view_error_update_website_before/view_history_activity';
    let screenshotCounter = 1;
    const PASSWORD = Cypress.env('PASSWORD');


    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });


     it('I Should slug in setting profile', () => {
        const namefaker = faker.person.fullName();
        const locationfaker = faker.address.city();
        const website = faker.internet.url();
        const slugname = faker.internet.username().toLowerCase();
        const facebookprofile = faker.internet.url();
        const xprofile = faker.internet.url();
        const bio = faker.person.bio();

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        cy.contains('label', 'Full name').parent().find('input').clear().type(namefaker);
        cy.contains('label', 'Full name').parent().find('input').should('have.value', namefaker);

        cy.contains('label', 'Location').parent().find('input').clear().type(locationfaker);
        cy.contains('label', 'Location').parent().find('input').should('have.value', locationfaker);

        cy.contains('label', 'Website').parent().find('input').clear().type(website);
        cy.contains('label', 'Website').parent().find('input').should('have.value', website);

        cy.contains('label', 'Slug').parent().find('input').clear().type(slugname);
        cy.contains('label', 'Slug').parent().find('input').should('have.value', slugname);

        cy.contains('label', 'Facebook profile').parent().find('input').clear().type(facebookprofile);
        cy.contains('label', 'Facebook profile').parent().find('input').should('have.value', facebookprofile);

        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').clear().type(xprofile);
        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').should('have.value', xprofile);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(bio);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bio);


        cy.get('button').contains('Save').click({force: true});
        cy.wait(500);
        cy.contains('strong', 'Owner').should('be.visible').click();
        cy.contains('label', 'Slug').parent().find('input').should('have.value', slugname);
      });


      it('I should see error update more 200 caracters', () => {

        const bio1 = faker.lorem.words(100);

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(bio1);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bio1);

        cy.get('button').contains('Save').click({force: true});
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Bio is too long');

      });

      it('I should error in invalid x profile', () => {

        const xprofile = faker.internet.email()
        const Bio = faker.lorem.paragraph()

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').clear().type(xprofile);
        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').should('have.value', xprofile);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(Bio);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', Bio);

        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Your Username is not a valid Twitter Username');

      });

     it('I should error in invalid email', () => {

        const email = faker.person.fullName();

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Email').parent().find('input').clear().type(email);
        cy.contains('label', 'Email').parent().find('input').should('have.value', email);

        cy.get('button').contains('Save').click({force: true});
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Enter a valid email address');

      });

      it('I should update a name and view the name', () => {

        const name = faker.person.fullName();

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Full name').parent().find('input').clear().type(name);
        cy.contains('label', 'Full name').parent().find('input').should('have.value', name);

        cy.get('button').contains('Save').click({force: true});
        cy.get('h1.break-words.md\\:break-normal.text-white.md\\:text-4xl.leading-tighter').scrollIntoView({ behavior: 'smooth', block: 'center' }).should('be.visible').click();

      });

      it('I should view error diferent password', () => {

        const password = PASSWORD;
        const passwordnew = faker.person.firstName();
        const passwordRepit = faker.person.firstName();

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.get('button').contains('Change password').click({force: true});

        cy.contains('label', 'Old password').parent().find('input').clear().type(password);
        cy.contains('label', 'Old password').parent().find('input').should('have.value', password);

        cy.contains('label', 'New password').parent().find('input').clear().type(passwordnew);
        cy.contains('label', 'New password').parent().find('input').should('have.value', passwordnew);

        cy.contains('label', 'Verify password').parent().find('input').clear().type(passwordRepit);
        cy.contains('label', 'Verify password').parent().find('input').should('have.value', passwordRepit);

        cy.get('button').contains('Change password').click({force: true});
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Your new passwords do not matchYour new passwords do not match');


      });

      it('I Should image in profile ', () => {
        // Generar una URL de imagen aleatoria con Faker (usando Picsum)
        const imagenFalsaUrl = `https://picsum.photos/200/200?random=${faker.number.bigInt(100)}`;

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        // Mostrar la URL generada por Faker (solo para fines de depuración)
        cy.log('Imagen generada:', imagenFalsaUrl);

        // Encontrar el campo de carga de imagen y simular la carga de un archivo real
        // Usamos un archivo físico en lugar de una URL externa
        cy.get('#avatar').attachFile('picture.jpg'); // 'perfil.jpg' está en la carpeta fixtures

        cy.get('#avatar').should('exist').and('have.prop', 'tagName', 'IMG').and('be.visible');
      });


      it('I should view error old different password', () => {

        const passwoldnew = faker.string.alpha(10)
        const password = faker.string.alpha(15)

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);



        cy.get('button').contains('Change password').click({force: true});

        cy.contains('label', 'Old password').parent().find('input').clear().type(passwoldnew);
        cy.contains('label', 'Old password').parent().find('input').should('have.value', passwoldnew);

        cy.contains('label', 'New password').parent().find('input').clear().type(password);
        cy.contains('label', 'New password').parent().find('input').should('have.value', password);

        cy.contains('label', 'Verify password').parent().find('input').clear().type(password);
        cy.contains('label', 'Verify password').parent().find('input').should('have.value', password);

        cy.get('button').contains('Change password').click({force: true});

        cy.get('[data-testid="toast-error"]') // Selector para el toast de error
        .should('be.visible') // Verifica que el toast sea visible
        .and('contain.text', 'Your password is incorrect.');
      });


      it('I should error in invalid  website', () => {

        const website = faker.number.romanNumeral();

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Website').parent().find('input').clear().type(website);
        cy.contains('label', 'Website').parent().find('input').should('have.value', website);

        cy.get('button').contains('Save').click({force: true});
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Enter a valid URL');

      });


});
