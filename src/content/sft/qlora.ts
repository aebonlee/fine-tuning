export default {
  contentKo: `# QLoRA

## QLoRA란?

**QLoRA**는 모델을 **4비트로 양자화**한 뒤 LoRA를 적용하는 기법입니다. 16GB GPU에서 7B 모델 파인튜닝이 가능합니다.

## 핵심 기술
- **NF4 (4-bit NormalFloat)**: 정규분포에 최적화된 양자화
- **이중 양자화**: 양자화 상수도 양자화
- **Paged Optimizers**: GPU 메모리 초과 시 CPU로 페이징

## 코드 예제

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

# 4비트 양자화 설정
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# 양자화된 모델 로드
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-8B",
    quantization_config=bnb_config,
    device_map="auto",
)

model = prepare_model_for_kbit_training(model)

# LoRA 적용
lora_config = LoraConfig(r=16, lora_alpha=32, target_modules="all-linear")
model = get_peft_model(model, lora_config)
\`\`\`

## 메모리 비교

| 방법 | 7B 모델 VRAM |
|------|-------------|
| Full FT (FP16) | ~56GB |
| LoRA (FP16) | ~28GB |
| **QLoRA (4-bit)** | **~8GB** |

## 다음 단계

다음 레슨에서는 **어댑터 튜닝**을 학습합니다.
`,
  contentEn: `# QLoRA

## What is QLoRA?

Applies LoRA on a **4-bit quantized** model. Enables 7B model fine-tuning on 16GB GPUs.

## Key Technologies
- **NF4**: Quantization optimized for normal distributions
- **Double Quantization**: Quantize the quantization constants
- **Paged Optimizers**: Page to CPU on GPU OOM

## Code Example

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-8B",
    quantization_config=bnb_config, device_map="auto",
)
model = prepare_model_for_kbit_training(model)
model = get_peft_model(model, LoraConfig(r=16, lora_alpha=32, target_modules="all-linear"))
\`\`\`

## Memory Comparison

| Method | 7B VRAM |
|--------|---------|
| Full FT | ~56GB |
| LoRA | ~28GB |
| **QLoRA** | **~8GB** |

## Next Steps

Next lesson covers **Adapter Tuning**.
`,
};
