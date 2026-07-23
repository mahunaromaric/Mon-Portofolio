import { Layers, Server, Database, Wrench } from 'lucide-react'
import { C, type Project, type SkillCategory } from './constants'

export const projects: Project[] = [
  {
    id: 1,
    title: 'BiblioFab',
    subtitle: 'Plateforme de gestion de bibliothèque',
    description: "BiblioFab est une application web conçue pour simplifier la gestion d'une bibliothèque : organisation des ouvrages, suivi des emprunts et administration des utilisateurs.",
    tags: ['Laravel', 'PHP', 'MySQL'],
    focus: ['Gestion des ressources documentaires', 'Organisation des données', "Interface d'administration"],
    accent: C.blue,
  },
  {
    id: 2,
    title: 'Plateforme de gestion des ayants droit militaires',
    subtitle: 'Gestion et centralisation des informations administratives',
    description: "Application destinée à faciliter la gestion des ayants droit militaires avec une approche structurée autour des données, des utilisateurs et des processus administratifs.",
    tags: ['React', 'Laravel', 'API REST', 'MySQL'],
    focus: ['Gestion des utilisateurs', 'Traitement des données', 'Automatisation des opérations'],
    accent: C.teal,
  },
  {
    id: 3,
    title: 'HemoConnect',
    subtitle: 'Informer · Connecter · Prévenir',
    description: "Plateforme numérique dédiée à la sensibilisation autour de la drépanocytose. Le projet vise à créer un espace permettant d'améliorer l'accès à l'information, de connecter les communautés et de faciliter l'accès aux ressources utiles.",
    tags: ['Next.js', 'React', 'PostgreSQL', 'Prisma'],
    focus: ['Sensibilisation santé', 'Expérience utilisateur', 'Architecture Full Stack'],
    accent: C.orange,
  },
  {
    id: 4,
    title: 'AI Shooting Engine',
    subtitle: 'Génération de scènes photographiques assistée par données',
    description: "Projet d'exploration autour de la génération structurée de concepts de shooting produit. L'objectif est de créer un moteur capable de produire des variations cohérentes selon différents paramètres.",
    tags: ['Node.js', 'JavaScript', 'JSON'],
    focus: ['Génération de données', 'Automatisation créative', 'IA générative'],
    accent: C.purple,
  },
  {
    id: 5,
    title: 'CultureBénin',
    subtitle: 'Valoriser le patrimoine culturel grâce au numérique',
    description: "Projet de plateforme visant à mettre en avant la richesse culturelle béninoise à travers une expérience web moderne.",
    tags: ['Laravel', 'PHP', 'MySQL'],
    focus: ['Présentation de contenus culturels', 'Expérience utilisateur', 'Valorisation numérique'],
    accent: C.pink,
  },
]

export const skillCategories: SkillCategory[] = [
  { name: 'Frontend', icon: <Layers size={16} />, color: C.blue, skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5 & CSS3', 'Tailwind CSS'] },
  { name: 'Backend', icon: <Server size={16} />, color: C.teal, skills: ['Laravel', 'PHP', 'Node.js', 'Express'] },
  { name: 'Base de données', icon: <Database size={16} />, color: C.purple, skills: ['PostgreSQL', 'MySQL', 'Prisma ORM'] },
  { name: 'Outils', icon: <Wrench size={16} />, color: C.muted, skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Figma'] },
]

export const processSteps = [
  { num: '01', title: 'Comprendre', lead: "Avant de coder, j'analyse le problème à résoudre.", items: ['Identification des besoins', 'Définition des objectifs', "Compréhension des utilisateurs"] },
  { num: '02', title: 'Explorer', lead: 'Je recherche la meilleure approche technique et fonctionnelle.', items: ['Analyse des solutions existantes', 'Choix des technologies adaptées', "Réflexion sur l'expérience utilisateur"] },
  { num: '03', title: 'Concevoir', lead: "Je transforme l'idée en une solution claire.", items: ['Architecture de l\'application', 'Modélisation des données', 'Wireframes et interfaces', 'Organisation des fonctionnalités'] },
  { num: '04', title: 'Développer', lead: 'Je construis le produit avec une approche progressive.', items: ['Développement frontend et backend', 'Intégration des API', 'Gestion de la base de données', 'Amélioration du code'] },
  { num: '05', title: 'Tester & améliorer', lead: "Je vérifie la qualité et l'expérience utilisateur.", items: ['Correction des erreurs', 'Optimisation des performances', "Amélioration de l'interface"] },
  { num: '06', title: 'Évoluer', lead: 'Un produit n\'est jamais vraiment terminé.', items: ['Ajout de nouvelles fonctionnalités', 'Maintenance', 'Amélioration continue'] },
]

export const timeline = [
  { year: '2025 — Aujourd\'hui', role: 'Product Builder & Développeur Full Stack', co: 'Solutions numériques', desc: 'Conception et développement de solutions autour de la santé, de la culture et de l\'IA — HemoConnect, AI Shooting Engine, CultureBénin.' },
  { year: '2023 — Aujourd\'hui', role: 'Formation Analyse Informatique & Programmation', co: 'ENEAM', desc: 'Analyse, programmation, conception d\'applications, bases de données et développement logiciel.' },
  { year: 'Projets', role: 'Développement d\'applications web', co: 'Académique & personnel', desc: 'Expérimentation autour d\'architectures Full Stack, d\'API, de bases de données et d\'outils basés sur l\'IA.' },
]
