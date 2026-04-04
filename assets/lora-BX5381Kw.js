const e={contentKo:`# LoRA (Low-Rank Adaptation)

## LoRA란?

**LoRA**는 기존 모델 가중치를 동결하고, 작은 저랭크(low-rank) 행렬만 학습하는 기법입니다. 학습 파라미터를 **약 99% 감소**시킵니다.

## 핵심 개념

\`\`\`
기존: W (d×d 행렬)에 직접 업데이트
LoRA: W + ΔW = W + A×B (A: d×r, B: r×d, r << d)

r=16일 때: d×d → d×16 + 16×d 로 파라미터 수 대폭 감소
\`\`\`

## 코드 예제

\`\`\`python
from peft import LoraConfig, get_peft_model, TaskType

lora_config = LoraConfig(
    r=16,                    # 랭크 (8, 16, 32, 64)
    lora_alpha=32,           # 스케일링 = alpha/r
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    task_type=TaskType.CAUSAL_LM,
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable: 4,194,304 / all: 1,241,513,984 (0.34%)
\`\`\`

## 주요 하이퍼파라미터

| 파라미터 | 설명 | 추천 값 |
|----------|------|---------|
| r | 랭크 | 8~64 |
| lora_alpha | 스케일링 | r의 2배 |
| target_modules | 적용 레이어 | q,v,k,o_proj |
| lora_dropout | 드롭아웃 | 0.05~0.1 |

## 어댑터 병합

\`\`\`python
# 학습 후 어댑터를 모델에 병합
merged_model = model.merge_and_unload()
merged_model.save_pretrained("./merged-model")
\`\`\`

## 다음 단계

다음 레슨에서는 **QLoRA**를 학습합니다.
`,contentEn:`# LoRA (Low-Rank Adaptation)

## What is LoRA?

Freezes original weights and trains only small low-rank matrices, reducing trainable parameters by **~99%**.

## Core Concept

\`\`\`
Original: Update W (d×d) directly
LoRA: W + ΔW = W + A×B (A: d×r, B: r×d, r << d)
\`\`\`

## Code Example

\`\`\`python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable: 0.34%
\`\`\`

## Key Hyperparameters

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| r | Rank | 8-64 |
| lora_alpha | Scaling | 2× rank |
| target_modules | Layers | q,v,k,o_proj |

## Merging Adapters

\`\`\`python
merged = model.merge_and_unload()
merged.save_pretrained("./merged-model")
\`\`\`

## Next Steps

Next lesson covers **QLoRA**.
`};export{e as default};
