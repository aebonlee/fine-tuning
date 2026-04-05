export default {
  contentKo: `# 데이터 수집 전략

## 데이터 소스

### 공개 데이터셋
- HuggingFace Datasets, Kaggle, GitHub
- OpenAssistant, Dolly, Alpaca 등 인스트럭션 데이터

### 합성 데이터 생성
LLM을 활용하여 학습 데이터를 생성하는 방법입니다.

\`\`\`python
from openai import OpenAI
client = OpenAI()

prompt = """다음 주제에 대해 instruction-response 쌍을 5개 생성하세요:
주제: 한국 역사
형식: {"instruction": "...", "response": "..."}"""

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}]
)
\`\`\`

### 웹 스크래핑
- robots.txt 확인, 라이선스 준수 필수
- BeautifulSoup, Scrapy 활용

## 데이터 품질 원칙

1. **다양성**: 다양한 유형의 질문과 답변 포함
2. **정확성**: 사실 관계가 정확한 데이터
3. **일관성**: 동일한 형식과 스타일
4. **적절한 양**: 일반적으로 1,000~10,000개

## 다음 단계

다음 레슨에서는 수집한 데이터의 **정제 방법**을 학습합니다.
`,
  contentEn: `# Data Collection Strategy

## Data Sources

### Public Datasets
- HuggingFace Datasets, Kaggle, GitHub
- OpenAssistant, Dolly, Alpaca instruction data

### Synthetic Data Generation

\`\`\`python
from openai import OpenAI
client = OpenAI()

prompt = """Generate 5 instruction-response pairs about:
Topic: Machine Learning
Format: {"instruction": "...", "response": "..."}"""

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}]
)
\`\`\`

## Data Quality Principles

1. **Diversity**: Various question types and answers
2. **Accuracy**: Factually correct data
3. **Consistency**: Same format and style
4. **Sufficient volume**: Typically 1,000-10,000 samples

## Next Steps

Next lesson covers **Data Cleaning**.
`,
};
