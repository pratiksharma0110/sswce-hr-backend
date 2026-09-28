CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) GENERATED ALWAYS AS (lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))) STORED NOT NULL,
	"description" text NOT NULL,
	"salary" varchar(255) NOT NULL,
	"experience" varchar(255),
	"content" uuid,
	"workingHours" varchar(255),
	"details" jsonb,
	CONSTRAINT "jobs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_content_media_id_fk" FOREIGN KEY ("content") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;