<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZLCc_7YH-7urnc8N7_5YCR9JhWEiA6qTrCM55UPPXjg&s" alt="Club Deportivo Ciudad de los Angeles - ¡Somos ciudad!" width="250px" margin="auto">

# Sistema de gestión - Somos Ciudad
Este proyecto tiene como objetivo desarrollar el backend del Centro Deportivo CA, implementado con MongoDB, Express y Node.js. A continuación, se detallan los requisitos técnicos y las funcionalidades principales que deben ser implementadas.

## Tecnologías Utilizadas

### Creación de prototipos en Figma.
<a href="https://www.figma.com/" rel="nofollow"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/figma-colored.svg" width="36" height="36" alt="Figma" style="max-width: 100%;"></a>

### Lenguajes de Programación
<a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010" alt="JavaScript"></a>

### Frameworks y Librerías
<a href="https://nodejs.org" rel="nofollow"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40" style="max-width: 100%;"> </a>
<a href="#"><img src="https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=white&labelColor=101010" alt="Express.js"></a>
<a href="#"><img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white&labelColor=101010" alt="Mongoose"></a>

### Bases de Datos
<a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=101010" alt="MongoDB"></a>

### Herramientas de Testing
<a href="#"><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white&labelColor=101010" alt="Postman"></a>
<a href="#"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white&labelColor=101010" alt="Jest"></a>
<a href="#"><img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white&labelColor=101010" alt="Cypress"></a>

## Requisitos Técnicos ⚙️

### Marco de Trabajo
- Trabajo bajo el marco Scrum.

### Autenticación de Usuarios
- Implementar autenticación segura de usuarios usando JWT u otro método adecuado.

### Funciones del Representante del Alumno
- **Registro de Hijos**: Permitir registrar a sus hijos con datos como edad, altura, peso, sexo, talla de ropa, etc.
- **Solicitud de Ingreso**: Hacer solicitudes de ingreso que serán aceptadas o rechazadas por el administrador debido a cupos limitados.
- **Listado de Material Obligatorio**: Ver y solicitar material o prendas faltantes para el alumno.
  - Fotos de las prendas disponibles.
  - Listado de ropa por tallas.
  - Información de la cuenta bancaria para pagos.
  - Adjuntar justificante de pago en PDF.
  - Importar listado de prendas compradas.
- **Firma de Documentos**: Gestionar documentos de LOPD y derechos de imagen.
- **Ver Apartados de Pagos Hechos**: Revisar pagos realizados.

### Funciones Extras para Socios
- **Pagos Anuales**: Mostrar estado (positivo o negativo) de los tres pagos anuales de los socios.

### Funciones del Administrador
- **Gestión de Solicitudes de Ingreso**: Aceptar o rechazar solicitudes de ingreso.
- **Listado de Socios del Club**: Ver información de socios (nombre, apellidos, DNI, forma de alta).
- **Descarga de Formularios**: Descargar formularios de quienes desean convertirse en socios.

### Páginas Web Informativas
- Información general del club.
- Información del primer y segundo equipo.
- Información de fútbol base.
- Formulario para convertirse en socio.
- Historia del club.
- Tienda del club.
- Contacto.

  
### Instalación y Configuración

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/carlaprimola/centro-deportivo-back.git

2. **Instalar las dependencias utilizando **
   ```bash
   npm install

3. **Inniciar el servidor
   ```bash
   npm run dev

4. **Configurar la base de datos según las instrucciones proporcionadas.
4. Ejecutar el servidor con `npm start`.



<h4 id="version-control">Version Control</h4>

<p><a href="#"><img src="https://img.shields.io/badge/git%20-%23F05033.svg?&amp;style=for-the-badge&amp;logo=git&amp;logoColor=white&amp;labelColor=101010" alt="Git"></a>
<a href="#"><img src="https://img.shields.io/badge/github%20-%23121011.svg?&amp;style=for-the-badge&amp;logo=github&amp;logoColor=whit&amp;logoColor=white&amp;labelColor=101010" alt="Github"></a></p>


# git branches
   ![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)


| BRANCH   | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| main     | Rama principal. Aquí alojamos solo los resultados finales                             |                   
| develop      | Rama para implementaciones en étapa de desarrollo |
| origin/feature/auth | Rama para gestion de token y registro de usuarios, login |
| origin/feature/new-player-form-integration | Rama para integracion de toke con formulario de jugador |
| origin/feature/order | Rama para CRUD básico de order |
| origin/feature/order-users | Rama para CRUD de pagos con restricciones según requerimientos del cliente |
| origin/feature/payments | Rama de backend|
| origin/feature/players  | Rama de backend|
| origin/feature/product-payment| Rama para pagos de productos |
| origin/feature/products | Rama de backend|
| origin/feature/users | Rama de backend|
| origin/feature/users-and-players | Rama de backend|
| origin/test | Rama de backend para test|
| origin/jest/integration | Rama para test |
| origin/feature/admin-orders-status | Rama de backend|
| origin/feature/admin-orders-status | Rama de backend|
| origin/feature/user-payments | Rama de backend|
| origin/feature/user-memberships | Rama de backend|
| origin/feature/order-pdf | Rama de backend|
| origin/feature/admin-memberships | Rama de backend|
| origin/feature/order-details | Rama de backend|
| origin/deploy | Rama para despliegue |
| origin/chore/security-sanitization | Rama para funcionalidades de seguridad |
| origin/chore/route-protection | Rama para funcionalidades de seguridad |
| origin/security/2fa | Rama de blue team |





# Planificación

- Planificación de tareas en Trello
- Daylies
- Sprints
- Todos para uno.
  

# Nuestro equipo

- Carla Escobar (https://github.com/carlaprimola)
- Leandra Montoya(https://github.com/leamontoya19)
- Andrea García (https://github.com/angarce25)
- Fiorella Sandoval (https://github.com/FiorellaSF)
- Alvaro González(https://github.com/agt1984)
- Isaac García  (https://github.com/Isarok)
- Abelardo Acosta(https://github.com/Moriarty369)


## Contribuyendo

Para contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request
6. Serás informado sobre la solicitud por el equipo de desarrolladores

 ## Licencia

Este proyecto está bajo la Licencia. Para más detalles, por favor consulta el archivo LICENSE.
