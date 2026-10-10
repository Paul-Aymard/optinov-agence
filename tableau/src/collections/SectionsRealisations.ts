/*
  COLLECTION « Sections de réalisations » : les bandeaux de la page /realisations
  (ex. « Gadgets publicitaires », « Applications web et mobiles »…).

  Demande direction (PDF « NOUVELLE MODIF AGENCE ») : la page est découpée en
  sections, chacune avec sa rangée d'images qui défile. L'admin crée, renomme,
  ordonne et masque les sections ici, sans toucher au code ; chaque réalisation
  est ensuite rattachée à une ou plusieurs sections depuis sa fiche.

  Ces sections ne remplacent pas les « Services concernés » d'une réalisation :
  ceux-là servent aux pages Services du site (« nos réalisations en … »).
*/

import type { CollectionConfig } from 'payload'

import { estConnecte, lecturePublique } from '../access'
import { triggerSiteRebuild } from '../hooks/triggerSiteRebuild'

export const SectionsRealisations: CollectionConfig = {
  slug: 'sections-realisations',

  labels: { singular: 'Section de réalisations', plural: 'Sections de réalisations' },

  admin: {
    group: 'Contenus',
    hideAPIURL: true,
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'sens', 'ordre', 'visible'],
    description:
      'Les bandeaux de la page Réalisations. Rattachez ensuite chaque réalisation à sa ou ses sections depuis sa fiche.',
  },

  access: {
    read: lecturePublique,
    create: estConnecte,
    update: estConnecte,
    delete: estConnecte,
  },

  hooks: {
    afterChange: [() => triggerSiteRebuild()],
    afterDelete: [() => triggerSiteRebuild()],
  },

  fields: [
    {
      name: 'titre',
      type: 'text',
      label: 'Titre de la section',
      required: true,
      admin: { description: 'Affiché dans le bandeau arrondi, ex. « Gadgets publicitaires ».' },
    },
    {
      name: 'sens',
      type: 'select',
      label: 'Sens du défilement',
      required: true,
      defaultValue: 'gauche-droite',
      options: [
        { value: 'gauche-droite', label: 'De la gauche vers la droite' },
        { value: 'droite-gauche', label: 'De la droite vers la gauche' },
      ],
      admin: {
        description: 'Le défilement automatique démarre à partir de la 4ᵉ image de la section.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ordre',
          type: 'number',
          label: 'Ordre d’affichage',
          defaultValue: 0,
          admin: { description: 'Du plus petit au plus grand.' },
        },
        {
          name: 'visible',
          type: 'checkbox',
          label: 'Afficher sur le site',
          defaultValue: true,
        },
      ],
    },
  ],
}
