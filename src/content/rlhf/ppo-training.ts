export default {
  contentKo: `# PPO 학습

## PPO란?

**PPO (Proximal Policy Optimization)**는 RLHF에서 정책(모델)을 최적화하는 강화학습 알고리즘입니다.

## RLHF에서의 PPO

\`\`\`
보상 = reward_model(응답) - β × KL(현재 정책 || 참조 정책)
\`\`\`

- **reward_model**: 응답 품질 점수
- **KL 패널티**: 원본 모델에서 너무 벗어나지 않도록 제한

## TRL PPOTrainer 예제

\`\`\`python
from trl import PPOTrainer, PPOConfig

ppo_config = PPOConfig(
    learning_rate=1e-5,
    batch_size=16,
    mini_batch_size=4,
    ppo_epochs=4,
    kl_penalty="kl",      # KL 발산 패널티
    init_kl_coef=0.2,     # KL 계수
)

ppo_trainer = PPOTrainer(
    config=ppo_config,
    model=model,
    ref_model=ref_model,
    tokenizer=tokenizer,
)
\`\`\`

## PPO의 한계

- 구현이 복잡하고 하이퍼파라미터에 민감
- 보상 모델, 참조 모델, 정책 모델, 가치 모델 → 4개 모델 필요
- DPO가 더 간단한 대안으로 떠오름

## 다음 단계

다음 레슨에서는 PPO의 대안인 **DPO**를 학습합니다.
`,
  contentEn: `# PPO Training

## What is PPO?

**PPO (Proximal Policy Optimization)** is the RL algorithm that optimizes the policy (model) in RLHF.

## PPO in RLHF

\`\`\`
Reward = reward_model(response) - β × KL(current || reference)
\`\`\`

## TRL PPOTrainer

\`\`\`python
from trl import PPOTrainer, PPOConfig
ppo_config = PPOConfig(
    learning_rate=1e-5, batch_size=16,
    ppo_epochs=4, init_kl_coef=0.2,
)
ppo_trainer = PPOTrainer(
    config=ppo_config, model=model,
    ref_model=ref_model, tokenizer=tokenizer,
)
\`\`\`

## Limitations

- Complex implementation, sensitive hyperparameters
- Requires 4 models (reward, reference, policy, value)
- DPO emerging as simpler alternative

## Next Steps

Next lesson covers **DPO** as a simpler alternative.
`,
};
