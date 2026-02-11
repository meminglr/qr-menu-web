import { db } from './lib/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedData() {
    try {
        const mockDataPath = path.join(__dirname, 'mockData.json');
        const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

        // Use a fixed ID for easy testing
        const restaurantId = 'abc12345';

        console.log(`Seeding data to Firestore...`);

        await setDoc(doc(db, "restaurants", restaurantId), mockData);

        console.log("-----------------------------------------");
        console.log("✅ Data successfully written to Firestore!");
        console.log(`🆔 Restaurant ID: ${restaurantId}`);
        console.log("-----------------------------------------");
        console.log(`🔗 Test URL: http://localhost:3000/menu/${restaurantId}`);
        console.log("-----------------------------------------");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seedData();
