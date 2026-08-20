/**
 * Web Audio API Sound Effects Engine
 * สร้างเสียงสังเคราะห์คุณภาพสูง ลื่นไหล ไม่หน่วง และไม่ต้องโหลดไฟล์ภายนอก
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// -------------------------------------------------------------
// UI SOUND EFFECTS
// -------------------------------------------------------------

/**
 * ❤️ Heart / Like Sound: คอร์ดประกายวิบวับน่ารัก (Kawaii sparkling chime)
 */
export function playHeartSound(volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Sweet chord)

  freqs.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + index * 0.05);

    const startTime = now + index * 0.05;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.18 * volume, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.35);
  });
}

/**
 * 🤍 Unlike Sound: เสียง Pop-down นุ่มๆ
 */
export function playUnlikeSound(volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(450, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);

  gain.gain.setValueAtTime(0.2 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

/**
 * 🫧 Pop / Click Sound: เสียงฟองสบู่ป๊อปสำหรับคลิกปุ่ม / เลือกหมวดหมู่
 */
export function playPopSound(volume = 0.35) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);

  gain.gain.setValueAtTime(0.25 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}

/**
 * 🎲 Dice Roll Sound: เสียงเขย่าลูกเต๋าและเด้งดึ๋ง
 */
export function playDiceSound(volume = 0.45) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const taps = 5;

  for (let i = 0; i < taps; i++) {
    const tapTime = now + i * 0.045;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(280 + Math.random() * 200, tapTime);
    osc.frequency.exponentialRampToValueAtTime(120, tapTime + 0.04);

    gain.gain.setValueAtTime(0.2 * volume, tapTime);
    gain.gain.exponentialRampToValueAtTime(0.001, tapTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(tapTime);
    osc.stop(tapTime + 0.04);
  }

  // เสียงดึ๋งตบท้าย
  const finalTime = now + taps * 0.045 + 0.02;
  const finalOsc = ctx.createOscillator();
  const finalGain = ctx.createGain();

  finalOsc.type = "sine";
  finalOsc.frequency.setValueAtTime(400, finalTime);
  finalOsc.frequency.exponentialRampToValueAtTime(800, finalTime + 0.15);

  finalGain.gain.setValueAtTime(0.25 * volume, finalTime);
  finalGain.gain.exponentialRampToValueAtTime(0.001, finalTime + 0.2);

  finalOsc.connect(finalGain);
  finalGain.connect(ctx.destination);

  finalOsc.start(finalTime);
  finalOsc.stop(finalTime + 0.2);
}

/**
 * 📋 Copy Success Sound: เสียง Ding ใสๆ เมื่อคัดลอกสำเร็จ
 */
export function playCopySound(volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [880, 1318.5].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startTime = now + idx * 0.08;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.2 * volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.25);
  });
}

/**
 * 🗑️ Trash / Delete Sound: เสียงลบรายการ
 */
export function playTrashSound(volume = 0.35) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

  gain.gain.setValueAtTime(0.18 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

/**
 * ✨ Tada / Success Chime: เสียงยินดีเมื่อเพิ่มรายการโปรดสำเร็จ
 */
export function playTadaSound(volume = 0.45) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C E G C E

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + idx * 0.05;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.15 * volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx === notes.length - 1 ? 0.5 : 0.2));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + (idx === notes.length - 1 ? 0.5 : 0.2));
  });
}

/**
 * 💨 Whoosh / Modal Sound: เสียงเปิด/ปิดหน้าต่าง
 */
export function playWhooshSound(volume = 0.25) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(250, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.08);

  gain.gain.setValueAtTime(0.15 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

// -------------------------------------------------------------
// MEME SOUNDBOARD EFFECTS (ซาวด์มีมยอดฮิต)
// -------------------------------------------------------------

/**
 * 📯 Airhorn: เสียงแตรลมยอดฮิต
 */
export function playAirhorn(volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const beeps = [0, 0.12, 0.24, 0.36];
  const pitches = [466.16, 466.16, 466.16, 523.25]; // Bb4, C5

  beeps.forEach((startOffset, i) => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    const startTime = now + startOffset;
    const duration = 0.1;

    osc1.type = "sawtooth";
    osc2.type = "square";

    const freq = pitches[i];
    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 1.5, startTime); // 5th harmonic

    gain.gain.setValueAtTime(0.2 * volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  });
}

/**
 * 🗿 Bruh: เสียง Bruh ต่ำกวนๆ
 */
export function playBruh(volume = 0.6) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(95, now + 0.35);

  gain.gain.setValueAtTime(0.3 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.4);
}

/**
 * 🥁 Ba-Dum Tss: มุกตบมุก แบ๊ดั้มตึ๊ง
 */
export function playBaDumTss(volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Ba (Tom 1)
  const tom1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  tom1.frequency.setValueAtTime(180, now);
  tom1.frequency.exponentialRampToValueAtTime(80, now + 0.1);
  g1.gain.setValueAtTime(0.3 * volume, now);
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  tom1.connect(g1);
  g1.connect(ctx.destination);
  tom1.start(now);
  tom1.stop(now + 0.12);

  // Dum (Tom 2)
  const tom2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  const t2Time = now + 0.14;
  tom2.frequency.setValueAtTime(140, t2Time);
  tom2.frequency.exponentialRampToValueAtTime(60, t2Time + 0.1);
  g2.gain.setValueAtTime(0.35 * volume, t2Time);
  g2.gain.exponentialRampToValueAtTime(0.001, t2Time + 0.12);
  tom2.connect(g2);
  g2.connect(ctx.destination);
  tom2.start(t2Time);
  tom2.stop(t2Time + 0.12);

  // Tss (Cymbal / High-hat splash)
  const tssTime = now + 0.32;
  const oscTss = ctx.createOscillator();
  const gTss = ctx.createGain();
  oscTss.type = "sawtooth";
  oscTss.frequency.setValueAtTime(3500, tssTime);
  oscTss.frequency.exponentialRampToValueAtTime(1200, tssTime + 0.3);
  gTss.gain.setValueAtTime(0.25 * volume, tssTime);
  gTss.gain.exponentialRampToValueAtTime(0.001, tssTime + 0.4);
  oscTss.connect(gTss);
  gTss.connect(ctx.destination);
  oscTss.start(tssTime);
  oscTss.stop(tssTime + 0.4);
}

/**
 * 🎺 Sad Trombone: หวืด แป้ก (Womp Womp Womp Womp)
 */
export function playSadTrombone(volume = 0.45) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 277.18, start: 0, dur: 0.28 },      // C#4
    { freq: 261.63, start: 0.3, dur: 0.28 },    // C4
    { freq: 246.94, start: 0.6, dur: 0.28 },    // B3
    { freq: 233.08, start: 0.9, dur: 0.65, slideTo: 180 }, // Bb3 -> slide down
  ];

  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + n.start;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(n.freq, startTime);
    if (n.slideTo) {
      osc.frequency.linearRampToValueAtTime(n.slideTo, startTime + n.dur);
    }

    gain.gain.setValueAtTime(0.2 * volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + n.dur);
  });
}

/**
 * 🌀 Boing: เสียงเด้งดึ๋งการ์ตูน
 */
export function playBoing(volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.45);

  gain.gain.setValueAtTime(0.3 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.5);
}

/**
 * 🦆 Quack: เสียงเป็ดกวนโอ๊ย
 */
export function playQuack(volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(450, now);
  osc.frequency.linearRampToValueAtTime(220, now + 0.15);

  gain.gain.setValueAtTime(0.25 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

/**
 * 💥 Laser / Pew Pew: เสียงเลเซอร์
 */
export function playLaser(volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(1500, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

  gain.gain.setValueAtTime(0.25 * volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

/**
 * ✨ Anime Wow / Sparkle: เสียงประกายวิ้งวับ
 */
export function playAnimeWow(volume = 0.45) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [659.25, 783.99, 987.77, 1318.51, 1567.98, 2093.0]; // E G B E G C

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + idx * 0.04;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.18 * volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.35);
  });
}
