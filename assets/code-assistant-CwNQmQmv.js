const e={contentKo:`# 코드 어시스턴트

## 프로젝트 개요

코드 생성 및 설명에 특화된 LLM을 파인튜닝합니다.

## 데이터셋

- **CodeAlpaca**: 코드 인스트럭션 데이터 20K
- **CodeFeedback**: 코드 피드백 데이터
- **커스텀**: 사내 코딩 컨벤션 반영 데이터

## 베이스 모델 선택

| 모델 | 크기 | 특징 |
|------|------|------|
| CodeLlama | 7B/13B/34B | 코드 특화 LLaMA |
| DeepSeek-Coder | 1.3B~33B | 코드 생성 최적화 |
| StarCoder 2 | 3B/7B/15B | BigCode 프로젝트 |

## 파인튜닝

\`\`\`python
# 코드 인스트럭션 형식
format_prompt = lambda x: f"""### Instruction:
{x['instruction']}

### Code:
{x['output']}"""

trainer = SFTTrainer(
    model="codellama/CodeLlama-7b-hf",
    args=SFTConfig(output_dir="./code-assistant", max_seq_length=4096),
    train_dataset=code_dataset,
    peft_config=LoraConfig(r=16, target_modules="all-linear"),
)
\`\`\`

## 평가

- **HumanEval**: pass@k 지표
- 실제 코딩 문제로 테스트

## 다음 단계

다음 프로젝트에서는 **문서 QA 시스템**을 만들어봅니다.
`,contentEn:`# Code Assistant

## Project Overview

Fine-tune an LLM specialized for code generation and explanation.

## Base Models

CodeLlama, DeepSeek-Coder, StarCoder 2

## Evaluation

HumanEval (pass@k metric), real coding problem tests

## Next Steps

Next project: **Document QA System**.
`};export{e as default};
