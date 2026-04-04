const e={contentKo:`# 사전학습 vs 파인튜닝

## 사전학습 (Pre-training)

대규모 비라벨 데이터로 언어의 일반적 패턴을 학습하는 과정입니다.

### 사전학습 목표
- **CLM (Causal Language Modeling)**: 다음 토큰 예측 (GPT 계열)
- **MLM (Masked Language Modeling)**: 마스크된 토큰 예측 (BERT 계열)

### 사전학습 규모
| 항목 | 규모 |
|------|------|
| 데이터 | 수조 토큰 (인터넷 전체) |
| GPU | 수백~수천 대 |
| 비용 | 수십억 원 이상 |
| 기간 | 수주~수개월 |

## 파인튜닝 (Fine-tuning)

사전 학습된 모델을 특정 태스크/도메인에 적응시키는 과정입니다.

### 파인튜닝 규모
| 항목 | 규모 |
|------|------|
| 데이터 | 수백~수만 개 |
| GPU | 1~8대 |
| 비용 | 수만~수백만 원 |
| 기간 | 수시간~수일 |

## 언제 파인튜닝하나?

- 특정 도메인 전문화가 필요할 때 (의료, 법률, 금융)
- 프롬프트 엔지니어링만으로 충분한 성능이 안 나올 때
- 일관된 출력 형식이 필요할 때
- 응답 지연시간(latency) 절감이 필요할 때

## 전이학습의 위치

\`\`\`
[대규모 사전학습] → [도메인 적응 사전학습] → [파인튜닝] → [RLHF 정렬]
                    (선택적)                  (핵심)        (선택적)
\`\`\`

## 다음 단계

다음 카테고리에서는 **Python 환경 설정**을 학습합니다.
`,contentEn:`# Pre-training vs Fine-tuning

## Pre-training

Learning general language patterns from large-scale unlabeled data.

### Objectives
- **CLM (Causal LM)**: Next token prediction (GPT family)
- **MLM (Masked LM)**: Masked token prediction (BERT family)

### Scale
| Aspect | Scale |
|--------|-------|
| Data | Trillions of tokens |
| GPUs | Hundreds to thousands |
| Cost | Millions of dollars |
| Duration | Weeks to months |

## Fine-tuning

Adapting a pre-trained model to specific tasks/domains.

### Scale
| Aspect | Scale |
|--------|-------|
| Data | Hundreds to tens of thousands |
| GPUs | 1-8 |
| Cost | Hundreds to thousands of dollars |
| Duration | Hours to days |

## When to Fine-tune?

- Domain specialization needed (medical, legal, finance)
- Prompt engineering doesn't achieve sufficient performance
- Consistent output format required
- Need to reduce response latency

## Transfer Learning Pipeline

\`\`\`
[Large Pre-training] → [Domain Adaptation] → [Fine-tuning] → [RLHF Alignment]
                        (optional)            (core)           (optional)
\`\`\`

## Next Steps

Next category covers **Python Environment Setup**.
`};export{e as default};
