const e={contentKo:`# RLHF 개요

## RLHF란?

**RLHF (Reinforcement Learning from Human Feedback)**는 인간의 선호도를 반영하여 모델을 정렬(Alignment)하는 기법입니다. ChatGPT, Claude 등의 핵심 학습 방법론입니다.

## RLHF 파이프라인

\`\`\`
1. SFT (지도학습 파인튜닝)
   └→ 인스트럭션 데이터로 기본 능력 학습

2. 보상 모델 (Reward Model) 학습
   └→ 인간 선호도 데이터로 보상 함수 학습

3. RL 최적화 (PPO)
   └→ 보상 모델을 기준으로 정책 최적화
\`\`\`

## 왜 RLHF가 필요한가?

- **유용성(Helpfulness)**: 사용자 질문에 도움이 되는 응답
- **안전성(Harmlessness)**: 유해한 콘텐츠 생성 방지
- **정직성(Honesty)**: 모르는 것은 모른다고 답변

## InstructGPT 논문

OpenAI의 InstructGPT가 RLHF를 대중화했습니다.
- 1.3B 모델(RLHF) > 175B 모델(SFT만) 성능 달성
- 인간 평가에서 압도적 선호

## 다음 단계

다음 레슨에서는 **보상 모델 학습**을 다룹니다.
`,contentEn:`# RLHF Overview

## What is RLHF?

**RLHF** aligns models with human preferences. Core methodology behind ChatGPT and Claude.

## Pipeline

\`\`\`
1. SFT → Learn basic abilities from instruction data
2. Reward Model → Learn reward function from human preferences
3. RL (PPO) → Optimize policy using reward model
\`\`\`

## Why RLHF?

- **Helpfulness**: Useful responses to user queries
- **Harmlessness**: Prevent harmful content
- **Honesty**: Acknowledge uncertainty

## Next Steps

Next lesson covers **Reward Model Training**.
`};export{e as default};
