export default {
  contentKo: `# Python & Conda 설치

## Python 설치

파인튜닝에는 **Python 3.10 이상**을 권장합니다.

### Miniconda 설치 (권장)

\`\`\`bash
# Linux/macOS
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# 가상환경 생성
conda create -n finetuning python=3.11
conda activate finetuning
\`\`\`

## 필수 패키지 설치

\`\`\`bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers datasets peft accelerate bitsandbytes
pip install trl wandb tensorboard
\`\`\`

## requirements.txt 관리

\`\`\`bash
pip freeze > requirements.txt
pip install -r requirements.txt
\`\`\`

## 설치 확인

\`\`\`python
import torch
print(f"PyTorch: {torch.__version__}")
print(f"CUDA: {torch.cuda.is_available()}")

import transformers
print(f"Transformers: {transformers.__version__}")
\`\`\`

## 다음 단계

다음 레슨에서는 **Jupyter Notebook 설정**을 학습합니다.
`,
  contentEn: `# Python & Conda Installation

## Python Installation

**Python 3.10+** is recommended for fine-tuning.

### Install Miniconda (Recommended)

\`\`\`bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

conda create -n finetuning python=3.11
conda activate finetuning
\`\`\`

## Essential Packages

\`\`\`bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers datasets peft accelerate bitsandbytes
pip install trl wandb tensorboard
\`\`\`

## Verify Installation

\`\`\`python
import torch
print(f"PyTorch: {torch.__version__}")
print(f"CUDA: {torch.cuda.is_available()}")

import transformers
print(f"Transformers: {transformers.__version__}")
\`\`\`

## Next Steps

Next lesson covers **Jupyter Notebook Setup**.
`,
};
