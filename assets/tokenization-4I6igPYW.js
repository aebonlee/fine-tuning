const e={contentKo:`# 토크나이제이션

## 토크나이제이션이란?

텍스트를 모델이 처리할 수 있는 **토큰** 단위로 분할하는 과정입니다.

## 주요 알고리즘

| 알고리즘 | 사용 모델 |
|----------|----------|
| BPE (Byte-Pair Encoding) | GPT, LLaMA |
| WordPiece | BERT |
| SentencePiece | T5, LLaMA |
| tiktoken | GPT-4 |

## 토크나이저 사용

\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")

text = "파인튜닝을 배워봅시다!"
tokens = tokenizer.encode(text)
print(f"토큰 수: {len(tokens)}")
print(f"토큰 ID: {tokens}")
print(f"토큰 텍스트: {tokenizer.convert_ids_to_tokens(tokens)}")
\`\`\`

## 특수 토큰

\`\`\`python
print(f"BOS: {tokenizer.bos_token}")  # 시작 토큰
print(f"EOS: {tokenizer.eos_token}")  # 종료 토큰
print(f"PAD: {tokenizer.pad_token}")  # 패딩 토큰
\`\`\`

## 파인튜닝에서의 고려사항

- 토큰 길이가 모델의 max_length를 초과하지 않도록 관리
- 한국어는 영어 대비 더 많은 토큰을 사용 (비용 주의)
- pad_token이 없는 경우 eos_token으로 설정

## 다음 단계

다음 카테고리에서는 **데이터셋 플랫폼**을 학습합니다.
`,contentEn:`# Tokenization

## What is Tokenization?

The process of splitting text into **tokens** that a model can process.

## Key Algorithms

| Algorithm | Models |
|-----------|--------|
| BPE | GPT, LLaMA |
| WordPiece | BERT |
| SentencePiece | T5, LLaMA |
| tiktoken | GPT-4 |

## Usage

\`\`\`python
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")

tokens = tokenizer.encode("Let's learn fine-tuning!")
print(f"Count: {len(tokens)}")
print(f"Tokens: {tokenizer.convert_ids_to_tokens(tokens)}")
\`\`\`

## Special Tokens

BOS (beginning), EOS (end), PAD (padding) tokens are essential for training.

## Next Steps

Next category covers **Dataset Platforms**.
`};export{e as default};
