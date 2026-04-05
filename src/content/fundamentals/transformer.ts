export default {
  contentKo: `# 트랜스포머 아키텍처

## 트랜스포머란?

**트랜스포머(Transformer)**는 2017년 Google의 **"Attention Is All You Need"** 논문에서 제안된 아키텍처입니다. **셀프 어텐션** 메커니즘으로 시퀀스의 모든 위치를 동시에 참조하여 병렬 처리가 가능합니다.

## 셀프 어텐션 (Self-Attention)

각 토큰이 다른 모든 토큰과의 관계를 계산합니다.

\`\`\`
Attention(Q, K, V) = softmax(QK^T / √d_k) × V
\`\`\`

\`\`\`python
import torch, math, torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_dim):
        super().__init__()
        self.d = embed_dim
        self.W_q = nn.Linear(embed_dim, embed_dim)
        self.W_k = nn.Linear(embed_dim, embed_dim)
        self.W_v = nn.Linear(embed_dim, embed_dim)

    def forward(self, x):
        Q, K, V = self.W_q(x), self.W_k(x), self.W_v(x)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d)
        weights = torch.softmax(scores, dim=-1)
        return torch.matmul(weights, V)
\`\`\`

## 멀티헤드 어텐션

여러 어텐션 "헤드"를 병렬로 실행하여 다양한 관점에서 관계를 포착합니다.

## 위치 인코딩

트랜스포머는 순서 정보가 없으므로 위치 정보를 별도로 제공합니다.
- **사인/코사인**: 원본 논문 방식
- **RoPE**: LLaMA, Mistral 등 최신 모델 사용

## 인코더-디코더 구조

- **인코더**: Self-Attention + Feed Forward (BERT)
- **디코더**: Masked Self-Attn + Cross-Attn + FF (GPT)
- **레이어 정규화**: Pre-Norm(최신) vs Post-Norm(원본)

## BERT vs GPT

| 특성 | BERT | GPT |
|------|------|-----|
| 구조 | 인코더 | 디코더 |
| 어텐션 | 양방향 | 단방향 (Causal) |
| 사전학습 | MLM | CLM (다음 토큰 예측) |
| 활용 | 분류, NER, QA | 텍스트 생성, 대화 |

## 트랜스포머의 혁신

1. **병렬 처리**: GPU 최대 활용
2. **장거리 의존성**: 모든 토큰 쌍 간 직접 관계 계산
3. **확장성**: 스케일링 법칙에 따라 예측 가능한 성능 향상

## 다음 단계

다음 레슨에서는 **대형 언어 모델(LLM) 개요**를 학습합니다.
`,
  contentEn: `# Transformer Architecture

## What is a Transformer?

The **Transformer** was proposed in Google's 2017 paper **"Attention Is All You Need"**. It uses **self-attention** to reference all positions simultaneously, enabling parallel processing.

## Self-Attention

Each token computes relationships with all other tokens.

\`\`\`
Attention(Q, K, V) = softmax(QK^T / √d_k) × V
\`\`\`

\`\`\`python
import torch, math, torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_dim):
        super().__init__()
        self.d = embed_dim
        self.W_q = nn.Linear(embed_dim, embed_dim)
        self.W_k = nn.Linear(embed_dim, embed_dim)
        self.W_v = nn.Linear(embed_dim, embed_dim)

    def forward(self, x):
        Q, K, V = self.W_q(x), self.W_k(x), self.W_v(x)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d)
        return torch.matmul(torch.softmax(scores, dim=-1), V)
\`\`\`

## Multi-Head Attention

Runs multiple attention "heads" in parallel to capture relationships from different perspectives.

## Positional Encoding

- **Sinusoidal**: Original paper approach
- **RoPE**: Used in LLaMA, Mistral

## Encoder-Decoder Structure

- **Encoder**: Self-Attention + Feed Forward (BERT)
- **Decoder**: Masked Self-Attn + Cross-Attn + FF (GPT)

## BERT vs GPT

| Feature | BERT | GPT |
|---------|------|-----|
| Structure | Encoder | Decoder |
| Attention | Bidirectional | Causal |
| Pre-training | MLM | CLM (next token) |
| Use | Classification, NER | Text generation |

## Why Transformers are Revolutionary

1. **Parallel processing**: Maximizes GPU utilization
2. **Long-range dependencies**: Direct relationships between all token pairs
3. **Scalability**: Predictable performance gains with scale

## Next Steps

Next lesson covers **LLM Overview**.
`,
};
