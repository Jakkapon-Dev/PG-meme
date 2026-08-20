const IMGFLIP_API_URL = "https://api.imgflip.com/get_memes";

/**
 * ดึงข้อมูลมีมทั้งหมดจาก Imgflip API และจัดรูปแบบข้อมูล
 * @returns {Promise<Array>} รายการมีมที่จัดรูปแบบแล้ว
 */
export async function getMemes() {
  const response = await fetch(IMGFLIP_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !data.data?.memes) {
    throw new Error("ไม่สามารถโหลดข้อมูลมีมได้");
  }

  return data.data.memes.map((m, index) => {
    const baseLikes = Math.max(
      1000,
      100000 - index * 950 + (parseInt(m.id, 10) % 3000)
    );
    const avatars = ["😼", "🐶", "🐸", "😎", "👾", "🦊", "🐼", "🔥"];

    return {
      id: m.id,
      title: m.name,
      image: m.url,
      width: m.width,
      height: m.height,
      boxCount: m.box_count,
      author: `@MemeCreator_${m.id.slice(-3)}`,
      authorAvatar: avatars[index % avatars.length],
      likes: baseLikes,
      isTop20: index < 20,
      badge:
        index < 5 ? "Top 5" : index < 20 ? "Hot" : `${(baseLikes / 1000).toFixed(0)}k`,
      badgeType: index < 5 ? "top" : index < 20 ? "hot" : "trending",
    };
  });
}
