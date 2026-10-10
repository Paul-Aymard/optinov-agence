import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/*
  Sections de la page Réalisations, logos clients, dos des cartes Services
  (PDF « NOUVELLE MODIF AGENCE »). Uniquement des AJOUTS : aucune donnée
  existante n'est modifiée. On crée au passage les trois sections montrées
  dans le PDF, avec leur sens de défilement ; l'admin ajoute les suivantes.
*/

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sections_realisations_sens" AS ENUM('gauche-droite', 'droite-gauche');
  CREATE TABLE "sections_realisations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"sens" "enum_sections_realisations_sens" DEFAULT 'gauche-droite' NOT NULL,
  	"ordre" numeric DEFAULT 0,
  	"visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"lien" varchar,
  	"ordre" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "realisations_rels" ADD COLUMN "sections_realisations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sections_realisations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clients_id" integer;
  ALTER TABLE "service_images" ADD COLUMN "communication_visuelle_carte_id" integer;
  ALTER TABLE "service_images" ADD COLUMN "communication_digitale_carte_id" integer;
  ALTER TABLE "service_images" ADD COLUMN "marketing_strategie_carte_id" integer;
  ALTER TABLE "service_images" ADD COLUMN "automatisation_ia_carte_id" integer;
  ALTER TABLE "service_images" ADD COLUMN "photo_video_carte_id" integer;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sections_realisations_updated_at_idx" ON "sections_realisations" USING btree ("updated_at");
  CREATE INDEX "sections_realisations_created_at_idx" ON "sections_realisations" USING btree ("created_at");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  ALTER TABLE "realisations_rels" ADD CONSTRAINT "realisations_rels_sections_realisations_fk" FOREIGN KEY ("sections_realisations_id") REFERENCES "public"."sections_realisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sections_realisations_fk" FOREIGN KEY ("sections_realisations_id") REFERENCES "public"."sections_realisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_images" ADD CONSTRAINT "service_images_communication_visuelle_carte_id_media_id_fk" FOREIGN KEY ("communication_visuelle_carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_images" ADD CONSTRAINT "service_images_communication_digitale_carte_id_media_id_fk" FOREIGN KEY ("communication_digitale_carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_images" ADD CONSTRAINT "service_images_marketing_strategie_carte_id_media_id_fk" FOREIGN KEY ("marketing_strategie_carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_images" ADD CONSTRAINT "service_images_automatisation_ia_carte_id_media_id_fk" FOREIGN KEY ("automatisation_ia_carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_images" ADD CONSTRAINT "service_images_photo_video_carte_id_media_id_fk" FOREIGN KEY ("photo_video_carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "realisations_rels_sections_realisations_id_idx" ON "realisations_rels" USING btree ("sections_realisations_id");
  CREATE INDEX "payload_locked_documents_rels_sections_realisations_id_idx" ON "payload_locked_documents_rels" USING btree ("sections_realisations_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "service_images_communication_visuelle_communication_vi_3_idx" ON "service_images" USING btree ("communication_visuelle_carte_id");
  CREATE INDEX "service_images_communication_digitale_communication_di_3_idx" ON "service_images" USING btree ("communication_digitale_carte_id");
  CREATE INDEX "service_images_marketing_strategie_marketing_strategie_c_idx" ON "service_images" USING btree ("marketing_strategie_carte_id");
  CREATE INDEX "service_images_automatisation_ia_automatisation_ia_carte_idx" ON "service_images" USING btree ("automatisation_ia_carte_id");
  CREATE INDEX "service_images_photo_video_photo_video_carte_idx" ON "service_images" USING btree ("photo_video_carte_id");`)

  await db.execute(sql`
   INSERT INTO "sections_realisations" ("titre", "sens", "ordre", "visible") VALUES
     ('Gadgets publicitaires', 'gauche-droite', 1, true),
     ('Applications web et mobiles', 'droite-gauche', 2, true),
     ('Captations photo & vidéo', 'gauche-droite', 3, true);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sections_realisations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clients" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sections_realisations" CASCADE;
  DROP TABLE "clients" CASCADE;
  ALTER TABLE "realisations_rels" DROP CONSTRAINT "realisations_rels_sections_realisations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sections_realisations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_clients_fk";
  
  ALTER TABLE "service_images" DROP CONSTRAINT "service_images_communication_visuelle_carte_id_media_id_fk";
  
  ALTER TABLE "service_images" DROP CONSTRAINT "service_images_communication_digitale_carte_id_media_id_fk";
  
  ALTER TABLE "service_images" DROP CONSTRAINT "service_images_marketing_strategie_carte_id_media_id_fk";
  
  ALTER TABLE "service_images" DROP CONSTRAINT "service_images_automatisation_ia_carte_id_media_id_fk";
  
  ALTER TABLE "service_images" DROP CONSTRAINT "service_images_photo_video_carte_id_media_id_fk";
  
  DROP INDEX "realisations_rels_sections_realisations_id_idx";
  DROP INDEX "payload_locked_documents_rels_sections_realisations_id_idx";
  DROP INDEX "payload_locked_documents_rels_clients_id_idx";
  DROP INDEX "service_images_communication_visuelle_communication_vi_3_idx";
  DROP INDEX "service_images_communication_digitale_communication_di_3_idx";
  DROP INDEX "service_images_marketing_strategie_marketing_strategie_c_idx";
  DROP INDEX "service_images_automatisation_ia_automatisation_ia_carte_idx";
  DROP INDEX "service_images_photo_video_photo_video_carte_idx";
  ALTER TABLE "realisations_rels" DROP COLUMN "sections_realisations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sections_realisations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "clients_id";
  ALTER TABLE "service_images" DROP COLUMN "communication_visuelle_carte_id";
  ALTER TABLE "service_images" DROP COLUMN "communication_digitale_carte_id";
  ALTER TABLE "service_images" DROP COLUMN "marketing_strategie_carte_id";
  ALTER TABLE "service_images" DROP COLUMN "automatisation_ia_carte_id";
  ALTER TABLE "service_images" DROP COLUMN "photo_video_carte_id";
  DROP TYPE "public"."enum_sections_realisations_sens";`)
}
