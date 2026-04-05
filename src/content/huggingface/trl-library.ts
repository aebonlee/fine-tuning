export default {
  contentKo: `# TRL 라이브러리

## TRL이란?

**TRL (Transformer Reinforcement Learning)**은 HuggingFace에서 개발한 RLHF/DPO 학습 라이브러리입니다.

## 주요 Trainer

| Trainer | 용도 |
|---------|------|
| SFTTrainer | 지도학습 파인튜닝 |
| RewardTrainer | 보상 모델 학습 |
| PPOTrainer | PPO 기반 RLHF |
| DPOTrainer | DPO 직접 선호 최적화 |

## SFTTrainer 예제

\`\`\`python
from trl import SFTTrainer, SFTConfig

trainer = SFTTrainer(
    model="meta-llama/Llama-3.2-1B",
    args=SFTConfig(
        output_dir="./sft",
        max_seq_length=2048,
        packing=True,  # 효율적 패킹
    ),
    train_dataset=dataset,
    peft_config=lora_config,
)
trainer.train()
\`\`\`

## 챗 템플릿 활용

\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")

messages = [
    {"role": "system", "content": "당신은 AI 전문가입니다."},
    {"role": "user", "content": "LoRA란?"},
]

formatted = tokenizer.apply_chat_template(messages, tokenize=False)
\`\`\`

## 다음 단계

다음 레슨에서는 **모델 업로드 & 공유**를 학습합니다.
`,
  contentEn: `# TRL Library

## What is TRL?

**TRL** provides trainers for SFT, Reward Modeling, PPO, and DPO.

## Key Trainers

SFTTrainer, RewardTrainer, PPOTrainer, DPOTrainer

## SFTTrainer Example

\`\`\`python
from trl import SFTTrainer, SFTConfig
trainer = SFTTrainer(
    model="meta-llama/Llama-3.2-1B",
    args=SFTConfig(output_dir="./sft", max_seq_length=2048, packing=True),
    train_dataset=dataset, peft_config=lora_config,
)
trainer.train()
\`\`\`

## Next Steps

Next lesson covers **Model Upload & Share**.
`,
};
