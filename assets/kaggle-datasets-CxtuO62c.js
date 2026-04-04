const e={contentKo:`# Kaggle 데이터셋

## Kaggle API 설정

\`\`\`bash
pip install kaggle
# ~/.kaggle/kaggle.json에 API 키 배치

kaggle datasets list -s "instruction following"
kaggle datasets download -d dataset-name
\`\`\`

## 파인튜닝용 추천 데이터셋

- **OpenAssistant Conversations**: 다국어 대화 데이터
- **ChatGPT Prompts**: 프롬프트-응답 쌍
- **Korean NLP datasets**: 한국어 특화 데이터

## Kaggle Notebooks 활용

Kaggle은 무료 GPU(T4×2, 주 30시간)를 제공합니다.
- 직접 노트북에서 파인튜닝 실행 가능
- 데이터셋을 노트북에 바로 마운트

## 다음 단계

다음 레슨에서는 **커스텀 데이터셋 구축**을 학습합니다.
`,contentEn:`# Kaggle Datasets

## Kaggle API Setup

\`\`\`bash
pip install kaggle
kaggle datasets list -s "instruction following"
kaggle datasets download -d dataset-name
\`\`\`

## Recommended Datasets

- **OpenAssistant Conversations**: Multilingual dialogue
- **ChatGPT Prompts**: Prompt-response pairs

## Kaggle Notebooks

Free GPU (T4×2, 30hr/week) for direct fine-tuning in notebooks.

## Next Steps

Next lesson covers **Building Custom Datasets**.
`};export{e as default};
