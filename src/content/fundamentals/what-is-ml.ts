export default {
  contentKo: `# 머신러닝이란?

## 머신러닝의 정의

머신러닝(Machine Learning)은 명시적으로 프로그래밍하지 않아도 데이터에서 패턴을 학습하여 예측이나 결정을 내릴 수 있는 알고리즘과 통계 모델의 집합입니다.

## 머신러닝의 유형

### 지도학습 (Supervised Learning)
- 입력과 출력 쌍으로 이루어진 학습 데이터를 사용
- 분류(Classification)와 회귀(Regression)로 구분
- 예: 스팸 메일 분류, 주가 예측

### 비지도학습 (Unsupervised Learning)
- 레이블이 없는 데이터에서 패턴을 찾음
- 군집화(Clustering), 차원 축소(Dimensionality Reduction)
- 예: 고객 세분화, 이상 탐지

### 강화학습 (Reinforcement Learning)
- 환경과 상호작용하며 보상을 최대화하는 정책 학습
- 에이전트, 상태, 행동, 보상의 개념
- 예: 게임 AI, 로봇 제어

## 머신러닝과 파인튜닝

파인튜닝은 머신러닝의 **전이학습(Transfer Learning)** 기법 중 하나입니다.
사전 학습된 모델의 가중치를 특정 태스크에 맞게 미세 조정하는 과정입니다.

\`\`\`python
# 간단한 파인튜닝 개념 코드
from transformers import AutoModelForSequenceClassification

# 사전 학습된 모델 로드
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

# 이제 이 모델을 우리의 데이터로 파인튜닝합니다
\`\`\`

## 다음 단계

다음 레슨에서는 딥러닝의 기초와 신경망에 대해 학습합니다.
`,
  contentEn: `# What is Machine Learning?

## Definition of Machine Learning

Machine Learning (ML) is a collection of algorithms and statistical models that enable computer systems to learn patterns from data and make predictions or decisions without being explicitly programmed.

## Types of Machine Learning

### Supervised Learning
- Uses labeled training data with input-output pairs
- Divided into Classification and Regression
- Examples: spam detection, stock price prediction

### Unsupervised Learning
- Finds patterns in unlabeled data
- Clustering, Dimensionality Reduction
- Examples: customer segmentation, anomaly detection

### Reinforcement Learning
- Learns policies by interacting with an environment to maximize rewards
- Concepts: agent, state, action, reward
- Examples: game AI, robot control

## Machine Learning and Fine-tuning

Fine-tuning is a **Transfer Learning** technique in machine learning.
It involves adjusting the weights of a pre-trained model for a specific task.

\`\`\`python
# Simple fine-tuning concept code
from transformers import AutoModelForSequenceClassification

# Load a pre-trained model
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

# Now we fine-tune this model with our data
\`\`\`

## Next Steps

In the next lesson, we'll learn about deep learning fundamentals and neural networks.
`,
};
