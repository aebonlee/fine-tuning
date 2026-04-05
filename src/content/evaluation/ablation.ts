export default {
  contentKo: `# 어블레이션 스터디

## 어블레이션 스터디란?

모델의 각 구성 요소를 체계적으로 제거하거나 변경하여 **각 요소의 기여도**를 분석하는 실험입니다.

## 파인튜닝에서의 하이퍼파라미터 튜닝

### 주요 실험 변수

| 변수 | 일반적 범위 |
|------|-----------|
| Learning Rate | 1e-5 ~ 5e-4 |
| Batch Size | 4, 8, 16, 32 |
| Epochs | 1, 2, 3, 5 |
| LoRA Rank | 4, 8, 16, 32, 64 |
| LoRA Alpha | rank의 1~2배 |

### 실험 예시

\`\`\`python
experiments = [
    {"lr": 1e-5, "r": 8,  "epochs": 3},
    {"lr": 2e-5, "r": 16, "epochs": 3},
    {"lr": 5e-5, "r": 32, "epochs": 3},
    {"lr": 2e-5, "r": 16, "epochs": 1},
    {"lr": 2e-5, "r": 16, "epochs": 5},
]

for exp in experiments:
    result = train_and_evaluate(**exp)
    log_result(exp, result)
\`\`\`

## 자동 하이퍼파라미터 탐색

- **Optuna**: 베이지안 최적화
- **Ray Tune**: 분산 하이퍼파라미터 탐색

## 재현성

- 시드 고정 (\`seed=42\`)
- 환경, 라이브러리 버전 기록
- 실험 결과 체계적 저장

## 다음 단계

다음 카테고리에서는 **모델 배포**를 학습합니다.
`,
  contentEn: `# Ablation Study

## What is an Ablation Study?

Systematically removing or changing components to analyze **each element's contribution**.

## Key Variables

| Variable | Typical Range |
|----------|--------------|
| Learning Rate | 1e-5 to 5e-4 |
| LoRA Rank | 4, 8, 16, 32, 64 |
| Epochs | 1, 2, 3, 5 |

## Automated Search

- **Optuna**: Bayesian optimization
- **Ray Tune**: Distributed hyperparameter search

## Reproducibility

Fix seeds, record environment versions, systematically log results.

## Next Steps

Next category covers **Model Deployment**.
`,
};
