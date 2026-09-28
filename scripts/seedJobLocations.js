import dotenv from 'dotenv';
dotenv.config();

import { and, eq, isNull, or } from 'drizzle-orm';
import { db } from '../config/db.js';
import { jobs } from '../db/schema/index.js';

const DEFAULT_LOCATION = 'Tokyo, Japan';

const LOCATIONS = [
  { slug: 'backend-engineer', location: 'Tokyo, Japan' },
  { slug: 'data-scientist', location: 'Tokyo, Japan' },
  { slug: 'devops-engineer', location: 'Tokyo, Japan' },
  { slug: 'product-manager', location: 'Tokyo, Japan' },
  { slug: 'marketing-manager', location: 'Tokyo, Japan' },
  { slug: 'security-analyst', location: 'Tokyo, Japan' },
  { slug: 'frontend-developer', location: 'Yokohama, Japan' },
  { slug: 'mobile-app-developer', location: 'Yokohama, Japan' },
  { slug: 'uiux-designer', location: 'Kyoto, Japan' },
  { slug: 'qa-engineer', location: 'Nagoya, Japan' },
  { slug: 'customer-support-representative', location: 'Osaka, Japan' },
  { slug: 'hr-specialist', location: 'Osaka, Japan' },
];

const seedJobLocations = async () => {
  try {
    let updated = 0;
    let skipped = 0;

    for (const { slug, location } of LOCATIONS) {
      // Only touch rows still holding the column default, so re-running this
      // script never clobbers a location that someone has since edited.
      const { rowCount } = await db
        .update(jobs)
        .set({ location })
        .where(
          and(
            eq(jobs.slug, slug),
            or(isNull(jobs.location), eq(jobs.location, DEFAULT_LOCATION)),
          ),
        );

      if (rowCount > 0) {
        updated += rowCount;
        console.log(`updated ${slug} -> ${location}`);
      } else {
        skipped += 1;
        console.log(`skipped ${slug} (already has a custom location)`);
      }
    }

    console.log(`\nJob locations seeded: ${updated} updated, ${skipped} skipped`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedJobLocations();
