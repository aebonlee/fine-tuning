const e={contentKo:`# 프리픽스 튜닝

## 프리픽스 튜닝이란?

모델 입력 앞에 **학습 가능한 가상 토큰(프리픽스)**를 추가하여 모델의 행동을 조절하는 기법입니다.

## 핵심 개념

\`\`\`
일반 입력:    [토큰1] [토큰2] [토큰3] ...
프리픽스 추가: [P1] [P2] ... [Pk] [토큰1] [토큰2] [토큰3] ...
              └─학습 가능─┘    └──── 동결 ────┘
\`\`\`

## PEFT에서 사용

\`\`\`python
from peft import PrefixTuningConfig, get_peft_model

config = PrefixTuningConfig(
    task_type="CAUSAL_LM",
    num_virtual_tokens=20,  # 프리픽스 길이
)
model = get_peft_model(model, config)
\`\`\`

## PEFT 방법 비교

| 방법 | 파라미터 | 추론 속도 | 성능 |
|------|---------|----------|------|
| Full FT | 100% | 기준 | 최고 |
| LoRA | 0.1~1% | 동일 (병합 후) | 높음 |
| QLoRA | 0.1~1% | 동일 | 높음 |
| Adapter | 1~5% | 약간 느림 | 높음 |
| Prefix | <1% | 약간 느림 | 보통 |

## 다음 단계

다음 카테고리에서는 **RLHF & 정렬**을 학습합니다.
`,contentEn:`# Prefix Tuning

## What is Prefix Tuning?

Adds **learnable virtual tokens (prefixes)** before model input to control behavior.

\`\`\`
Normal:  [token1] [token2] ...
Prefix:  [P1] [P2]...[Pk] [token1] [token2] ...
         └─trainable─┘    └──frozen──┘
\`\`\`

## Usage with PEFT

\`\`\`python
from peft import PrefixTuningConfig, get_peft_model
config = PrefixTuningConfig(task_type="CAUSAL_LM", num_virtual_tokens=20)
model = get_peft_model(model, config)
\`\`\`

## PEFT Methods Comparison

| Method | Params | Inference | Performance |
|--------|--------|-----------|-------------|
| Full FT | 100% | Baseline | Best |
| LoRA | 0.1-1% | Same | High |
| QLoRA | 0.1-1% | Same | High |
| Prefix | <1% | Slightly slower | Moderate |

## Next Steps

Next category covers **RLHF & Alignment**.
`};export{e as default};
