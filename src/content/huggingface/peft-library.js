export default {
  contentKo: `# PEFT 라이브러리

## PEFT란?

**PEFT (Parameter-Efficient Fine-Tuning)** 라이브러리는 HuggingFace에서 개발한 효율적 파인튜닝 도구입니다.

## 지원 방법

| 방법 | 설명 |
|------|------|
| LoRA | 저랭크 적응 |
| QLoRA | 양자화 + LoRA |
| AdaLoRA | 적응형 랭크 할당 |
| IA3 | 활성값 스케일링 |
| Prefix Tuning | 가상 프리픽스 |

## 사용법

\`\`\`python
from peft import LoraConfig, get_peft_model, PeftModel

# 1. 설정 및 적용
config = LoraConfig(r=16, lora_alpha=32, target_modules="all-linear")
peft_model = get_peft_model(base_model, config)

# 2. 학습 후 저장
peft_model.save_pretrained("./my-lora-adapter")

# 3. 로드
loaded = PeftModel.from_pretrained(base_model, "./my-lora-adapter")

# 4. 병합
merged = loaded.merge_and_unload()
\`\`\`

## 멀티 어댑터

\`\`\`python
model.load_adapter("./adapter-A", adapter_name="task_a")
model.load_adapter("./adapter-B", adapter_name="task_b")
model.set_adapter("task_a")  # 어댑터 전환
\`\`\`

## 다음 단계

다음 레슨에서는 **TRL 라이브러리**를 학습합니다.
`,
  contentEn: `# PEFT Library

## Supported Methods

LoRA, QLoRA, AdaLoRA, IA3, Prefix Tuning, and more.

## Usage

\`\`\`python
from peft import LoraConfig, get_peft_model, PeftModel

config = LoraConfig(r=16, lora_alpha=32, target_modules="all-linear")
peft_model = get_peft_model(base_model, config)

# Save & Load
peft_model.save_pretrained("./my-adapter")
loaded = PeftModel.from_pretrained(base_model, "./my-adapter")
merged = loaded.merge_and_unload()
\`\`\`

## Multi-Adapter

\`\`\`python
model.load_adapter("./adapter-A", adapter_name="task_a")
model.set_adapter("task_a")
\`\`\`

## Next Steps

Next lesson covers the **TRL Library**.
`,
};
