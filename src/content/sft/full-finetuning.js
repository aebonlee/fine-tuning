export default {
  contentKo: `# 전체 파인튜닝

## 전체 파인튜닝이란?

모델의 **모든 파라미터**를 업데이트하는 방법입니다. 가장 높은 성능을 달성할 수 있지만, 가장 많은 자원이 필요합니다.

## 코드 예제

\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
tokenizer.pad_token = tokenizer.eos_token

training_args = TrainingArguments(
    output_dir="./full-ft",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,   # 실효 배치 = 4×4 = 16
    learning_rate=2e-5,
    lr_scheduler_type="cosine",
    warmup_ratio=0.05,
    weight_decay=0.01,
    fp16=True,
    logging_steps=10,
    save_strategy="epoch",
    evaluation_strategy="epoch",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)
trainer.train()
\`\`\`

## 메모리 요구사항

| 모델 | FP16 | FP32 |
|------|------|------|
| 1B | ~8GB | ~16GB |
| 7B | ~56GB | ~112GB |
| 13B | ~104GB | ~208GB |

## 언제 사용하나?

- 충분한 GPU 자원이 있을 때
- 모델의 전체적인 행동 변경이 필요할 때
- 최대 성능이 요구될 때

## 다음 단계

다음 레슨에서는 더 효율적인 **LoRA** 기법을 학습합니다.
`,
  contentEn: `# Full Fine-tuning

## What is Full Fine-tuning?

Updates **all parameters** of the model. Achieves highest performance but requires most resources.

## Code Example

\`\`\`python
from transformers import AutoModelForCausalLM, TrainingArguments, Trainer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")

training_args = TrainingArguments(
    output_dir="./full-ft",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-5,
    lr_scheduler_type="cosine",
    fp16=True,
)

trainer = Trainer(model=model, args=training_args, train_dataset=train_dataset)
trainer.train()
\`\`\`

## Memory Requirements

| Model | FP16 | FP32 |
|-------|------|------|
| 1B | ~8GB | ~16GB |
| 7B | ~56GB | ~112GB |

## When to Use?

- Sufficient GPU resources available
- Need to change overall model behavior
- Maximum performance required

## Next Steps

Next lesson covers the more efficient **LoRA** technique.
`,
};
