export default {
  contentKo: `# LLM 개요

## 대형 언어 모델이란?

**LLM(Large Language Model)**은 수십억~수천억 개의 파라미터를 가진 트랜스포머 기반 언어 모델입니다. 대규모 텍스트 데이터로 사전 학습되어 자연어를 이해하고 생성할 수 있습니다.

## 주요 LLM 모델

| 모델 | 개발사 | 파라미터 | 특징 |
|------|--------|---------|------|
| GPT-4 | OpenAI | 비공개 | 멀티모달, 최고 성능 |
| LLaMA 3 | Meta | 8B~405B | 오픈소스, 상업 가능 |
| Gemma 2 | Google | 2B~27B | 경량, 효율적 |
| Mistral | Mistral AI | 7B~8x22B | MoE, 고효율 |
| Claude | Anthropic | 비공개 | 안전성, 긴 컨텍스트 |

## 스케일링 법칙

모델 크기(N), 데이터 양(D), 연산량(C)을 늘릴수록 성능이 예측 가능하게 향상됩니다.

## 토크나이제이션

\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
tokens = tokenizer.encode("파인튜닝을 배워봅시다!")
print(f"토큰 수: {len(tokens)}")
print(f"토큰: {tokens}")
print(f"디코딩: {tokenizer.decode(tokens)}")
\`\`\`

## 컨텍스트 윈도우

모델이 한 번에 처리할 수 있는 최대 토큰 수입니다.
- GPT-4: 128K 토큰
- LLaMA 3: 128K 토큰
- Claude: 200K 토큰

## 생성 파라미터

\`\`\`python
output = model.generate(
    **inputs,
    max_new_tokens=512,
    temperature=0.7,    # 높을수록 다양한 출력
    top_p=0.9,          # 누적 확률 기반 샘플링
    top_k=50,           # 상위 k개 토큰에서 샘플링
    do_sample=True,
)
\`\`\`

## 프롬프트 엔지니어링 vs 파인튜닝

| 항목 | 프롬프트 엔지니어링 | 파인튜닝 |
|------|-------------------|---------|
| 비용 | 낮음 | 중간~높음 |
| 데이터 | 불필요 | 수백~수만 개 |
| 성능 | 보통 | 높음 |
| 유연성 | 높음 | 특정 태스크 특화 |
| 적용 시간 | 즉시 | 수시간~수일 |

## 다음 단계

다음 레슨에서는 **사전학습 vs 파인튜닝**의 차이를 상세히 학습합니다.
`,
  contentEn: `# LLM Overview

## What are Large Language Models?

**LLMs** are transformer-based language models with billions to hundreds of billions of parameters, pre-trained on massive text data to understand and generate natural language.

## Key LLM Models

| Model | Developer | Parameters | Feature |
|-------|-----------|-----------|---------|
| GPT-4 | OpenAI | Undisclosed | Multimodal, top performance |
| LLaMA 3 | Meta | 8B-405B | Open source, commercial |
| Gemma 2 | Google | 2B-27B | Lightweight, efficient |
| Mistral | Mistral AI | 7B-8x22B | MoE, high efficiency |
| Claude | Anthropic | Undisclosed | Safety, long context |

## Scaling Laws

Performance improves predictably as model size (N), data (D), and compute (C) increase.

## Tokenization

\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
tokens = tokenizer.encode("Let's learn fine-tuning!")
print(f"Token count: {len(tokens)}")
print(f"Decoded: {tokenizer.decode(tokens)}")
\`\`\`

## Context Window

Maximum tokens a model can process at once (GPT-4: 128K, Claude: 200K).

## Generation Parameters

\`\`\`python
output = model.generate(
    **inputs,
    max_new_tokens=512,
    temperature=0.7,    # Higher = more diverse
    top_p=0.9,          # Nucleus sampling
    top_k=50,           # Top-k sampling
    do_sample=True,
)
\`\`\`

## Prompt Engineering vs Fine-Tuning

| Aspect | Prompting | Fine-Tuning |
|--------|-----------|-------------|
| Cost | Low | Medium-High |
| Data | Not needed | Hundreds-thousands |
| Performance | Moderate | High |
| Flexibility | High | Task-specific |

## Next Steps

Next lesson covers **Pre-training vs Fine-tuning** in detail.
`,
};
