const a={contentKo:`# HuggingFace Datasets

## datasets 라이브러리

\`\`\`python
from datasets import load_dataset

# 데이터셋 로드
dataset = load_dataset("tatsu-lab/alpaca")
print(dataset)
print(dataset["train"][0])

# 스트리밍 모드 (대용량 데이터셋)
dataset = load_dataset("cerebras/SlimPajama-627B", streaming=True)
\`\`\`

## 인기 파인튜닝 데이터셋

| 데이터셋 | 크기 | 용도 |
|----------|------|------|
| tatsu-lab/alpaca | 52K | 인스트럭션 팔로잉 |
| Open-Orca/OpenOrca | 4.2M | 다양한 태스크 |
| HuggingFaceH4/ultrachat_200k | 200K | 대화형 |
| argilla/dpo-mix-7k | 7K | DPO 학습 |

## 데이터 전처리

\`\`\`python
def formatting_func(example):
    return f"### Instruction:\\n{example['instruction']}\\n\\n### Response:\\n{example['output']}"

dataset = dataset.map(lambda x: {"text": formatting_func(x)})
dataset = dataset.filter(lambda x: len(x["text"]) < 2048)
\`\`\`

## Hub에 업로드

\`\`\`python
dataset.push_to_hub("my-username/my-dataset", private=True)
\`\`\`

## 다음 단계

다음 레슨에서는 **Kaggle 데이터셋**을 학습합니다.
`,contentEn:`# HuggingFace Datasets

## datasets Library

\`\`\`python
from datasets import load_dataset
dataset = load_dataset("tatsu-lab/alpaca")
print(dataset["train"][0])

# Streaming for large datasets
dataset = load_dataset("cerebras/SlimPajama-627B", streaming=True)
\`\`\`

## Popular Fine-tuning Datasets

| Dataset | Size | Purpose |
|---------|------|---------|
| tatsu-lab/alpaca | 52K | Instruction following |
| Open-Orca/OpenOrca | 4.2M | Multi-task |
| HuggingFaceH4/ultrachat_200k | 200K | Conversational |

## Preprocessing

\`\`\`python
dataset = dataset.map(lambda x: {"text": format_prompt(x)})
dataset = dataset.filter(lambda x: len(x["text"]) < 2048)
\`\`\`

## Next Steps

Next lesson covers **Kaggle Datasets**.
`};export{a as default};
