const e={contentKo:`# Gemma 파인튜닝

## Gemma 모델

Google에서 개발한 경량 오픈 모델입니다.

| 모델 | 크기 | 특징 |
|------|------|------|
| Gemma 2B | 2B | 초경량, 엣지 디바이스 |
| Gemma 7B | 7B | 범용, 고성능 |
| Gemma 2 | 2B/9B/27B | 2세대, 성능 향상 |

## 파인튜닝 코드

\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig
from trl import SFTTrainer, SFTConfig

model = AutoModelForCausalLM.from_pretrained(
    "google/gemma-2-2b",
    torch_dtype=torch.float16,
    device_map="auto",
)
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-2b")

trainer = SFTTrainer(
    model=model, tokenizer=tokenizer,
    args=SFTConfig(output_dir="./gemma-ft", max_seq_length=2048),
    train_dataset=dataset,
    peft_config=LoraConfig(r=16, lora_alpha=32, target_modules="all-linear"),
)
trainer.train()
\`\`\`

## 다음 단계

다음 레슨에서는 **Mistral 파인튜닝**을 학습합니다.
`,contentEn:`# Gemma Fine-tuning

## Gemma Models

Google's lightweight open models: Gemma 2B/7B, Gemma 2 (2B/9B/27B).

## Fine-tuning Code

\`\`\`python
model = AutoModelForCausalLM.from_pretrained("google/gemma-2-2b", torch_dtype=torch.float16)
trainer = SFTTrainer(model=model, tokenizer=tokenizer,
    args=SFTConfig(output_dir="./gemma-ft"), train_dataset=dataset,
    peft_config=LoraConfig(r=16, target_modules="all-linear"))
trainer.train()
\`\`\`

## Next Steps

Next lesson covers **Mistral Fine-tuning**.
`};export{e as default};
