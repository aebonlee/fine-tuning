export default {
  contentKo: `# Unsloth

## Unsloth란?

**Unsloth**는 파인튜닝 속도를 **2~5배 향상**시키고 메모리를 **60% 절감**하는 고속 프레임워크입니다.

## 지원 모델

LLaMA, Mistral, Gemma, Phi, Qwen 등 주요 모델 지원

## 코드 예제

\`\`\`python
from unsloth import FastLanguageModel

# 4비트 모델 로드 (자동 양자화)
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.2-1B-bnb-4bit",
    max_seq_length=2048,
    load_in_4bit=True,
)

# LoRA 적용
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                     "gate_proj", "up_proj", "down_proj"],
)

# SFTTrainer로 학습
from trl import SFTTrainer, SFTConfig
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    args=SFTConfig(output_dir="./output", max_seq_length=2048),
    train_dataset=dataset,
)
trainer.train()
\`\`\`

## Google Colab에서 무료 사용

Unsloth는 Colab 무료 T4 GPU에서도 7B 모델 학습이 가능합니다.

## 다음 단계

다음 레슨에서는 **LLaMA-Factory**를 학습합니다.
`,
  contentEn: `# Unsloth

## What is Unsloth?

**2-5x faster** fine-tuning with **60% less memory**.

## Code Example

\`\`\`python
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    "unsloth/Llama-3.2-1B-bnb-4bit", max_seq_length=2048, load_in_4bit=True,
)
model = FastLanguageModel.get_peft_model(model, r=16, lora_alpha=16,
    target_modules=["q_proj","k_proj","v_proj","o_proj","gate_proj","up_proj","down_proj"])

from trl import SFTTrainer, SFTConfig
trainer = SFTTrainer(model=model, tokenizer=tokenizer,
    args=SFTConfig(output_dir="./output"), train_dataset=dataset)
trainer.train()
\`\`\`

## Next Steps

Next lesson covers **LLaMA-Factory**.
`,
};
