CREATE TYPE "public"."media_types" AS ENUM('image', 'video', 'pdf', 'docx');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'editor', 'author');--> statement-breakpoint
CREATE TYPE "public"."blog_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."appointment_status" AS ENUM('pending', 'confirmed', 'cancelled', 'completed');--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"url" text NOT NULL,
	"alt" varchar(300) NOT NULL,
	"title" varchar(300) NOT NULL,
	"type" "media_types" DEFAULT 'image' NOT NULL,
	"caption" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"role" "user_role" DEFAULT 'author' NOT NULL,
	"avatar" uuid,
	CONSTRAINT "users_name_length_check" CHECK (length(trim("users"."name")) >= 2),
	CONSTRAINT "users_email_length_check" CHECK (length(trim("users"."email")) >= 5),
	CONSTRAINT "users_password_hash_length_check" CHECK (length("users"."password_hash") >= 20)
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(1000),
	"phone" varchar(15) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"bio" text,
	"facebook_url" text,
	"linkedin_url" text,
	"youtube_url" text,
	"instagram_url" text,
	"twitter_url" text,
	"tiktok_url" text,
	CONSTRAINT "authors_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"thumbnail" uuid,
	"author_id" uuid NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"status" "blog_status" DEFAULT 'draft' NOT NULL,
	"meta_title" varchar(255),
	"meta_description" varchar(300),
	"canonical_url" varchar(500),
	"og_title" varchar(255),
	"og_description" varchar(300),
	"schema" text,
	"redirect_url" text
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"content" uuid,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"time" timestamp with time zone DEFAULT now() NOT NULL,
	"location" text DEFAULT 'Narayan Gopal Chowk,Kathmandu' NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gallery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"image" uuid NOT NULL,
	"album" uuid
);
--> statement-breakpoint
CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(300)
);
--> statement-breakpoint
CREATE TABLE "notices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"content" uuid,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	CONSTRAINT "notices_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"position" varchar(255),
	"preferred_country" varchar(255),
	"application_type" varchar(50),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"location" varchar(255),
	"date_of_birth" varchar(20),
	"highest_qualification" varchar(255),
	"field_of_study" varchar(255),
	"institution_name" varchar(255),
	"graduation_year" varchar(10),
	"total_experience" varchar(50),
	"current_position" varchar(255),
	"company_name" varchar(255),
	"relevant_experience" text,
	"cv_media_id" uuid,
	"declaration_accepted" boolean DEFAULT false NOT NULL,
	"status" "appointment_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_media_id_fk" FOREIGN KEY ("avatar") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_thumbnail_media_id_fk" FOREIGN KEY ("thumbnail") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_content_media_id_fk" FOREIGN KEY ("content") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_media_id_fk" FOREIGN KEY ("image") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_album_albums_id_fk" FOREIGN KEY ("album") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notices" ADD CONSTRAINT "notices_content_media_id_fk" FOREIGN KEY ("content") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_cv_media_id_media_id_fk" FOREIGN KEY ("cv_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contacts_email_idx" ON "contacts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contacts_created_at_idx" ON "contacts" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "blogs_slug_unique" ON "blogs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blogs_author_id_idx" ON "blogs" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "blogs_status_idx" ON "blogs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "appointments_email_idx" ON "appointments" USING btree ("email");--> statement-breakpoint
CREATE INDEX "appointments_status_idx" ON "appointments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "appointments_created_at_idx" ON "appointments" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "appointments_cv_media_idx" ON "appointments" USING btree ("cv_media_id");