const e={contentKo:`# 문서 QA 시스템

## 프로젝트 개요

**RAG (Retrieval-Augmented Generation) + 파인튜닝**을 결합한 문서 기반 질의응답 시스템입니다.

## 아키텍처

\`\`\`
[사용자 질문] → [임베딩 모델] → [벡터 DB 검색] → [관련 문서 + 질문]
                                                        ↓
                                              [파인튜닝된 LLM] → [답변]
\`\`\`

## 벡터 DB 설정

\`\`\`python
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-m3")
vectorstore = FAISS.from_documents(documents, embeddings)

# 관련 문서 검색
results = vectorstore.similarity_search("파인튜닝이란?", k=3)
\`\`\`

## 파인튜닝 포인트

RAG 컨텍스트를 잘 활용하도록 모델을 파인튜닝합니다:
- 문서 기반 답변 생성 능력 향상
- "문서에 없는 내용"은 모른다고 답하도록 학습
- 출처 인용 능력 강화

## 평가 지표

- **Faithfulness**: 답변이 문서에 근거하는가
- **Relevance**: 질문과 관련된 답변인가
- **Completeness**: 충분한 정보를 포함하는가

## 다음 단계

다음 프로젝트에서는 **감성 분석 모델**을 만들어봅니다.
`,contentEn:`# Document QA System

## Project Overview

Combine **RAG + Fine-tuning** for document-based Q&A.

## Architecture

\`\`\`
[Query] → [Embedding] → [Vector DB] → [Retrieved Docs + Query] → [Fine-tuned LLM] → [Answer]
\`\`\`

## Vector DB

\`\`\`python
from langchain.vectorstores import FAISS
vectorstore = FAISS.from_documents(documents, embeddings)
results = vectorstore.similarity_search("What is LoRA?", k=3)
\`\`\`

## Evaluation

Faithfulness, Relevance, Completeness

## Next Steps

Next project: **Sentiment Analysis Model**.
`};export{e as default};
