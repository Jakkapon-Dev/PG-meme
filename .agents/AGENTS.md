# ColoristShop Rules & Data Standards

## Product Object Data Specification

ทุกการ์ดสินค้าใน ColoristShop (ทั้งใน `homepage.html`, `view-all.html`, `products.json` และ API) ต้องมีโครงสร้างข้อมูล (JSON Schema) ที่ครบถ้วนสมบูรณ์ดังนี้เสมอ:

```json
{
  "id": "prod-spring-bags",
  "name": "Colorist Spring Canvas Crossbody Bag",
  "category": "accessories",
  "itemType": "bags",
  "gender": "unisex",
  "targetSeason": "spring",
  "price": 1590,
  "rating": 4.7,
  "reviewsCount": 53,
  "image": "images/spring/accessories/bags/Change_bag_color_to_Coral_202608051324.jpeg",
  "description": "กระเป๋าสะพายข้างผ้าแคนวาส มินิมอลน่ารัก ทนทาน จุของได้เยอะ",
  "isNew": true,
  "isBestSeller": false,
  "colors": [
    {
      "name": "Soft Peach (สีพีชละมุน)",
      "hex": "#FFDAB9",
      "season": "spring",
      "image": "images/spring/accessories/bags/Change_bag_color_to_Coral_202608051324.jpeg"
    },
    {
      "name": "Coral Pink (ชมพูคอรัล)",
      "hex": "#FF7F50",
      "season": "spring",
      "image": "images/spring/accessories/bags/Change_bag_color_to_Soft_202608051324.jpeg"
    },
    {
      "name": "Sunny Gold (เหลืองทองสดใส)",
      "hex": "#FFD700",
      "season": "spring",
      "image": "images/spring/accessories/bags/Change_bag_color_to_Sunny_202608051323.jpeg"
    },
    {
      "name": "Warm Cream (ครีมอบอุ่น)",
      "hex": "#FFF8E7",
      "season": "spring",
      "image": "images/spring/accessories/bags/Cream_classic_leather_handbag_202608051323.jpeg"
    },
    {
      "name": "Mint Green (เขียวมิ้นต์)",
      "hex": "#A8E6CF",
      "season": "spring",
      "image": "images/spring/accessories/bags/Four_leather_handbags_displayed_…_202608051324.jpeg"
    }
  ],
  "sizes": [
    "S",
    "M",
    "L",
    "XL"
  ],
  "sizeChart": {
    "S": "รอบอก/เอว 34-36\" ยาว 26\"",
    "M": "รอบอก/เอว 38-40\" ยาว 27\"",
    "L": "รอบอก/เอว 42-44\" ยาว 28\"",
    "XL": "รอบอก/เอว 46-48\" ยาว 29\""
  }
}
```

### หลักการสำคัญในการเรนเดอร์การ์ดสินค้า (Product Card Rendering Rules):
1. **Initial Card Image:** ใช้รูปจาก `colors[0].image` เป็นหลัก หากไม่มีจึงใช้ `product.image`
2. **Color Swatch Switcher:** คลิกปุ่มสี ต้องสลับ `src` ของการ์ดไปยัง `c.image` ของสีนั้นๆ พร้อมย้ายไฮไลท์ `.active`
3. **Badges:** แสดง `itemType.toUpperCase()` บนรูปภาพ
4. **Interactive Size Pills:** แสดงแถบเลือกไซส์ `sizes` (S, M, L, XL) พร้อมเอฟเฟกต์เลือก
5. **Rating & Reviews:** แสดง `rating` และ `reviewsCount`
6. **Price & Quick View:** แสดงราคา `฿price` พร้อมปุ่ม "ดูรายละเอียด" เพื่อเปิด Modal
