export default {
  contentKo: `# Ollama 로컬 배포

## Ollama란?

로컬에서 LLM을 쉽게 실행할 수 있는 도구입니다.

## 설치

\`\`\`bash
# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows: ollama.com에서 설치 파일 다운로드
\`\`\`

## 기본 사용법

\`\`\`bash
# 모델 다운로드 및 실행
ollama run llama3.2

# 모델 목록 확인
ollama list

# API 호출
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "파인튜닝이란?"
}'
\`\`\`

## 커스텀 모델 (파인튜닝 모델 임포트)

\`\`\`
# Modelfile
FROM ./my-model-q4.gguf
PARAMETER temperature 0.7
PARAMETER num_ctx 4096
SYSTEM "당신은 AI 파인튜닝 전문가입니다."
\`\`\`

\`\`\`bash
ollama create my-finetuned -f Modelfile
ollama run my-finetuned
\`\`\`

## Open WebUI 연동

웹 기반 채팅 인터페이스를 Ollama와 연결할 수 있습니다.

\`\`\`bash
docker run -d -p 3000:8080 \\
    -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \\
    ghcr.io/open-webui/open-webui:main
\`\`\`

## Python에서 사용

\`\`\`python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(
    model="my-finetuned",
    messages=[{"role": "user", "content": "LoRA란?"}]
)
\`\`\`

## 다음 단계

다음 카테고리에서는 **실전 프로젝트**를 학습합니다.
`,
  contentEn: `# Ollama Local Deployment

## What is Ollama?

Run LLMs locally with ease.

## Basic Usage

\`\`\`bash
ollama run llama3.2
ollama list
\`\`\`

## Import Fine-tuned Models

\`\`\`
# Modelfile
FROM ./my-model-q4.gguf
SYSTEM "You are an AI fine-tuning expert."
\`\`\`

\`\`\`bash
ollama create my-finetuned -f Modelfile
ollama run my-finetuned
\`\`\`

## Python Usage

\`\`\`python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(model="my-finetuned",
    messages=[{"role": "user", "content": "What is LoRA?"}])
\`\`\`

## Next Steps

Next category covers **Real Projects**.
`,
};
