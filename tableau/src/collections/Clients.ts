/*
  COLLECTION « Clients » : les logos de la section « Nos clients — La confiance
  de nos clients, notre fierté » de la page d'accueil.

  La section reste masquée sur le site tant qu'aucun logo n'est saisi ici :
  un titre sans logos dessous ferait chantier. Dès le premier logo ajouté,
  elle apparaît d'elle-même au prochain build.
*/

import type { CollectionConfig } from 'payload'

import { estConnecte, lecturePublique } from '../access'
import { triggerSiteRebuild } from '../hooks/triggerSiteRebuild'

export const Clients: CollectionConfig = {
  slug: 'clients',

  labels: { singular: 'Client (logo)', plural: 'Clients (logos)' },

  admin: {
    group: 'Contenus',
    hideAPIURL: true,
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'ordre'],
    description:
      'Les logos des clients et partenaires, affichés sur la page d’accueil. La section reste masquée tant qu’il n’y en a aucun.',
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
    { name: 'nom', type: 'text', label: 'Nom du client', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
      admin: { description: 'De préférence un PNG ou SVG sur fond transparent.' },
    },
    {
      name: 'lien',
      type: 'text',
      label: 'Site du client (facultatif)',
      admin: { description: 'Adresse complète, ex. https://www.client.ci. Laisser vide : le logo ne sera pas cliquable.' },
      validate: (valeur: string | null | undefined) =>
        !valeur || /^https?:\/\/\S+$/.test(valeur) || 'L’adresse doit commencer par http:// ou https://',
    },
    {
      name: 'ordre',
      type: 'number',
      label: 'Ordre d’affichage',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Du plus petit au plus grand.' },
    },
  ],
}
