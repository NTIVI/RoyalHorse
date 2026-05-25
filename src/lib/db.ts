import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_bSrPTYDe31La@ep-falling-butterfly-ap87uv6e-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(databaseUrl);

export async function query(queryString: string, params: any[] = []) {
  try {
    return await (sql as any)(queryString, params);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function initDb() {
  try {
    // 1. Create Inquiries Table
    await query(`
      CREATE TABLE IF NOT EXISTS royal_horse_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT DEFAULT '',
        service VARCHAR(100) DEFAULT '',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'New',
        notes TEXT DEFAULT ''
      );
    `);

    // 2. Create Dynamic Content Table (CMS)
    await query(`
      CREATE TABLE IF NOT EXISTS royal_horse_content (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        title_bg VARCHAR(255) DEFAULT '',
        title_en VARCHAR(255) DEFAULT '',
        desc_bg TEXT DEFAULT '',
        desc_en TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        extra_info TEXT DEFAULT '',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Migrate: add message and service columns if table already exists without them
    await query(`
      ALTER TABLE royal_horse_inquiries ADD COLUMN IF NOT EXISTS message TEXT DEFAULT '';
    `);
    await query(`
      ALTER TABLE royal_horse_inquiries ADD COLUMN IF NOT EXISTS service VARCHAR(100) DEFAULT '';
    `);

    // Seed royal_horse_content if it is empty
    const countRes = await query("SELECT COUNT(*) FROM royal_horse_content");
    const count = parseInt(countRes[0]?.count || "0");
    if (count === 0) {
      console.log("Seeding royal_horse_content table with crawled assets...");
      
      const seedItems = [
        // About Us: Place
        ["about_place", "Комплексът", "The Complex", "Royal Horse Club се намира близо до морския бряг, само на 10 км от Бургас.", "Royal Horse Club is located near the coast, just 10 km from Burgas.", "/images/about_place_image_1.jpg", ""],
        ["about_place", "Базата край Ченгене Скеле", "Chengene Skele Base", "Разположен в полите на Странджа планина, комплексът предлага невероятен релакс.", "Located in the foothills of Strandzha mountain, the complex offers great relaxation.", "/images/about_place_image_2.jpg", ""],
        ["about_place", "Снимка от базата 3", "Stable Photo 3", "", "", "/images/about_place_image_3.jpg", ""],
        ["about_place", "Снимка от базата 4", "Stable Photo 4", "", "", "/images/about_place_image_4.jpg", ""],
        ["about_place", "Снимка от базата 5", "Stable Photo 5", "", "", "/images/about_place_image_5.jpg", ""],
        ["about_place", "Снимка от базата 6", "Stable Photo 6", "", "", "/images/about_place_image_6.jpg", ""],
        ["about_place", "Снимка от базата 7", "Stable Photo 7", "", "", "/images/about_place_image_7.jpg", ""],
        ["about_place", "Снимка от базата 8", "Stable Photo 8", "", "", "/images/about_place_image_8.jpg", ""],
        ["about_place", "Снимка от базата 9", "Stable Photo 9", "", "", "/images/about_place_image_9.jpg", ""],
        ["about_place", "Снимка от базата 10", "Stable Photo 10", "", "", "/images/about_place_image_10.jpg", ""],

        // About Us: Team
        ["about_team", "Димитър Василев", "Dimitar Vasilev", "Главен Инструктор", "Head Instructor", "/images/about_team_image_1.jpg", ""],
        ["about_team", "Елена Петрова", "Elena Petrova", "Инструктор по терапевтична езда", "Therapeutic Riding Instructor", "/images/about_team_image_2.jpg", ""],
        ["about_team", "Николай Иванов", "Nikolay Ivanov", "Инструктор & Водач", "Instructor & Guide", "/images/about_team_image_3.jpg", ""],
        ["about_team", "Мария Георгиева", "Mariya Georgieva", "Грижа за конете", "Stable Manager", "/images/about_team_image_4.jpg", ""],

        // About Us: Horses
        ["about_horses", "Силвър", "Silver", "Спокоен и величествен сив жребец, идеален за напреднали ездачи.", "A calm and majestic grey stallion, ideal for advanced riders.", "/images/about_horses_image_1.jpg", ""],
        ["about_horses", "Барон", "Baron", "Опитен и кротък кон за обучение на деца и възрастни.", "Experienced and gentle horse for teaching kids and adults.", "/images/about_horses_image_2.jpg", ""],
        ["about_horses", "Карина", "Karina", "Темпераментна и изящна кобила, любимка на спортните ездачи.", "A spirited and elegant mare, a favorite of sport riders.", "/images/about_horses_image_3.jpg", ""],
        ["about_horses", "Звезда", "Zvezda", "Изключително нежна кобила, използвана основно за хипотерапия.", "An exceptionally gentle mare, used primarily for hippotherapy.", "/images/about_horses_image_4.jpg", ""],
        ["about_horses", "Шоколад", "Chocolate", "Очарователно и дружелюбно пони, любимец на най-малките гости.", "Charming and friendly pony, a favorite of our youngest guests.", "/images/about_horses_image_5.jpg", ""],

        // Riding
        ["riding", "Езда за деца", "Pony riding for kids", "Обиколки на пони, индивидуални уроци и специализирана хипотерапия с инструктори за деца до 12 години.", "Pony riding sessions, individual coaching, and dedicated hippotherapy for kids.", "/images/riding_lessons_image_1.jpg", ""],
        ["riding", "Езда за възрастни", "Horse riding for adults", "Професионални тренировки в манеж, свободни разходки сред природата на Странджа и подготовка за напреднали.", "Professional training, dressage skills development, and trial rides for adult riders.", "/images/riding_horse_image_1.jpg", ""],
        ["riding", "Горски преходи", "Forest Trails & Excursions", "Разходки на кон сред живописните пътеки на Странджа планина и край морския бряг за невероятни емоции.", "Riding tours through scenic mountain paths of Strandzha and coastlines.", "/images/riding_excursions_image_1.jpg", ""],

        // Services
        ["services", "Хотел за любимци", "Pet Hotel", "Професионални грижи за Вашите кучета (до 15 кг) и котки по време на Вашето отсъствие.", "Professional pet hotel care for dogs and cats during your travels.", "/images/services_pet_hotel_image_3.jpg", ""],
        ["services", "Хотел за коне", "Horse Boarding", "Пансион за коне с включена ежедневна грижа, чистене на боксове, паша и хранене.", "Full stable boarding with custom feeding, grazing, and veterinary monitoring.", "/images/services_horse_hotel_image_1.jpg", ""],
        ["services", "Детски рождени дни", "Kids Birthdays", "Незабравими празници на открито с езда, батут, детска площадка и разходка във фермата.", "Unique open-air birthday parties with ponies, farm tour, and animators.", "/images/services_birthday_image_4.jpg", ""],
        ["services", "Домашна кухня", "Home Kitchen & Dining", "Нашият уютен ресторант предлага вкусна българска и руска кухня, приготвена с домашни продукти.", "Eco-sourced restaurant serving traditional Bulgarian and Russian specialties.", "/images/services_restaurant_image_1.jpg", ""],
        ["services", "АТВ Разходки", "ATV Tours", "Вълнуващи турове с едноместни и двуместни АТВ-та (450cc) в района на Странджа.", "Exciting off-road 450cc ATV rentals with mountain guides.", "/images/services_atv_image_1.jpg", ""],
        ["services", "Руска баня", "Russian Bathhouse", "Автентична руска баня на дърва за пълно отпускане и детоксикация на тялото.", "Traditional wood-fired sauna with steam sessions and herbal tea room.", "/images/services_sauna_image_1.jpg", ""],

        // Gallery
        ["gallery", "Голямото Откриване", "The Grand Opening", "Кадри от първия ден на отваряне на нашия комплекс", "Special shots from the opening day of our equestrian club", "/images/gallery_image_1.jpg", "opening"],
        ["gallery", "Отворени Врати", "Open Doors Day", "Деца и родители се запознават с нашите понита", "Parents and kids meeting our friendly ponies during our event", "/images/gallery_image_2.jpg", "doors"],
        ["gallery", "Животът във фермата", "Life at the Farm", "Хранене на зайците и редките видове токачки", "Feeding our rabbits and exotic birds at our contact zoo", "/images/gallery_image_3.jpg", "farm"],
        ["gallery", "Рожден ден на открито", "Outdoor Birthday", "Щастлив рожден ден с езда на пони и батут", "A happy birthday celebration with fun pony rides", "/images/gallery_image_4.jpg", "birthdays"],
        ["gallery", "Професионална Фотосесия", "Photoshoot in Nature", "Романтична сесия с красив черен жребец", "Romantic professional photoshoot with a gorgeous stallion", "/images/gallery_image_5.jpg", "photoshoots"],

        // News
        ["news", "Успех в турнира по препятствия", "Show Jumping Success", "Нашите състезатели показаха отлична подготовка и грабнаха три златни отличия на регионалния турнир в Южна България.", "Our riders won three gold medals at the regional jumping tournament.", "/images/news_image_1.jpg", "12.05.2026"],
        ["news", "Лятно работно време", "Summer Schedule", "Във връзка с летните горещини и грижата за здравето на конете, преминаваме към двуразово работно време: 8:00-11:00 и 17:00-21:00.", "To protect the horses during hot weather, our schedule is now 8-11am and 5-9pm.", "/images/news_image_2.jpg", "01.05.2026"],
        ["news", "Ден на отворените врати", "Open Doors Event", "Заповядайте на нашия празник с безплатни разходки с пони за деца, демонстрации по обездка и хранене на животните.", "Join us for dressage demonstrations and free pony rides.", "/images/news_image_3.jpg", "15.04.2026"],
        ["news", "Нови треньори в екипа", "New Stables Coach", "Радваме се да приветстваме двама нови квалифицирани треньори с богат международен опит в прескачането на препятствия.", "Welcoming two new instructors with international certificates.", "/images/news_image_4.jpg", "10.04.2026"]
      ];

      for (const item of seedItems) {
        await query(
          `INSERT INTO royal_horse_content (category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          item
        );
      }
      console.log("Seeding royal_horse_content completed.");
    }

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}
