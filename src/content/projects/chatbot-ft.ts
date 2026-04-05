export default {
  contentKo: `# 챗봇 파인튜닝

## 프로젝트 개요

고객 서비스 챗봇을 위한 LLM 파인튜닝 프로젝트입니다.

## 1단계: 데이터 준비

\`\`\`json
{"messages": [
  {"role": "system", "content": "당신은 친절한 고객 상담사입니다."},
  {"role": "user", "content": "배송 상태를 확인하고 싶어요."},
  {"role": "assistant", "content": "주문번호를 알려주시면 배송 상태를 확인해 드리겠습니다."}
]}
\`\`\`

## 2단계: SFT 학습

\`\`\`python
from trl import SFTTrainer, SFTConfig
from peft import LoraConfig

trainer = SFTTrainer(
    model="meta-llama/Llama-3.2-1B-Instruct",
    args=SFTConfig(output_dir="./chatbot", num_train_epochs=3, max_seq_length=2048),
    train_dataset=chat_dataset,
    peft_config=LoraConfig(r=16, lora_alpha=32, target_modules="all-linear"),
)
trainer.train()
\`\`\`

## 3단계: DPO로 톤 & 안전성 강화

좋은 응답과 나쁜 응답 쌍으로 DPO 학습하여 챗봇의 톤과 안전성을 개선합니다.

## 4단계: 평가 및 배포

- 자동 평가: 응답 적절성, 일관성
- 사람 평가: 유용성, 친절도
- vLLM 또는 Ollama로 배포

## 다음 단계

다음 프로젝트에서는 **코드 어시스턴트**를 만들어봅니다.
`,
  contentEn: `# Chatbot Fine-tuning

## Project Overview

Fine-tune an LLM for customer service chatbot.

## Steps

1. **Data**: Collect multi-turn customer service dialogues
2. **SFT**: Train with SFTTrainer + LoRA
3. **DPO**: Improve tone and safety with preference data
4. **Deploy**: Serve with vLLM or Ollama

## Next Steps

Next project: **Code Assistant**.
`,
};
