# Cypress Test 120

## Integrantes
* [Natalia Arango](mailto:a.arandio@uniandes.edu.co)
* [Jazmín Cordoba](mailto:jn.cordobap1@uniandes.edu.co)
* [Miguel Gómez](mailto:ma.gomeza1@uniandes.edu.co)
* [Juan Mejía](mailto:je.mejiai1@uniandes.edu.co)


Este documento proporciona instrucciones para configurar y ejecutar pruebas utilizando Cypress en un entorno de Ghost versión 5.1.0.

## Requisitos Previos

Asegúrate de tener instalado Ghost en la versión 5.1.0 en tu entorno local.
<details>
<summary>Instalación de Ghost 5.1.0</summary>


1. **Crea un directorio para tu instalación de Ghost**:

   Abre tu terminal y ejecuta:

   ```bash
   mkdir ~/ghost_5.1.0
   cd ~/ghost_5.1.0
   ```

2. **Instala Ghost CLI**:

   Ejecuta el siguiente comando:

   ```bash
   npm install -g ghost-cli
   ```

3. **Instala Ghost en la versión específica**:

   Ejecuta el siguiente comando para instalar Ghost 5.1.0 en tu carpeta:

   ```bash
   ghost install local 5.1.0
   ```

4. **Configura y ejecuta Ghost**:

   Una vez finalizada la instalación, inicia Ghost con:

   ```bash
   ghost start
   ```

5. **Accede al panel de administración**:

   Visita `http://localhost:2368/ghost` para acceder a la interfaz de administración y crear tu usuario.

6. **Detener y reiniciar Ghost**:

   Usa `ghost stop` para detener Ghost y `ghost start` para reiniciarlo cuando sea necesario.

</details>


## Pasos para Configurar Cypress

1. **Ejecutar el Entorno de Ghost**  
   Asegúrate de que tu instancia de Ghost v5.1.0 esté ejecutándose localmente.

2. **Modificar el Host de Cypress**  
   Abre el archivo `cypress/cypress.config.js` y modifica el puerto si es necesario para que coincida con el de tu entorno de Ghost.

3. **Instalar Dependencias de Cypress**  
   Navega a la carpeta de Cypress y ejecuta el siguiente comando en la terminal para instalar las dependencias:
   ```bash
   cd cypress
   npm install
   npx cypress open


# Cypress test 120 :)


