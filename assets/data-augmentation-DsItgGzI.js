const t={contentKo:`# 데이터 증강

## 데이터 증강이란?

적은 양의 데이터를 다양한 기법으로 변형하여 학습 데이터의 양과 다양성을 늘리는 방법입니다.

## 주요 기법

### Self-Instruct
LLM을 사용하여 새로운 인스트럭션-응답 쌍을 자동 생성합니다.

### Evol-Instruct
기존 인스트럭션을 점진적으로 복잡하게 진화시킵니다.

\`\`\`python
evolve_prompt = """다음 질문을 더 복잡하고 구체적으로 만드세요:
원본: "머신러닝이 뭔가요?"
진화: """
# → "트랜스포머 아키텍처에서 셀프 어텐션 메커니즘이
#    기존 RNN 대비 어떤 장점이 있는지 설명하세요."
\`\`\`

### 역번역 (Back-Translation)
한국어 → 영어 → 한국어로 변환하여 동일 의미의 다른 표현을 생성합니다.

## 데이터 밸런싱

\`\`\`python
from collections import Counter

# 카테고리별 데이터 수 확인
counts = Counter(item['category'] for item in dataset)
print(counts)

# 부족한 카테고리 오버샘플링
\`\`\`

## 주의사항

- 품질이 낮은 합성 데이터는 오히려 성능을 저하시킬 수 있음
- 증강 후 반드시 품질 검증 필요

## 다음 단계

다음 레슨에서는 **토크나이제이션**을 학습합니다.
`,contentEn:`# Data Augmentation

## What is Data Augmentation?

Techniques to increase training data volume and diversity by transforming existing data.

## Key Techniques

### Self-Instruct
Use LLMs to automatically generate new instruction-response pairs.

### Evol-Instruct
Progressively make existing instructions more complex.

### Back-Translation
Translate Korean → English → Korean for paraphrased variations.

## Data Balancing

\`\`\`python
from collections import Counter
counts = Counter(item['category'] for item in dataset)
# Oversample underrepresented categories
\`\`\`

## Cautions

- Low-quality synthetic data can hurt performance
- Always validate quality after augmentation

## Next Steps

Next lesson covers **Tokenization**.
`};export{t as default};
