export default {
  contentKo: `# LLaMA-Factory

## LLaMA-Factory란?

**LLaMA-Factory**는 **WebUI**로 손쉽게 100개 이상의 모델을 파인튜닝할 수 있는 통합 프레임워크입니다.

## 설치 및 실행

\`\`\`bash
git clone https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory && pip install -e ".[torch,metrics]"

# WebUI 실행
llamafactory-cli webui
\`\`\`

## 지원 기능

- SFT, RLHF, DPO, PPO 학습
- LoRA, QLoRA, Full Fine-tuning
- 100+ 모델 지원
- 데이터셋 관리 UI
- 평가 및 추론 UI

## CLI 사용

\`\`\`bash
llamafactory-cli train \\
    --model_name_or_path meta-llama/Llama-3.2-1B \\
    --dataset alpaca_ko \\
    --finetuning_type lora \\
    --output_dir ./output \\
    --num_train_epochs 3
\`\`\`

## 다음 단계

다음 레슨에서는 **DeepSpeed**를 학습합니다.
`,
  contentEn: `# LLaMA-Factory

## What is LLaMA-Factory?

**WebUI-based** framework for fine-tuning 100+ models easily.

## Setup

\`\`\`bash
git clone https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory && pip install -e ".[torch,metrics]"
llamafactory-cli webui
\`\`\`

## Features

- SFT, RLHF, DPO, PPO training
- LoRA, QLoRA, Full FT
- Dataset management UI
- Evaluation and inference UI

## Next Steps

Next lesson covers **DeepSpeed**.
`,
};
