import dotenv from 'dotenv'
dotenv.config()

import { db } from "../config/db.js";
import { events } from "../db/schema/index.js"

const seedEvents = async () => {
    try {
        const eventsData = [];
        for (let i = 1; i <= 10; i++) {
            eventsData.push({
                title: `Event ${i}`,
                slug: `event-${i}`,
                description: `This is the description for event ${i}. Join us for an amazing experience.`,
            });
        }
        await db.insert(events).values(eventsData);
        console.log('Events seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedEvents();
