export default {
  contentKo: `# Mistral 파인튜닝

## Mistral 모델

| 모델 | 크기 | 특징 |
|------|------|------|
| Mistral 7B | 7B | Sliding Window Attention |
| Mixtral 8x7B | 46.7B (활성 12.9B) | MoE 아키텍처 |
| Mistral Small/Large | 다양 | API 기반 |

## Sliding Window Attention

고정 길이 윈도우 내에서만 어텐션을 계산하여 메모리 효율을 높입니다.

## MoE (Mixture of Experts)

Mixtral은 8개의 전문가(Expert) 중 2개만 활성화하여, 적은 연산으로 큰 모델의 성능을 냅니다.

## 파인튜닝

\`\`\`python
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.3",
    quantization_config=bnb_config,
    device_map="auto",
)
# 이후 LoRA/QLoRA 적용은 LLaMA와 동일
\`\`\`

## 다음 단계

다음 레슨에서는 **한국어 LLM 파인튜닝**을 학습합니다.
`,
  contentEn: `# Mistral Fine-tuning

## Mistral Models

- Mistral 7B: Sliding Window Attention
- Mixtral 8x7B: MoE architecture (8 experts, 2 active)

## Fine-tuning

\`\`\`python
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.3",
    quantization_config=bnb_config, device_map="auto")
# Apply LoRA/QLoRA same as LLaMA
\`\`\`

## Next Steps

Next lesson covers **Korean LLM Fine-tuning**.
`,
};
