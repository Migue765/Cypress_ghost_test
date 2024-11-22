# Cypress test 120 
1. ejecute el entono ghost v 5.1.0 de doma local
2. modifique el puerto en el archivo cypress/cyprees/cypress.config.js
3. ingrese a la carpeta cypress y haga un npm i para instalar las dependencias
4. en a la carpeta /Cypress_ghost_test/cypress/ ejecute en la terminal cypress open
    Si no ve las carpetas ya configuradas seleccione la carpeta en add project 

# Para algunas pruebas es necesario contar con file-upload para esto realice los siguientes pasos:
1. Es necesario instalar en la carpeta npm install --save-dev cypress-file-upload  para validar cargue imagen ejemplo comandos:
- cd 'C:\Repos\Cypress_ghost_test\cypress\cypress'
- npm install --save-dev cypress-file-upload

2. En el archivo support/commands.js se debe incluir:
- import 'cypress-file-upload';

3. En la capeta Fixtures debe existir una imagen tipo .jpg con nombre picture.jpg



# Cypress test 120 :)


# access-profile 


