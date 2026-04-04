const e={contentKo:`# 딥러닝이란?

## 딥러닝의 정의

**딥러닝(Deep Learning)**은 머신러닝의 한 분야로, 인공 신경망(Artificial Neural Network)을 여러 층으로 쌓아 데이터에서 복잡한 패턴과 표현을 자동으로 학습하는 기술입니다.

\`\`\`
입력층 → [은닉층 1] → [은닉층 2] → ... → [은닉층 N] → 출력층
         ← ← ← ← 역전파(Backpropagation) ← ← ← ←
\`\`\`

## 딥러닝 vs 머신러닝

| 특성 | 전통적 머신러닝 | 딥러닝 |
|------|----------------|--------|
| 특징 추출 | 수동 (사람이 설계) | 자동 (모델이 학습) |
| 데이터 양 | 적은 데이터에서도 동작 | 대량의 데이터 필요 |
| 연산 자원 | CPU로 충분 | GPU/TPU 필요 |
| 성능 상한 | 데이터 증가 시 포화 | 데이터와 함께 계속 향상 |

## 퍼셉트론 (Perceptron)

퍼셉트론은 신경망의 가장 기본적인 단위입니다.

\`\`\`python
import numpy as np

class Perceptron:
    def __init__(self, input_size, lr=0.01):
        self.weights = np.random.randn(input_size)
        self.bias = 0
        self.lr = lr

    def predict(self, inputs):
        weighted_sum = np.dot(inputs, self.weights) + self.bias
        return 1 if weighted_sum >= 0 else 0

    def train(self, inputs, target):
        prediction = self.predict(inputs)
        error = target - prediction
        self.weights += self.lr * error * inputs
        self.bias += self.lr * error
\`\`\`

## 활성화 함수

활성화 함수는 신경망에 **비선형성**을 부여합니다.

\`\`\`python
import torch.nn.functional as F

sigmoid = torch.sigmoid(x)   # 0~1, 이진 분류
relu = F.relu(x)             # max(0,x), 가장 널리 사용
gelu = F.gelu(x)             # Transformer에서 사용
silu = F.silu(x)             # LLaMA 등 최신 모델
\`\`\`

## 역전파 (Backpropagation)

출력층에서 계산된 손실을 각 가중치에 대해 미분(연쇄 법칙)하여 그래디언트를 계산하고 가중치를 업데이트합니다.

\`\`\`python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256), nn.ReLU(),
    nn.Linear(256, 128), nn.ReLU(),
    nn.Linear(128, 10),
)

output = model(input_data)          # 순전파
loss = nn.CrossEntropyLoss()(output, target)
loss.backward()                     # 역전파

optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
optimizer.step()
optimizer.zero_grad()
\`\`\`

## 주요 딥러닝 아키텍처

### CNN (합성곱 신경망)
- 이미지 처리에 특화, 합성곱 레이어로 공간적 특징 추출

### RNN (순환 신경망)
- 시계열/텍스트 등 순차적 데이터 처리
- LSTM, GRU로 장기 의존성 문제 해결

### Transformer
- **셀프 어텐션** 기반, 현재 NLP/LLM의 핵심
- 병렬 처리 가능, 장거리 의존성 포착

## GPU의 중요성

\`\`\`python
import torch
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")
print(f"GPU: {torch.cuda.get_device_name(0)}")

tensor_gpu = torch.randn(1000, 1000).to("cuda")
result = torch.matmul(tensor_gpu, tensor_gpu.T)  # CPU 대비 수십배 빠름
\`\`\`

## 딥러닝과 파인튜닝

파인튜닝은 딥러닝의 **전이학습** 패러다임을 활용합니다.
1. **사전학습**: 대규모 데이터로 일반적 표현 학습
2. **파인튜닝**: 적은 데이터로 특정 태스크에 적응
3. **효율적 파인튜닝**: LoRA, QLoRA 등으로 파라미터 효율적 학습

## 다음 단계

다음 레슨에서는 현대 LLM의 핵심인 **트랜스포머 아키텍처**에 대해 학습합니다.
`,contentEn:`# What is Deep Learning?

## Definition

**Deep Learning** is a subfield of machine learning that uses artificial neural networks stacked in multiple layers to automatically learn complex patterns from data.

\`\`\`
Input Layer → [Hidden 1] → [Hidden 2] → ... → [Hidden N] → Output Layer
              ← ← ← ← Backpropagation ← ← ← ←
\`\`\`

## Deep Learning vs Machine Learning

| Feature | Traditional ML | Deep Learning |
|---------|---------------|---------------|
| Feature Extraction | Manual | Automatic |
| Data Volume | Works with small data | Requires large data |
| Compute | CPU sufficient | GPU/TPU required |
| Performance | Saturates | Continues improving |

## Perceptron

The most fundamental unit of a neural network.

\`\`\`python
import numpy as np

class Perceptron:
    def __init__(self, input_size, lr=0.01):
        self.weights = np.random.randn(input_size)
        self.bias = 0
        self.lr = lr

    def predict(self, inputs):
        return 1 if np.dot(inputs, self.weights) + self.bias >= 0 else 0

    def train(self, inputs, target):
        error = target - self.predict(inputs)
        self.weights += self.lr * error * inputs
        self.bias += self.lr * error
\`\`\`

## Activation Functions

\`\`\`python
import torch.nn.functional as F

sigmoid = torch.sigmoid(x)   # 0-1, binary classification
relu = F.relu(x)             # max(0,x), most widely used
gelu = F.gelu(x)             # Used in Transformers
silu = F.silu(x)             # Used in LLaMA, modern models
\`\`\`

## Backpropagation

Computes gradients via chain rule and updates weights.

\`\`\`python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256), nn.ReLU(),
    nn.Linear(256, 128), nn.ReLU(),
    nn.Linear(128, 10),
)

output = model(input_data)
loss = nn.CrossEntropyLoss()(output, target)
loss.backward()

optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
optimizer.step()
optimizer.zero_grad()
\`\`\`

## Key Architectures

### CNN - Image processing, spatial feature extraction
### RNN/LSTM/GRU - Sequential data (time series, text)
### Transformer - Self-attention based, core of modern LLMs

## GPU Importance

\`\`\`python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
tensor_gpu = torch.randn(1000, 1000).to("cuda")
result = torch.matmul(tensor_gpu, tensor_gpu.T)  # 10-100x faster
\`\`\`

## Deep Learning and Fine-Tuning

Fine-tuning leverages **transfer learning**:
1. **Pre-training**: Learn general representations from massive data
2. **Fine-tuning**: Adapt to specific tasks with less data
3. **Efficient Fine-tuning**: LoRA, QLoRA for parameter efficiency

## Next Steps

Next lesson covers the **Transformer architecture**, the foundation of modern LLMs.
`};export{e as default};
