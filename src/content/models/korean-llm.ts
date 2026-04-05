export default {
  contentKo: `# 한국어 LLM 파인튜닝

## 한국어 LLM 생태계

| 모델 | 개발사 | 크기 | 특징 |
|------|--------|------|------|
| SOLAR | Upstage | 10.7B | Depth Up-Scaling |
| EXAONE | LG AI | 7.8B | 한국어 특화 |
| Polyglot-Ko | EleutherAI | 1.3B~12.8B | 한국어 사전학습 |
| KoAlpaca | Beomi | 다양 | 한국어 인스트럭션 |
| KULLM | Korea Univ. | 다양 | 한국어 대화 |

## 한국어 데이터셋

- **KoAlpaca**: 한국어 인스트럭션 52K
- **KOpen-platypus**: 한국어 추론 데이터
- **AI Hub**: 정부 공개 한국어 데이터

## 한국어 토크나이저 고려사항

한국어는 영어 대비 토큰 수가 2~3배 더 많아, 학습 비용이 증가합니다.

\`\`\`python
# 동일 의미 문장의 토큰 수 비교
en_tokens = tokenizer.encode("What is machine learning?")     # ~6 토큰
ko_tokens = tokenizer.encode("머신러닝이란 무엇인가요?")         # ~12 토큰
\`\`\`

## 한국어 벤치마크

- **KoBEST**: 한국어 NLU 벤치마크
- **KLUE**: 한국어 언어 이해 평가
- **KoMT-Bench**: 한국어 MT-Bench

## 다음 단계

다음 카테고리에서는 **모델 평가**를 학습합니다.
`,
  contentEn: `# Korean LLM Fine-tuning

## Korean LLM Ecosystem

| Model | Developer | Features |
|-------|-----------|---------|
| SOLAR | Upstage | Depth Up-Scaling |
| EXAONE | LG AI | Korean-specialized |
| Polyglot-Ko | EleutherAI | Korean pre-trained |

## Korean Datasets

KoAlpaca (52K instructions), KOpen-platypus, AI Hub

## Tokenizer Considerations

Korean uses 2-3x more tokens than English for equivalent text, increasing training cost.

## Korean Benchmarks

KoBEST, KLUE, KoMT-Bench

## Next Steps

Next category covers **Model Evaluation**.
`,
};
