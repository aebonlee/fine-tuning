const e={contentKo:`# 어댑터 튜닝

## 어댑터 튜닝이란?

트랜스포머 레이어 사이에 작은 **보틀넥 레이어**(어댑터)를 삽입하고, 원본 가중치는 동결한 채 어댑터만 학습합니다.

## 구조

\`\`\`
[Self-Attention] → [Adapter ↓ down → ReLU → up ↑] → [Feed-Forward] → [Adapter ↓↑]
                    (d → d/r → d)
\`\`\`

## 특징

| 항목 | 설명 |
|------|------|
| 파라미터 수 | 원본의 1~5% |
| 학습 속도 | Full FT보다 빠름 |
| 태스크 전환 | 어댑터만 교체 |

## LoRA와 비교

- **어댑터**: 순차적 보틀넥 → 추론 시 추가 지연
- **LoRA**: 병렬 저랭크 → 병합 후 추가 지연 없음

## 다음 단계

다음 레슨에서는 **프리픽스 튜닝**을 학습합니다.
`,contentEn:`# Adapter Tuning

## What is Adapter Tuning?

Inserts small **bottleneck layers** (adapters) between transformer layers. Original weights are frozen; only adapters are trained.

## Structure

\`\`\`
[Self-Attention] → [Adapter: down → ReLU → up] → [Feed-Forward] → [Adapter]
\`\`\`

## Features

- Parameters: 1-5% of original
- Faster training than full FT
- Easy task switching by swapping adapters

## vs LoRA

- **Adapters**: Sequential bottleneck → inference latency
- **LoRA**: Parallel low-rank → no overhead after merging

## Next Steps

Next lesson covers **Prefix Tuning**.
`};export{e as default};
