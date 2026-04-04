const e={contentKo:`# DeepSpeed

## DeepSpeed란?

Microsoft에서 개발한 **대규모 분산 학습 최적화** 라이브러리입니다.

## ZeRO 최적화

| Stage | 분산 대상 | 메모리 절감 |
|-------|----------|-----------|
| Stage 1 | 옵티마이저 상태 | ~4배 |
| Stage 2 | + 그래디언트 | ~8배 |
| Stage 3 | + 모델 파라미터 | ~N배 (GPU 수) |

## ZeRO-Offload

GPU 메모리가 부족할 때 CPU/NVMe로 오프로드합니다.

## HuggingFace 연동

\`\`\`python
from transformers import TrainingArguments

args = TrainingArguments(
    output_dir="./output",
    deepspeed="ds_config.json",  # DeepSpeed 설정 파일
    per_device_train_batch_size=4,
    fp16=True,
)
\`\`\`

## ds_config.json 예제

\`\`\`json
{
  "zero_optimization": {
    "stage": 2,
    "offload_optimizer": {"device": "cpu"}
  },
  "fp16": {"enabled": true},
  "train_batch_size": "auto",
  "gradient_accumulation_steps": "auto"
}
\`\`\`

## 실행

\`\`\`bash
deepspeed --num_gpus=4 train.py --deepspeed ds_config.json
\`\`\`

## 다음 단계

다음 카테고리에서는 **주요 모델 파인튜닝**을 학습합니다.
`,contentEn:`# DeepSpeed

## What is DeepSpeed?

Microsoft's library for **large-scale distributed training optimization**.

## ZeRO Optimization

| Stage | Distributes | Memory Savings |
|-------|-----------|---------------|
| Stage 1 | Optimizer states | ~4x |
| Stage 2 | + Gradients | ~8x |
| Stage 3 | + Parameters | ~Nx |

## HuggingFace Integration

\`\`\`python
args = TrainingArguments(output_dir="./output", deepspeed="ds_config.json", fp16=True)
\`\`\`

## Run

\`\`\`bash
deepspeed --num_gpus=4 train.py --deepspeed ds_config.json
\`\`\`

## Next Steps

Next category covers **Key Model Fine-tuning**.
`};export{e as default};
