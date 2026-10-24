import { careerRepo, activityRepo, closeDatabase } from './index.js';
import { careersData } from '../data/careers.js';
import { activitiesData } from '../data/activities.js';

export function seedDatabase(): void {
  console.log('[Seed] Starting database seed...');

  console.log(`[Seed] Seeding ${careersData.length} verified careers...`);
  for (const career of careersData) {
    careerRepo.upsert(career);
  }
  console.log(`[Seed] Successfully seeded ${careersData.length} careers.`);

  console.log(`[Seed] Seeding ${activitiesData.length} interactive activities...`);
  for (const activity of activitiesData) {
    activityRepo.upsert(activity);
  }
  console.log(`[Seed] Successfully seeded ${activitiesData.length} activities.`);

  console.log('[Seed] Database seed completed successfully.');
}

// Run standalone if executed directly
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  try {
    seedDatabase();
    closeDatabase();
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Database seeding failed:', err);
    process.exit(1);
  }
}
