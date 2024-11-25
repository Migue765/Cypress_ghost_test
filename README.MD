# Cypress Test 120

Este documento proporciona instrucciones para configurar y ejecutar pruebas utilizando Cypress en un entorno de Ghost versión 5.1.0.

## Integrantes
* [Natalia Arango](mailto:a.arandio@uniandes.edu.co)
* [Jazmín Cordoba](mailto:jn.cordobap1@uniandes.edu.co)
* [Miguel Gómez](mailto:ma.gomeza1@uniandes.edu.co)
* [Juan Mejía](mailto:je.mejiai1@uniandes.edu.co)


## Requisitos Previos

- Se recomienda usar Node.js versión 12.10.0. Ejecuta estos comandos:

```bash
nvm install 12.22.1    # Instala Node.js 12.22.1
nvm use 12.22.1        # Usa la versión instalada
node -v                # Verifica que la versión de Node.js sea correcta
```
- Instala la librería Faker
```bash
npm install @faker-js/faker --save-dev
```

- Ejecuta el servicio de MOCKAROO-API
A continuacion se detallan los pasos para ejecutar y configurar el servicio para pruebas pseudo
1. Ir  a la url del repo https://github.com/nataliaarandio/MOCKAROO-API en el readme de este se detalla la ejecucion del servicio
2. Para validar el servicio basta con ejecutar ejemplo http://localhost:3010/api/data y si nos retorna datos quiere decir que esta correcto el despligue.
3. Una vez arriba el servicio  se  Abre el archivo `cypress/cypress.config.js` y modificamos el APIREST con la ruta correcta 

<details>
<summary>Asegúrate de tener instalado Ghost en la versión 5.1.0</summary>


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
   Abre el archivo `cypress/cypress.config.js` y modifica el puerto si es necesario para que coincida con el de tu entorno de Ghost, para que quede por ejemplo de la siguiente forma
   ```bash
   LOCAL_HOST: "http://localhost:2368/ghost/"
   ```

3. **Instalar Dependencias de Cypress**  
   Una vez importado este repositorio navega a la carpeta de Cypress ejecutando los siguiente comandos en la terminal para instalar las dependencias y ejecutar el entorno en local:
   ```bash
   cd cypress
   npm install
   npx cypress open


# Cypress test 120 :)
Click aquí para ser dirigido a la Wiki con la descripción de las pruebas realizadas.
