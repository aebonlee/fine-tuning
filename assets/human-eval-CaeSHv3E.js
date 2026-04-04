const e={contentKo:`# 사람 평가

## 왜 사람 평가가 필요한가?

자동 지표(BLEU, ROUGE)로는 측정하기 어려운 **유용성, 자연스러움, 안전성**을 평가합니다.

## 평가 프로토콜

### Likert 스케일 (1-5점)
각 평가 기준별로 1~5점 채점

### 쌍대 비교 (Pairwise Comparison)
두 모델의 응답을 비교하여 더 나은 것을 선택

### Elo 레이팅
체스 레이팅처럼 모델 간 상대적 순위 산정 (Chatbot Arena 방식)

## 평가 기준

- **유용성 (Helpfulness)**: 질문에 얼마나 도움이 되는가
- **정확성 (Accuracy)**: 사실 관계가 정확한가
- **안전성 (Safety)**: 유해한 내용이 없는가
- **자연스러움 (Fluency)**: 문장이 자연스러운가

## 어노테이터 간 일치도

Cohen's Kappa로 평가자 간 일관성을 측정합니다.

## 다음 단계

다음 레슨에서는 **어블레이션 스터디**를 학습합니다.
`,contentEn:`# Human Evaluation

## Why Human Evaluation?

Measures helpfulness, naturalness, and safety that automated metrics can't capture.

## Protocols

- **Likert Scale**: 1-5 point scoring per criterion
- **Pairwise Comparison**: Choose better response between two models
- **Elo Rating**: Relative model ranking (Chatbot Arena style)

## Evaluation Criteria

Helpfulness, Accuracy, Safety, Fluency

## Inter-Annotator Agreement

Measure consistency with Cohen's Kappa.

## Next Steps

Next lesson covers **Ablation Study**.
`};export{e as default};
