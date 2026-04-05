export default {
  contentKo: `# 번역 모델

## 프로젝트 개요

한영 번역에 특화된 모델을 파인튜닝합니다.

## 데이터셋

- **AI Hub 한영 병렬 코퍼스**: 정부 공개 번역 데이터
- **OPUS**: 오픈소스 병렬 코퍼스
- **커스텀**: 도메인 특화 번역 데이터 (IT, 의료, 법률)

## 데이터 형식

\`\`\`json
{
  "instruction": "다음 한국어를 영어로 번역하세요.",
  "input": "파인튜닝은 사전 학습된 모델을 특정 작업에 맞게 조정하는 기법입니다.",
  "output": "Fine-tuning is a technique for adapting pre-trained models to specific tasks."
}
\`\`\`

## 모델 선택

| 모델 | 특징 |
|------|------|
| mBART-50 | 50개 언어 지원 번역 모델 |
| NLLB | Meta, 200개 언어 지원 |
| LLaMA (Instruct) | 범용 LLM으로 번역 파인튜닝 |

## 파인튜닝

\`\`\`python
from trl import SFTTrainer, SFTConfig

trainer = SFTTrainer(
    model=model,
    args=SFTConfig(output_dir="./translation", num_train_epochs=3, max_seq_length=512),
    train_dataset=translation_dataset,
    peft_config=lora_config,
)
trainer.train()
\`\`\`

## 한국어 번역의 과제

- **존칭 체계**: 반말/존댓말 구분
- **어순 차이**: SOV(한국어) vs SVO(영어)
- **도메인 용어**: 전문 분야별 용어 일관성

## 평가

- **BLEU Score**: 번역 품질의 표준 지표
- **사람 평가**: 자연스러움, 정확성 평가

## 축하합니다! 🎉

모든 레슨을 완료했습니다. 이제 여러분은 AI 파인튜닝의 전 과정을 이해하고 실전에 적용할 수 있는 역량을 갖추게 되었습니다!
`,
  contentEn: `# Translation Model

## Project Overview

Fine-tune a model specialized for Korean-English translation.

## Datasets

AI Hub parallel corpus, OPUS, domain-specific custom data

## Model Options

mBART-50 (50 languages), NLLB (200 languages), LLaMA (instruction fine-tuning)

## Korean Translation Challenges

- Honorific system (formal/informal)
- Word order differences (SOV vs SVO)
- Domain terminology consistency

## Evaluation

BLEU Score, Human evaluation (naturalness, accuracy)

## Congratulations!

You've completed all lessons. You now have the skills to understand and apply the entire AI fine-tuning process!
`,
};
