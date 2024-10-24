# Proyecto de Administración de Tareas - (React)

## Descripción General

Este laboratorio tiene como objetivo migrar la interfaz gráfica de la aplicación de gestión de tareas a React y agregar un sistema de autenticación. Además, se implementan servicios y ajustes necesarios en la base de datos para permitir la gestión de tareas por usuarios autenticados. Todas las nuevas funcionalidades están cubiertas con pruebas.

## Contenidos

1. [Objetivos](#objetivos)
2. [Requisitos](#requisitos)
3. [Parte I: Definición de Funcionalidades](#parte-i-definición-de-funcionalidades)
   - [Migración a React](#migración-a-react)
   - [Autenticación](#autenticación)
4. [Entrega](#entrega)
5. [Conclusiones](#conclusiones)

## Objetivos

- Migrar toda la interfaz gráfica de la aplicación a React.
- Implementar un sistema de autenticación para que los usuarios gestionen sus tareas una vez que inicien sesión.
- Ajustar la base de datos y los servicios para que soporten las nuevas funcionalidades.
- Asegurar la cobertura de pruebas para todas las nuevas funcionalidades.

## Requisitos

- **Java OpenJDK 17**
- **Spring Boot**
- **MongoDB**
- **React.js**
- **Azure DevOps**

## Parte I: Definición de Funcionalidades

### Migración a React

Todas las interfaces gráficas de la aplicación fueron migradas a React. Se rediseñaron las vistas para mejorar la experiencia del usuario, utilizando componentes de React para mantener una interfaz dinámica y modular. Esto permite una mejor escalabilidad y una interacción más fluida con el backend.

### Autenticación

Se implementó un sistema de autenticación para permitir que los usuarios gestionen sus tareas personales. Las funcionalidades incluyen:
- Registro de nuevos usuarios.
- Inicio de sesión con validación de credenciales.
- Gestión de tareas solo disponible para usuarios autenticados.

Cada usuario puede ver, crear, actualizar y eliminar solo sus propias tareas, garantizando así la seguridad y privacidad de los datos.

## Entrega

- **Actualización del plan en Azure DevOps**: El plan del proyecto fue actualizado para reflejar las tareas y cambios realizados, distribuyendo las responsabilidades entre los miembros del equipo.
- **Servicios y Base de Datos**: Se realizaron los ajustes necesarios en los servicios y la base de datos para soportar la autenticación y la gestión de tareas por usuarios.
- **Cobertura de Pruebas**: Todas las nuevas funcionalidades cuentan con pruebas unitarias y de integración para asegurar su correcto funcionamiento.

## Conclusiones

Este laboratorio permitió realizar una migración exitosa de la interfaz gráfica a React, mejorando la experiencia de usuario y la modularidad del sistema. Además, se implementó un sistema de autenticación que permite a los usuarios gestionar sus tareas de forma segura y personalizada. Todos los cambios fueron integrados en el plan de trabajo y se aseguró una adecuada cobertura de pruebas.
