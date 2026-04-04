const e={contentKo:`# Trainer API 활용

## TrainingArguments

\`\`\`python
from transformers import TrainingArguments

args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-5,
    lr_scheduler_type="cosine",
    warmup_ratio=0.05,
    weight_decay=0.01,
    fp16=True,
    logging_steps=10,
    eval_strategy="steps",
    eval_steps=100,
    save_strategy="steps",
    save_steps=100,
    report_to="wandb",       # Weights & Biases 로깅
)
\`\`\`

## SFTTrainer (TRL)

SFT에 특화된 Trainer로, 데이터 포맷팅을 자동 처리합니다.

\`\`\`python
from trl import SFTTrainer, SFTConfig

trainer = SFTTrainer(
    model=model,
    args=SFTConfig(output_dir="./sft", max_seq_length=2048),
    train_dataset=dataset,
    tokenizer=tokenizer,
    peft_config=lora_config,  # PEFT 자동 통합
)
trainer.train()
\`\`\`

## 커스텀 메트릭

\`\`\`python
import numpy as np

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    accuracy = (predictions == labels).mean()
    return {"accuracy": accuracy}
\`\`\`

## 체크포인트에서 이어서 학습

\`\`\`python
trainer.train(resume_from_checkpoint="./output/checkpoint-500")
\`\`\`

## 다음 단계

다음 레슨에서는 **PEFT 라이브러리**를 학습합니다.
`,contentEn:`# Using Trainer API

## TrainingArguments

\`\`\`python
from transformers import TrainingArguments
args = TrainingArguments(
    output_dir="./output", num_train_epochs=3,
    per_device_train_batch_size=4, learning_rate=2e-5,
    fp16=True, eval_strategy="steps", eval_steps=100,
)
\`\`\`

## SFTTrainer (TRL)

\`\`\`python
from trl import SFTTrainer, SFTConfig
trainer = SFTTrainer(
    model=model, args=SFTConfig(output_dir="./sft", max_seq_length=2048),
    train_dataset=dataset, tokenizer=tokenizer, peft_config=lora_config,
)
trainer.train()
\`\`\`

## Resume Training

\`\`\`python
trainer.train(resume_from_checkpoint="./output/checkpoint-500")
\`\`\`

## Next Steps

Next lesson covers the **PEFT Library**.
`};export{e as default};
