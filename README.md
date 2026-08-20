# 🎭 PG-Meme - เว็บแอปพลิเคชันสุ่มมีม & คลังมีมยอดฮิต

เว็บแอปพลิเคชันรวมมีมสุดฮิตจาก **Imgflip API** พัฒนาด้วย React 19, Tailwind CSS และ React Router DOM พร้อมระบบสุ่มมีม ค้นหา กรองหมวดหมู่ และบันทึกมีมโปรดลงเครื่อง (LocalStorage)

🌐 **Live Demo:** [pg-meme.vercel.app](https://pg-meme.vercel.app)

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 1. 🎲 สุ่มมีม (Random Meme Generator) - หน้าแรก (`/`)
* **สุ่มมีมทีละรายการ:** แสดงรูปภาพมีมขนาดใหญ่ พร้อมข้อมูลจำนวนช่อง (Box Count) และชื่อผู้สร้าง
* **ปุ่ม "🎲 ถัดไป":** สุ่มมีมรายการใหม่แบบไม่ซ้ำกับตัวเดิม
* **ปุ่ม "❤️ ชอบ / ถูกใจ":** บันทึกมีมเข้าสู่คลังรายการโปรด (Favorites) ได้ทันที

### 2. 🔥 มีมยอดฮิต & ค้นหา (Meme Category & Search) (`/memecategory`)
* **ค้นหาแบบ Real-time:** ค้นหาชื่อมีมหรือชื่อผู้สร้างได้ทันที พร้อมปุ่มเคลียร์คำค้นหา
* **ตัวกรองหมวดหมู่ (Category Filters):**
  * ✨ ทั้งหมด (All)
  * 🔥 ยอดฮิต Top 20
  * ✌️ มีม 2 ช่อง (Classic 2-box)
  * 📑 มีมหลายช่อง (Multi-box)
  * 🎲 สุ่มลำดับมีมใหม่ (Shuffle)
* **การ์ดมีม (Meme Card):** แสดง Badge ความนิยม (Top 5, Hot, Trending) ยอดไลก์ และ Avatar ผู้สร้าง
* **Quick View Modal:** คลิกการ์ดเพื่อเปิดดูรูปขนาดใหญ่พร้อมรายละเอียด
* **โหมดเลือกหลายรายการ (Batch Select):** ติ๊กเลือกมีมที่ต้องการเพื่อเพิ่มเข้ารายการโปรดพร้อมกันในคลิกเดียว

### 3. ⭐ รายการโปรด (Favorites System) (`/favorites`)
* **บันทึกถาวรด้วย LocalStorage:** ข้อมูลมีมโปรดไม่สูญหายแม้ปิดแท็บหรือรีเฟรชหน้า
* **ซิงค์สถานะอัตโนมัติ:** ใช้ React Context (`FavoritesContext`) ซิงค์สถานะการกดถูกใจข้ามทุกหน้า
* **จัดการรายการโปรดแบบกลุ่ม (Bulk Delete):** เข้าสู่โหมดเลือกเพื่อลบมีมที่ไม่ต้องการออกพร้อมกัน

### 4. 🎨 ดีไซน์และการใช้งาน (UI/UX Design)
* **โทนสีอบอุ่นมินิมอล:** ใช้ชุดสี Warm Orange, Peach และ Earth Tone
* **Responsive Design:**
  * **Desktop:** แถบนำทางด้านบน (Navbar) พร้อม Dropdown Menu และ Grid แสดงผลสูงสุด 4 คอลัมน์
  * **Mobile:** แถบนำทางด้านล่าง (Bottom Navigation Bar) ใช้งานสะดวกด้วยมือเดียว
* **Micro-interactions:** เอฟเฟกต์ Hover, Smooth Transitions, Loading Skeleton และ Backdrop Blur

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vite.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Routing:** [React Router DOM v7](https://reactrouter.com/)
* **API Source:** [Imgflip API](https://imgflip.com/api)
* **State Management:** React Context API + LocalStorage
* **Deployment:** [Vercel](https://vercel.com/)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
PG-meme/
├── public/                 # Static Assets
├── src/
│   ├── assets/             # รูปภาพและ SVG assets
│   ├── components/         # คอมโพเนนต์ที่ใช้ซ้ำ
│   │   ├── BottomNav.jsx       # แถบนำทางด้านล่างสำหรับมือถือ
│   │   ├── CategoryFilters.jsx # ปุ่มตัวกรองหมวดหมู่มีม
│   │   ├── Layout.jsx          # โครงสร้าง Layout หลัก (Navbar + Outlet + BottomNav)
│   │   ├── MemeCard.jsx        # การ์ดแสดงผลมีมแต่ละรายการ
│   │   ├── MemeModal.jsx       # Modal แสดงมีมขนาดใหญ่
│   │   ├── NavBar.jsx          # แถบนำทางด้านบน
│   │   └── SearchBar.jsx       # กล่องค้นหามีม
│   ├── contexts/           # React Contexts
│   │   └── FavoritesContext.jsx # ตัวจัดการ State และ LocalStorage ของรายการโปรด
│   ├── pages/              # หน้าเว็บหลัก
│   │   ├── Favorites.jsx       # หน้ารายการโปรด (/favorites)
│   │   ├── MemeCategory.jsx    # หน้ามีมยอดฮิต & ค้นหา (/memecategory)
│   │   └── RandomMeme.jsx      # หน้าสุ่มมีม (/ - Landing Page)
│   ├── services/           # ฟังก์ชันเชื่อมต่อภายนอก
│   │   └── memeService.js      # ดึงและแปลงข้อมูลจาก Imgflip API
│   ├── App.jsx             # ตั้งค่า Router และ Provider
│   ├── index.css           # Global CSS & Tailwind Configurations
│   └── main.jsx            # Entry point ของ React App
├── index.html              # Template HTML หลัก
├── package.json            # รายการ Dependencies และ Scripts
└── vite.config.js          # ตั้งค่า Vite
```

---

## 🚀 วิธีติดตั้งและรันในเครื่อง (Getting Started)

### ข้อกำหนดเบื้องต้น
* [Node.js](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป)
* Git

### 1. โคลนคลังโค้ด (Clone Repository)
```bash
git clone https://github.com/Jakkapon-Dev/PG-meme.git
cd PG-meme
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. เริ่มต้นเซิร์ฟเวอร์สำหรับพัฒนา (Run Development Server)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

### 4. สั่ง Build สำหรับ Production
```bash
npm run build
```

---

## 📄 License
โปรเจกต์นี้เปิดให้ใช้งานและเรียนรู้ได้ภายใต้ลิขสิทธิ์ [MIT License](LICENSE)
