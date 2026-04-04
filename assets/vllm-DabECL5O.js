const e={contentKo:`# vLLM 서빙

## vLLM이란?

**vLLM**은 **PagedAttention**을 활용한 고성능 LLM 서빙 엔진입니다. 일반 방법 대비 처리량이 **최대 24배** 향상됩니다.

## 설치 및 실행

\`\`\`bash
pip install vllm

# OpenAI 호환 API 서버 실행
vllm serve ./my-model --port 8000 --max-model-len 4096
\`\`\`

## API 호출

\`\`\`python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="dummy")

response = client.chat.completions.create(
    model="./my-model",
    messages=[{"role": "user", "content": "파인튜닝이란?"}],
    max_tokens=512,
)
print(response.choices[0].message.content)
\`\`\`

## LoRA 어댑터 서빙

\`\`\`bash
vllm serve base-model --enable-lora \\
    --lora-modules adapter1=./adapter-path
\`\`\`

## Docker 배포

\`\`\`bash
docker run --gpus all -p 8000:8000 \\
    vllm/vllm-openai:latest \\
    --model ./my-model
\`\`\`

## 다음 단계

다음 레슨에서는 **API 서버 구축**을 학습합니다.
`,contentEn:`# vLLM Serving

## What is vLLM?

High-performance LLM serving with **PagedAttention**, up to **24x throughput**.

## Quick Start

\`\`\`bash
pip install vllm
vllm serve ./my-model --port 8000
\`\`\`

## OpenAI-Compatible API

\`\`\`python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:8000/v1", api_key="dummy")
response = client.chat.completions.create(model="./my-model",
    messages=[{"role": "user", "content": "Hello!"}])
\`\`\`

## Next Steps

Next lesson covers **Building API Server**.
`};export{e as default};
