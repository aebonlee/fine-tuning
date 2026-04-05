export default {
  contentKo: `# 감성 분석 모델

## 프로젝트 개요

리뷰 텍스트의 감성(긍정/부정/중립)을 분류하는 모델을 파인튜닝합니다.

## 데이터 준비

\`\`\`json
{"text": "이 제품 정말 좋아요! 배송도 빨랐습니다.", "label": "positive"}
{"text": "품질이 기대에 못 미치네요.", "label": "negative"}
{"text": "그냥 평범한 제품입니다.", "label": "neutral"}
\`\`\`

## 접근 방법

### 방법 1: BERT 분류 파인튜닝

\`\`\`python
from transformers import AutoModelForSequenceClassification, Trainer

model = AutoModelForSequenceClassification.from_pretrained(
    "klue/bert-base", num_labels=3
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    compute_metrics=compute_metrics,
)
trainer.train()
\`\`\`

### 방법 2: LLM 인스트럭션 파인튜닝

\`\`\`
Instruction: 다음 리뷰의 감성을 분류하세요 (positive/negative/neutral)
Input: "이 제품 정말 좋아요!"
Output: positive
\`\`\`

## 평가

- Accuracy, F1 Score (Macro/Weighted)
- Confusion Matrix

## 다음 단계

다음 프로젝트에서는 **번역 모델**을 만들어봅니다.
`,
  contentEn: `# Sentiment Analysis Model

## Project Overview

Fine-tune a model for review sentiment classification (positive/negative/neutral).

## Approaches

### 1. BERT Classification

\`\`\`python
model = AutoModelForSequenceClassification.from_pretrained("bert-base", num_labels=3)
\`\`\`

### 2. LLM Instruction Fine-tuning

\`\`\`
Instruction: Classify sentiment (positive/negative/neutral)
Input: "This product is great!"
Output: positive
\`\`\`

## Evaluation

Accuracy, F1 Score, Confusion Matrix

## Next Steps

Next project: **Translation Model**.
`,
};
