export default {
  contentKo: `# 데이터 포맷팅

## 주요 데이터 형식

### Alpaca 형식
\`\`\`json
{
  "instruction": "한국의 수도는 어디인가요?",
  "input": "",
  "output": "한국의 수도는 서울입니다."
}
\`\`\`

### ShareGPT 형식 (대화)
\`\`\`json
{
  "conversations": [
    {"from": "human", "value": "파인튜닝이 뭔가요?"},
    {"from": "gpt", "value": "파인튜닝은 사전 학습된 모델을..."}
  ]
}
\`\`\`

### ChatML 형식
\`\`\`json
{
  "messages": [
    {"role": "system", "content": "당신은 AI 전문가입니다."},
    {"role": "user", "content": "LoRA란?"},
    {"role": "assistant", "content": "LoRA는 Low-Rank Adaptation의 약자로..."}
  ]
}
\`\`\`

## JSONL 변환 코드

\`\`\`python
import json

data = [
    {"instruction": "질문1", "output": "답변1"},
    {"instruction": "질문2", "output": "답변2"},
]

with open("train.jsonl", "w", encoding="utf-8") as f:
    for item in data:
        f.write(json.dumps(item, ensure_ascii=False) + "\\n")
\`\`\`

## 다음 단계

다음 레슨에서는 **데이터 증강** 기법을 학습합니다.
`,
  contentEn: `# Data Formatting

## Key Formats

### Alpaca Format
\`\`\`json
{"instruction": "What is the capital of Korea?", "input": "", "output": "Seoul."}
\`\`\`

### ShareGPT Format (Conversations)
\`\`\`json
{"conversations": [{"from": "human", "value": "..."}, {"from": "gpt", "value": "..."}]}
\`\`\`

### ChatML Format
\`\`\`json
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
\`\`\`

## JSONL Conversion

\`\`\`python
import json
with open("train.jsonl", "w") as f:
    for item in data:
        f.write(json.dumps(item, ensure_ascii=False) + "\\n")
\`\`\`

## Next Steps

Next lesson covers **Data Augmentation**.
`,
};
