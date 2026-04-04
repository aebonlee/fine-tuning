import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'og');

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const BRAND = 'FINETUNING';
const URL = 'fine-tuning.dreamitbiz.com';

const images = [
  { file: 'default.png', title: 'FineTuning', subtitle: 'AI 파인튜닝 학습 플랫폼', color: '#1B3A6B' },
  { file: 'lessons.png', title: 'AI 파인튜닝 학습', subtitle: '12 Categories · 50+ Lessons', color: '#1B3A6B' },
  { file: 'fundamentals.png', title: 'AI/ML 기초', subtitle: 'Machine Learning · Deep Learning · Transformers', color: '#1B3A6B' },
  { file: 'data.png', title: '데이터 준비', subtitle: 'Collection · Cleaning · Formatting · Augmentation', color: '#00855A' },
  { file: 'sft.png', title: 'SFT 파인튜닝', subtitle: 'LoRA · QLoRA · Adapter · Prefix Tuning', color: '#8B1AC8' },
  { file: 'rlhf.png', title: 'RLHF & 정렬', subtitle: 'RLHF · PPO · DPO · Reward Model', color: '#C8102E' },
  { file: 'huggingface.png', title: 'HuggingFace', subtitle: 'Transformers · PEFT · TRL · Hub', color: '#C87200' },
  { file: 'models.png', title: '주요 모델 파인튜닝', subtitle: 'GPT · LLaMA · Gemma · Mistral · Korean LLM', color: '#1B3A6B' },
  { file: 'deployment.png', title: '모델 배포', subtitle: 'vLLM · Ollama · FastAPI · Quantization', color: '#8B1AC8' },
  { file: 'projects.png', title: '실전 프로젝트', subtitle: 'Chatbot · Code Assistant · Document QA', color: '#00855A' },
  { file: 'community.png', title: '커뮤니티', subtitle: 'Tips · Questions · Showcase', color: '#C87200' },
];

async function generateImage({ file, title, subtitle, color }) {
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(color, -30)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(0,0,0,0.15)" />

      <!-- Grid pattern -->
      ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${height}" stroke="rgba(255,255,255,0.05)" />`).join('')}
      ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${width}" y2="${i * 60}" stroke="rgba(255,255,255,0.05)" />`).join('')}

      <!-- Brand -->
      <text x="60" y="80" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="rgba(255,255,255,0.7)">${BRAND}</text>

      <!-- Title -->
      <text x="60" y="${height / 2 - 10}" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="white">${escapeXml(title)}</text>

      <!-- Subtitle -->
      <text x="60" y="${height / 2 + 50}" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">${escapeXml(subtitle)}</text>

      <!-- URL -->
      <text x="60" y="${height - 40}" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)">${URL}</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(outDir, file));

  console.log(`  ✓ ${file}`);
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function main() {
  console.log('Generating OG images...');
  for (const img of images) {
    await generateImage(img);
  }
  console.log(`\nDone! ${images.length} images generated in public/og/`);
}

main().catch(console.error);
