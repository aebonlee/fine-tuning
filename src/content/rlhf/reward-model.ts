export default {
  contentKo: `# 보상 모델 학습

## 보상 모델이란?

주어진 프롬프트와 응답에 대해 **품질 점수**를 매기는 모델입니다. 인간의 선호도 데이터로 학습합니다.

## 선호도 데이터 형식

\`\`\`json
{
  "prompt": "파인튜닝이란 무엇인가요?",
  "chosen": "파인튜닝은 사전 학습된 모델을 특정 태스크에 적응시키는...",
  "rejected": "잘 모르겠습니다."
}
\`\`\`

## TRL로 보상 모델 학습

\`\`\`python
from trl import RewardTrainer, RewardConfig

config = RewardConfig(
    output_dir="./reward-model",
    num_train_epochs=1,
    per_device_train_batch_size=4,
    learning_rate=1e-5,
)

trainer = RewardTrainer(
    model=model,
    args=config,
    train_dataset=preference_dataset,
    tokenizer=tokenizer,
)
trainer.train()
\`\`\`

## 보상 해킹 방지

- KL 발산 패널티로 원본 모델과의 거리 제한
- 보상 모델 정기 업데이트

## 다음 단계

다음 레슨에서는 **PPO 학습**을 다룹니다.
`,
  contentEn: `# Reward Model Training

## What is a Reward Model?

Scores the quality of prompt-response pairs, trained on human preference data.

## Preference Data Format

\`\`\`json
{"prompt": "What is fine-tuning?", "chosen": "Fine-tuning adapts...", "rejected": "I don't know."}
\`\`\`

## Training with TRL

\`\`\`python
from trl import RewardTrainer, RewardConfig
trainer = RewardTrainer(
    model=model, args=RewardConfig(output_dir="./rm"),
    train_dataset=preference_dataset, tokenizer=tokenizer,
)
trainer.train()
\`\`\`

## Next Steps

Next lesson covers **PPO Training**.
`,
};
