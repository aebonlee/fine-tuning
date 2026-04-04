export default {
  contentKo: `# LLaMA 파인튜닝

## LLaMA 모델 계보

| 모델 | 크기 | 특징 |
|------|------|------|
| LLaMA 2 | 7B/13B/70B | 오픈소스, 상업 가능 |
| LLaMA 3 | 8B/70B | 향상된 학습 데이터 |
| LLaMA 3.1 | 8B/70B/405B | 128K 컨텍스트 |
| LLaMA 3.2 | 1B/3B/11B/90B | 경량 + 멀티모달 |

## QLoRA 파인튜닝 예제

\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig
from trl import SFTTrainer, SFTConfig
import torch

model_id = "meta-llama/Llama-3.2-3B"

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
)

model = AutoModelForCausalLM.from_pretrained(model_id, quantization_config=bnb_config)
tokenizer = AutoTokenizer.from_pretrained(model_id)
tokenizer.pad_token = tokenizer.eos_token

lora_config = LoraConfig(r=16, lora_alpha=32, target_modules="all-linear")

trainer = SFTTrainer(
    model=model, tokenizer=tokenizer,
    args=SFTConfig(output_dir="./llama-ft", num_train_epochs=3, max_seq_length=2048),
    train_dataset=dataset,
    peft_config=lora_config,
)
trainer.train()
\`\`\`

## 크기별 VRAM 요구량 (QLoRA)

- 1B: ~4GB / 3B: ~6GB / 8B: ~10GB / 70B: ~48GB

## 다음 단계

다음 레슨에서는 **Gemma 파인튜닝**을 학습합니다.
`,
  contentEn: `# LLaMA Fine-tuning

## LLaMA Model Family

| Model | Sizes | Features |
|-------|-------|---------|
| LLaMA 3.2 | 1B/3B/11B/90B | Lightweight + multimodal |
| LLaMA 3.1 | 8B/70B/405B | 128K context |

## QLoRA Example

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from trl import SFTTrainer, SFTConfig

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-3B",
    quantization_config=BitsAndBytesConfig(load_in_4bit=True))

trainer = SFTTrainer(model=model, tokenizer=tokenizer,
    args=SFTConfig(output_dir="./llama-ft"), train_dataset=dataset,
    peft_config=LoraConfig(r=16, lora_alpha=32, target_modules="all-linear"))
trainer.train()
\`\`\`

## Next Steps

Next lesson covers **Gemma Fine-tuning**.
`,
};
