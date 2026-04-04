export default {
  contentKo: `# GPU 환경 설정

## NVIDIA GPU 요구사항

파인튜닝에는 **CUDA Compute Capability 7.0 이상**의 GPU가 필요합니다.

| GPU | VRAM | 추천 모델 크기 |
|-----|------|--------------|
| RTX 3090/4090 | 24GB | 7B (QLoRA) |
| A100 40GB | 40GB | 13B (QLoRA), 7B (LoRA) |
| A100 80GB | 80GB | 70B (QLoRA), 13B (Full) |
| H100 | 80GB | 70B (LoRA) |

## CUDA & cuDNN 설치

\`\`\`bash
# CUDA 확인
nvidia-smi
nvcc --version

# PyTorch CUDA 확인
python -c "import torch; print(torch.cuda.is_available())"
\`\`\`

## GPU 메모리 관리

\`\`\`python
import torch

# 메모리 확인
print(f"할당: {torch.cuda.memory_allocated()/1e9:.1f}GB")
print(f"예약: {torch.cuda.memory_reserved()/1e9:.1f}GB")

# 캐시 정리
torch.cuda.empty_cache()
\`\`\`

## Mixed Precision (혼합 정밀도)

\`\`\`python
from transformers import TrainingArguments

training_args = TrainingArguments(
    fp16=True,     # FP16 (일반 GPU)
    # bf16=True,   # BF16 (A100, H100)
)
\`\`\`

## 다음 단계

다음 레슨에서는 **클라우드 GPU 활용**을 학습합니다.
`,
  contentEn: `# GPU Environment Setup

## Requirements

Fine-tuning requires NVIDIA GPUs with **CUDA Compute Capability 7.0+**.

| GPU | VRAM | Recommended Model Size |
|-----|------|----------------------|
| RTX 3090/4090 | 24GB | 7B (QLoRA) |
| A100 40GB | 40GB | 13B (QLoRA), 7B (LoRA) |
| A100 80GB | 80GB | 70B (QLoRA) |
| H100 | 80GB | 70B (LoRA) |

## CUDA Verification

\`\`\`bash
nvidia-smi
nvcc --version
python -c "import torch; print(torch.cuda.is_available())"
\`\`\`

## Memory Management

\`\`\`python
import torch
print(f"Allocated: {torch.cuda.memory_allocated()/1e9:.1f}GB")
torch.cuda.empty_cache()
\`\`\`

## Mixed Precision

\`\`\`python
from transformers import TrainingArguments
training_args = TrainingArguments(
    fp16=True,     # For general GPUs
    # bf16=True,   # For A100, H100
)
\`\`\`

## Next Steps

Next lesson covers **Cloud GPU Usage**.
`,
};
