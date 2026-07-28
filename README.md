# Frontend - Application de gestion des incidents

## Présentation du projet

Ce projet correspond à la partie frontend d'une application de gestion des incidents.

L'objectif est de permettre aux utilisateurs de déclarer, consulter et suivre le traitement des incidents afin de faciliter leur gestion et leur suivi.

## Objectifs

- Centraliser les demandes d'incidents.
- Faciliter le suivi de leur état d'avancement.
- Améliorer la communication entre les utilisateurs et les équipes chargées du traitement.

## Fonctionnalités principales

- Authentification des utilisateurs
- Création d'un incident
- Consultation des incidents
- Modification du statut d'un incident
- Consultation des détails d'un incident

## Technologies utilisées

- Angular 16
- TypeScript
- HTML / CSS
- Angular Services
- API REST

## Architecture du projet

L'application est organisée selon une séparation des responsabilités :

- **Components** : gestion de l'affichage et des interactions utilisateur.
- **Services** : communication avec le backend via les API REST.
- **Models** : représentation des données manipulées.

## Prérequis

Avant de lancer le frontend, assurez-vous d'avoir installé :

- Node.js
- npm
- Angular CLI

Le backend de l'application doit également être démarré afin que le frontend puisse communiquer avec l'API REST.

## Installation

Installer les dépendances :

```bash
npm install
```

## Lancement

### 1. Démarrer le backend

Lancer le projet backend Spring Boot (voir son README).

Par défaut, l'API est accessible sur :

```
http://localhost:8080
```

### 2. Démarrer le frontend

Depuis le dossier du projet :

```bash
ng serve
```

Puis ouvrir le navigateur à l'adresse :

```
http://localhost:4200
```

## Auteur

Afiwa Emikonjo
