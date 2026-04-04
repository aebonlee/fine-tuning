const e={contentKo:`# 벤치마크 테스트

## 주요 벤치마크

| 벤치마크 | 측정 영역 | 태스크 수 |
|----------|----------|----------|
| MMLU | 세계 지식 | 57 과목 |
| HellaSwag | 상식 추론 | 10K |
| ARC | 과학 추론 | 7.7K |
| TruthfulQA | 진실성 | 817 |
| GSM8K | 수학 | 8.5K |
| HumanEval | 코드 생성 | 164 |
| MT-Bench | 대화 능력 | 80 |

## lm-evaluation-harness

\`\`\`bash
pip install lm-eval

# MMLU 벤치마크 실행
lm_eval --model hf \\
    --model_args pretrained=./my-model \\
    --tasks mmlu \\
    --batch_size 4

# 여러 벤치마크 동시 실행
lm_eval --model hf \\
    --model_args pretrained=./my-model \\
    --tasks mmlu,hellaswag,arc_easy \\
    --batch_size 4
\`\`\`

## Open LLM Leaderboard

HuggingFace에서 운영하는 모델 순위표로, 주요 벤치마크 점수를 비교할 수 있습니다.

## 다음 단계

다음 레슨에서는 **사람 평가**를 학습합니다.
`,contentEn:`# Benchmark Testing

## Key Benchmarks

MMLU (knowledge), HellaSwag (commonsense), ARC (science), GSM8K (math), HumanEval (code), MT-Bench (dialogue)

## lm-evaluation-harness

\`\`\`bash
pip install lm-eval
lm_eval --model hf --model_args pretrained=./my-model --tasks mmlu,hellaswag --batch_size 4
\`\`\`

## Open LLM Leaderboard

HuggingFace's model ranking board comparing benchmark scores.

## Next Steps

Next lesson covers **Human Evaluation**.
`};export{e as default};
