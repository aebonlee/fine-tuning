const e={contentKo:`# 커스텀 데이터셋 구축

## 데이터 스키마 설계

\`\`\`json
{
  "instruction": "사용자의 질문이나 지시",
  "input": "추가 컨텍스트 (선택)",
  "output": "기대하는 응답",
  "category": "카테고리 태그"
}
\`\`\`

## 어노테이션 가이드라인

1. 명확한 기준 문서 작성
2. 예시 포함 (좋은 예 / 나쁜 예)
3. 어노테이터 간 일치도(Cohen's Kappa) 측정
4. 정기적인 품질 검토

## 어노테이션 도구

- **Label Studio**: 오픈소스, 다양한 태스크 지원
- **Argilla**: NLP 특화, HuggingFace 연동

## GPT-4를 활용한 데이터 생성

\`\`\`python
import json
from openai import OpenAI

client = OpenAI()
categories = ["의료", "법률", "금융", "IT"]

for category in categories:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": f"{category} 분야의 전문 QA 10개를 JSON 배열로 생성하세요."
        }]
    )
    # 결과 파싱 및 저장
\`\`\`

## 다음 단계

다음 카테고리에서는 **SFT 파인튜닝 기법**을 학습합니다.
`,contentEn:`# Building Custom Datasets

## Schema Design

\`\`\`json
{"instruction": "User question", "input": "Context (optional)", "output": "Expected response", "category": "tag"}
\`\`\`

## Annotation Guidelines

1. Clear criteria documents with examples
2. Measure inter-annotator agreement (Cohen's Kappa)
3. Regular quality reviews

## Tools

- **Label Studio**: Open source, multi-task
- **Argilla**: NLP specialized, HuggingFace integration

## GPT-4 Data Generation

\`\`\`python
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Generate 10 QA pairs about..."}]
)
\`\`\`

## Next Steps

Next category covers **SFT Fine-tuning Techniques**.
`};export{e as default};
