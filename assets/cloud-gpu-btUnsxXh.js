const o={contentKo:`# 클라우드 GPU 활용

## 클라우드 GPU 비교

| 플랫폼 | GPU | 무료 | 비용 (시간당) |
|--------|-----|------|-------------|
| Google Colab | T4/A100 | 제한적 무료 | Pro $10/월 |
| Kaggle | T4×2 | 30시간/주 | 무료 |
| RunPod | A100/H100 | 없음 | $1.0~$3.5 |
| Lambda Labs | A100/H100 | 없음 | $1.1~$2.5 |
| AWS | p4d/g5 | 없음 | $3~$32 |

## Google Colab 활용

\`\`\`python
# Colab에서 패키지 설치
!pip install -q transformers datasets peft trl bitsandbytes accelerate

# GPU 확인
!nvidia-smi

# Google Drive 마운트 (데이터/모델 저장)
from google.colab import drive
drive.mount('/content/drive')
\`\`\`

## RunPod / Lambda Labs

고성능 GPU를 저렴하게 사용할 수 있는 클라우드 서비스입니다.
- SSH 접속으로 로컬처럼 사용
- Docker 기반 환경 제공
- Spot 인스턴스로 비용 절감 가능

## 모델 크기별 GPU 선택 가이드

| 모델 크기 | QLoRA | LoRA | Full FT |
|-----------|-------|------|---------|
| 1B~3B | T4 16GB | RTX 3090 24GB | A100 40GB |
| 7B~8B | RTX 3090 24GB | A100 40GB | A100 80GB×2 |
| 13B | A100 40GB | A100 80GB | A100 80GB×4 |
| 70B | A100 80GB | A100 80GB×4 | A100 80GB×16 |

## 다음 단계

다음 카테고리에서는 **데이터 준비**를 학습합니다.
`,contentEn:`# Cloud GPU Usage

## Comparison

| Platform | GPU | Free Tier | Cost/hour |
|----------|-----|-----------|-----------|
| Google Colab | T4/A100 | Limited | Pro $10/mo |
| Kaggle | T4×2 | 30hr/week | Free |
| RunPod | A100/H100 | None | $1.0-$3.5 |
| Lambda Labs | A100/H100 | None | $1.1-$2.5 |

## Google Colab

\`\`\`python
!pip install -q transformers datasets peft trl bitsandbytes accelerate
!nvidia-smi

from google.colab import drive
drive.mount('/content/drive')
\`\`\`

## GPU Selection Guide

| Model Size | QLoRA | LoRA | Full FT |
|-----------|-------|------|---------|
| 1B-3B | T4 16GB | RTX 3090 | A100 40GB |
| 7B-8B | RTX 3090 | A100 40GB | A100 80GB×2 |
| 70B | A100 80GB | A100 80GB×4 | A100 80GB×16 |

## Next Steps

Next category covers **Data Preparation**.
`};export{o as default};
