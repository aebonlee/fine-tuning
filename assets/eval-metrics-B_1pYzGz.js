const e={contentKo:`# 평가 지표

## 주요 평가 지표

### Perplexity (혼란도)
모델이 텍스트를 얼마나 잘 예측하는지 측정합니다. **낮을수록 좋습니다.**

\`\`\`python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("./my-model")
tokenizer = AutoTokenizer.from_pretrained("./my-model")

inputs = tokenizer("테스트 문장입니다.", return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs, labels=inputs["input_ids"])
    perplexity = torch.exp(outputs.loss)
print(f"Perplexity: {perplexity:.2f}")
\`\`\`

### BLEU Score
생성 텍스트와 참조 텍스트의 n-gram 일치도를 측정합니다.

### ROUGE Score
요약 품질 평가: ROUGE-1 (유니그램), ROUGE-2 (바이그램), ROUGE-L (최장 공통 부분 수열)

### BERTScore
BERT 임베딩을 활용한 의미적 유사도 측정

## 태스크별 지표

| 태스크 | 주요 지표 |
|--------|----------|
| 텍스트 생성 | Perplexity, BLEU |
| 요약 | ROUGE |
| 분류 | Accuracy, F1 |
| QA | Exact Match, F1 |

## 다음 단계

다음 레슨에서는 **벤치마크 테스트**를 학습합니다.
`,contentEn:`# Evaluation Metrics

## Key Metrics

- **Perplexity**: How well model predicts text (lower = better)
- **BLEU**: N-gram overlap with reference text
- **ROUGE**: Summary quality (ROUGE-1, ROUGE-2, ROUGE-L)
- **BERTScore**: Semantic similarity using BERT embeddings

## Task-Specific Metrics

| Task | Metrics |
|------|---------|
| Generation | Perplexity, BLEU |
| Summarization | ROUGE |
| Classification | Accuracy, F1 |
| QA | Exact Match, F1 |

## Next Steps

Next lesson covers **Benchmark Testing**.
`};export{e as default};
