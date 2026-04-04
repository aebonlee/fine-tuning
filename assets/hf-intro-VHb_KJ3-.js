const e={contentKo:`# HuggingFace 시작하기

## HuggingFace Hub

모델, 데이터셋, Spaces를 공유하는 AI 커뮤니티 플랫폼입니다. 100만 개 이상의 모델이 호스팅되어 있습니다.

## 기본 사용법

\`\`\`python
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# 모델 & 토크나이저 로드
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")

# pipeline으로 간편 사용
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
result = pipe("파인튜닝이란", max_new_tokens=100)
\`\`\`

## 인증 설정

\`\`\`bash
pip install huggingface_hub
huggingface-cli login  # 토큰 입력
\`\`\`

## 파인튜닝용 인기 모델

| 모델 | 크기 | 특징 |
|------|------|------|
| meta-llama/Llama-3.2-1B | 1B | 경량, 실습용 |
| meta-llama/Llama-3.1-8B | 8B | 범용, 가장 인기 |
| google/gemma-2-2b | 2B | 경량, 고성능 |
| mistralai/Mistral-7B-v0.3 | 7B | 효율적 |

## 다음 단계

다음 레슨에서는 **Trainer API 활용**을 학습합니다.
`,contentEn:`# Getting Started with HuggingFace

## HuggingFace Hub

AI community platform hosting 1M+ models, datasets, and Spaces.

## Basic Usage

\`\`\`python
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
result = pipe("Fine-tuning is", max_new_tokens=100)
\`\`\`

## Authentication

\`\`\`bash
pip install huggingface_hub
huggingface-cli login
\`\`\`

## Next Steps

Next lesson covers the **Trainer API**.
`};export{e as default};
