export default {
  contentKo: `# DPO (Direct Preference Optimization)

## DPO란?

**DPO**는 보상 모델 없이 선호도 데이터에서 직접 정책을 최적화하는 기법입니다. PPO 대비 훨씬 간단합니다.

## DPO vs PPO

| 항목 | PPO | DPO |
|------|-----|-----|
| 보상 모델 | 필요 | 불필요 (암묵적) |
| 모델 수 | 4개 | 2개 (정책 + 참조) |
| 구현 복잡도 | 높음 | 낮음 |
| 안정성 | 민감 | 안정적 |

## TRL DPOTrainer 예제

\`\`\`python
from trl import DPOTrainer, DPOConfig

dpo_config = DPOConfig(
    output_dir="./dpo-model",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=5e-7,
    beta=0.1,   # KL 패널티 강도
)

trainer = DPOTrainer(
    model=model,
    ref_model=ref_model,
    args=dpo_config,
    train_dataset=preference_dataset,  # chosen + rejected
    tokenizer=tokenizer,
)
trainer.train()
\`\`\`

## DPO 변형들

- **IPO**: Implicit Preference Optimization
- **KTO**: Kahneman-Tversky Optimization (짝이 필요 없음)
- **ORPO**: Odds Ratio Preference Optimization

## 다음 단계

다음 카테고리에서는 **HuggingFace Transformers**를 학습합니다.
`,
  contentEn: `# DPO (Direct Preference Optimization)

## What is DPO?

Optimizes policy directly from preference data **without a reward model**. Much simpler than PPO.

## DPO vs PPO

| Aspect | PPO | DPO |
|--------|-----|-----|
| Reward Model | Required | Not needed |
| Models | 4 | 2 |
| Complexity | High | Low |
| Stability | Sensitive | Stable |

## TRL DPOTrainer

\`\`\`python
from trl import DPOTrainer, DPOConfig
trainer = DPOTrainer(
    model=model, ref_model=ref_model,
    args=DPOConfig(output_dir="./dpo", beta=0.1, learning_rate=5e-7),
    train_dataset=preference_dataset, tokenizer=tokenizer,
)
trainer.train()
\`\`\`

## DPO Variants

- **IPO**, **KTO** (no pairs needed), **ORPO**

## Next Steps

Next category covers **HuggingFace Transformers**.
`,
};
