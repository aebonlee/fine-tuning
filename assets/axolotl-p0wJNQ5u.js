const a={contentKo:`# Axolotl

## Axolotl이란?

**Axolotl**은 YAML 설정 파일 하나로 다양한 모델을 파인튜닝할 수 있는 프레임워크입니다.

## 설치

\`\`\`bash
git clone https://github.com/OpenAccess-AI-Collective/axolotl
cd axolotl && pip install -e ".[flash-attn,deepspeed]"
\`\`\`

## YAML 설정 예제

\`\`\`yaml
base_model: meta-llama/Llama-3.2-1B
model_type: LlamaForCausalLM

load_in_4bit: true
adapter: qlora
lora_r: 16
lora_alpha: 32
lora_target_modules: [q_proj, v_proj, k_proj, o_proj]

datasets:
  - path: tatsu-lab/alpaca
    type: alpaca

sequence_len: 2048
micro_batch_size: 4
gradient_accumulation_steps: 4
num_epochs: 3
learning_rate: 2e-4
optimizer: adamw_bnb_8bit
\`\`\`

## 학습 실행

\`\`\`bash
accelerate launch -m axolotl.cli.train config.yaml
\`\`\`

## 다음 단계

다음 레슨에서는 **Unsloth**를 학습합니다.
`,contentEn:`# Axolotl

## What is Axolotl?

YAML config-based fine-tuning framework supporting various models and methods.

## YAML Config Example

\`\`\`yaml
base_model: meta-llama/Llama-3.2-1B
adapter: qlora
lora_r: 16
datasets:
  - path: tatsu-lab/alpaca
    type: alpaca
num_epochs: 3
\`\`\`

## Run Training

\`\`\`bash
accelerate launch -m axolotl.cli.train config.yaml
\`\`\`

## Next Steps

Next lesson covers **Unsloth**.
`};export{a as default};
