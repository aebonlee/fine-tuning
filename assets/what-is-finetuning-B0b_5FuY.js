const e={contentKo:`# 파인튜닝이란?

> 이 글은 [Databricks 블로그 - What is Fine-Tuning?](https://www.databricks.com/kr/blog/what-is-fine-tuning) 내용을 기반으로 구성되었습니다.

## 파인튜닝의 정의

**파인튜닝(Fine-Tuning)**은 대규모 데이터셋으로 사전 학습(Pre-training)된 모델을 특정 태스크나 도메인에 맞게 추가 학습시키는 기법입니다.

사전 학습된 모델이 가진 일반적인 지식을 기반으로, 더 작고 구체적인 데이터셋으로 모델의 파라미터를 미세 조정하여 특정 작업에서 더 높은 성능을 달성할 수 있습니다.

\`\`\`
[대규모 일반 데이터] → [사전 학습된 모델] → [특정 도메인 데이터로 파인튜닝] → [전문 모델]
\`\`\`

## 왜 파인튜닝이 중요한가?

파인튜닝은 **프롬프트 엔지니어링**과 **처음부터 학습(Pre-training)** 사이의 복잡성과 비용 격차를 연결하는 기술입니다.

| 접근 방법 | 비용 | 성능 | 커스터마이징 |
|-----------|------|------|-------------|
| 프롬프트 엔지니어링 | 낮음 | 보통 | 제한적 |
| **파인튜닝** | **중간** | **높음** | **높음** |
| 처음부터 학습 | 매우 높음 | 최고 | 완전 |

### 파인튜닝의 주요 이점

- **비용 효율성**: 처음부터 학습하는 것보다 훨씬 적은 데이터와 연산 자원으로 높은 성능 달성
- **도메인 전문화**: 산업별 용어(의료, 법률, 금융 등)와 특화된 작업에 맞는 응답 생성
- **성능 향상**: 범용 모델 대비 특정 작업에서 월등히 높은 정확도
- **데이터 프라이버시**: 민감한 기업 데이터를 모델에 내재화하여 보안 강화

## 파인튜닝 방법론

### 1. 전체 파인튜닝 (Full Fine-Tuning)

신경망의 **모든 레이어와 파라미터**를 업데이트하는 방식입니다.

- 가장 높은 성능을 달성할 수 있음
- 가장 많은 연산 자원과 시간이 필요
- 오버피팅 위험이 상대적으로 높음

\`\`\`python
from transformers import AutoModelForCausalLM, TrainingArguments, Trainer

# 모든 파라미터를 학습 가능한 상태로 로드
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")

# 전체 파인튜닝 - 모든 파라미터가 업데이트됨
training_args = TrainingArguments(
    output_dir="./full-ft-model",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-5,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)
trainer.train()
\`\`\`

### 2. 부분 파인튜닝 (Partial Fine-Tuning)

사전 학습된 파라미터 중 **모델 성능에 가장 중요한 일부 레이어만** 선택적으로 업데이트합니다.

- 연산 비용을 줄이면서도 의미 있는 성능 향상 가능
- 일반적으로 상위 레이어(head, classifier)만 학습
- 하위 레이어의 일반적 특징 표현은 보존

\`\`\`python
# 특정 레이어만 학습 가능하게 설정
for name, param in model.named_parameters():
    if "lm_head" not in name and "layers.31" not in name:
        param.requires_grad = False  # 대부분의 레이어 동결

# 학습 가능한 파라미터 수 확인
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"학습 가능 파라미터: {trainable:,} / {total:,} ({100*trainable/total:.2f}%)")
\`\`\`

### 3. 추가적 파인튜닝 (Additive Fine-Tuning)

모델에 **새로운 파라미터나 레이어를 추가**하고, 기존 사전 학습된 가중치는 동결(freeze)한 채 새로 추가된 부분만 학습합니다.

- 기존 모델의 지식을 온전히 보존
- 적은 수의 새로운 파라미터만 학습
- Adapter Tuning, Prefix Tuning 등이 이 범주에 속함

## PEFT (Parameter-Efficient Fine-Tuning)

**PEFT**는 대규모 사전 학습 모델을 최소한의 연산 자원과 저장 공간으로 특정 작업에 적응시키는 기법들의 총칭입니다.

### LoRA (Low-Rank Adaptation)

가장 대표적인 PEFT 기법인 **LoRA**는 기존 모델을 동결하고, 작은 어댑터 레이어만 학습합니다.

- 학습 파라미터를 **약 99% 감소**시킴
- 원본 모델의 성능에 근접하면서도 매우 효율적
- 여러 태스크용 어댑터를 각각 저장하여 유연하게 전환 가능

\`\`\`python
from peft import LoraConfig, get_peft_model

# LoRA 설정
lora_config = LoraConfig(
    r=16,               # Low-rank 차원
    lora_alpha=32,      # 스케일링 팩터
    target_modules=["q_proj", "v_proj"],  # 적용할 레이어
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)

# PEFT 모델 생성 (기존 모델 가중치는 동결됨)
peft_model = get_peft_model(model, lora_config)
peft_model.print_trainable_parameters()
# 출력 예: trainable params: 4,194,304 || all params: 1,241,513,984 || trainable%: 0.34%
\`\`\`

### QLoRA (Quantized LoRA)

LoRA에 **양자화(Quantization)**를 결합한 방법으로, 4비트 양자화된 모델 위에 LoRA를 적용합니다.

- 메모리 사용량을 대폭 절감 (16GB GPU에서도 7B 모델 파인튜닝 가능)
- 성능 손실은 미미
- 개인 GPU 환경에서도 대형 모델 파인튜닝이 현실적으로 가능

## 전이학습 (Transfer Learning)

파인튜닝은 **전이학습**의 대표적 활용 사례입니다. 전이학습은 사전 학습된 모델이 대규모 데이터에서 습득한 특징(feature)을 다른 다운스트림 모델이나 태스크에 재사용하는 것입니다.

\`\`\`
[ImageNet 사전학습 모델]
    ├── 의료 이미지 분류 (전이학습 + 파인튜닝)
    ├── 자율주행 객체 탐지 (전이학습 + 파인튜닝)
    └── 위성 이미지 분석 (전이학습 + 파인튜닝)

[GPT/LLaMA 사전학습 모델]
    ├── 고객 서비스 챗봇 (파인튜닝)
    ├── 법률 문서 분석 (파인튜닝)
    └── 의료 진단 보조 (파인튜닝)
\`\`\`

## 파인튜닝 프로세스

### Step 1: 데이터 준비
- 고품질 학습 데이터셋 큐레이션
- 대상 태스크를 대표하는 데이터 확보
- 데이터 정제 및 포맷팅 (JSONL, Alpaca 형식 등)

### Step 2: 하이퍼파라미터 설정
- **학습률 (Learning Rate)**: 일반적으로 1e-5 ~ 5e-5 (사전학습보다 작은 값)
- **배치 사이즈 (Batch Size)**: GPU 메모리에 맞게 조정
- **에폭 수 (Epochs)**: 보통 1~5 에폭 (오버피팅 방지)
- **웜업 비율 (Warmup Ratio)**: 학습 안정성을 위해 0.03~0.1

### Step 3: 학습 및 모니터링
- 검증 데이터셋으로 성능 모니터링
- **오버피팅 방지**: Early Stopping, Weight Decay 적용
- 학습 손실과 검증 손실의 추이 관찰

### Step 4: 평가
- 별도의 테스트 데이터셋으로 최종 성능 평가
- 태스크별 적절한 평가 지표 사용 (정확도, F1, BLEU, ROUGE 등)

## 파인튜닝 활용 사례

### 의료 분야
사전 학습된 모델을 의료 데이터로 파인튜닝하면, 더 정확한 진단과 치료 방안을 제시할 수 있습니다.

### 금융 분야
거래 데이터와 고객 행동 패턴을 학습시켜 사기 탐지, 신용 평가 등에 활용합니다.

### 고객 서비스
기업의 FAQ, 매뉴얼 등을 학습시켜 도메인에 특화된 고객 응대 챗봇을 구축합니다.

### 코드 생성
특정 프로그래밍 언어나 코딩 스타일에 맞춘 코드 생성 모델을 만들 수 있습니다.

## 파인튜닝의 과제

- **데이터 품질**: 양보다 질이 중요. 노이즈가 많은 데이터는 성능을 저하시킴
- **카타스트로픽 포겟팅 (Catastrophic Forgetting)**: 파인튜닝 과정에서 사전 학습된 지식을 잊어버리는 현상
- **오버피팅**: 작은 데이터셋으로 학습할 때 과적합 위험
- **연산 비용**: 대규모 모델일수록 GPU 메모리와 학습 시간이 많이 필요

## 참고 자료

- [Databricks - What is Fine-Tuning?](https://www.databricks.com/kr/blog/what-is-fine-tuning)
- [Databricks - Efficient Fine-Tuning with LoRA](https://www.databricks.com/blog/efficient-fine-tuning-lora-guide-llms)
- [Databricks - Fine-tuning LLMs with HuggingFace and DeepSpeed](https://www.databricks.com/blog/fine-tuning-large-language-models-hugging-face-and-deepspeed)
`,contentEn:`# What is Fine-Tuning?

> This article is based on [Databricks Blog - What is Fine-Tuning?](https://www.databricks.com/blog/what-is-fine-tuning)

## Definition of Fine-Tuning

**Fine-Tuning** is a technique that adapts a pre-trained model (trained on a large-scale dataset) to perform specific tasks or work within a particular domain by continuing training on a smaller, task-specific dataset.

By leveraging the general knowledge of a pre-trained model and fine-adjusting its parameters with a more focused dataset, the model can achieve higher performance on specific tasks.

\`\`\`
[Large General Data] → [Pre-trained Model] → [Fine-tune on Domain Data] → [Specialized Model]
\`\`\`

## Why Fine-Tuning Matters

Fine-tuning bridges the complexity and cost gap between **prompt engineering** and training from scratch (**pre-training**).

| Approach | Cost | Performance | Customization |
|----------|------|-------------|---------------|
| Prompt Engineering | Low | Moderate | Limited |
| **Fine-Tuning** | **Medium** | **High** | **High** |
| Pre-training from Scratch | Very High | Highest | Complete |

### Key Benefits of Fine-Tuning

- **Cost Efficiency**: Achieves high performance with far less data and compute compared to training from scratch
- **Domain Specialization**: Generates responses tailored to industry-specific terminology (medical, legal, finance)
- **Performance Improvement**: Significantly higher accuracy on specific tasks compared to general-purpose models
- **Data Privacy**: Embeds sensitive enterprise data into models for enhanced security

## Fine-Tuning Methods

### 1. Full Fine-Tuning

Updates **all layers and parameters** of the neural network.

- Can achieve the highest performance
- Requires the most computational resources and time
- Relatively higher risk of overfitting

\`\`\`python
from transformers import AutoModelForCausalLM, TrainingArguments, Trainer

# Load model with all parameters trainable
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")

# Full fine-tuning - all parameters are updated
training_args = TrainingArguments(
    output_dir="./full-ft-model",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-5,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)
trainer.train()
\`\`\`

### 2. Partial Fine-Tuning

Selectively updates only a **subset of pre-trained parameters** most critical to model performance.

- Reduces computational costs while achieving meaningful performance gains
- Typically trains only the upper layers (head, classifier)
- Preserves general feature representations of lower layers

\`\`\`python
# Freeze most layers, train only specific ones
for name, param in model.named_parameters():
    if "lm_head" not in name and "layers.31" not in name:
        param.requires_grad = False  # Freeze most layers

# Check trainable parameters
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"Trainable params: {trainable:,} / {total:,} ({100*trainable/total:.2f}%)")
\`\`\`

### 3. Additive Fine-Tuning

**Adds new parameters or layers** to the model, freezes existing pre-trained weights, and trains only the newly added components.

- Preserves the original model's knowledge intact
- Trains only a small number of new parameters
- Includes Adapter Tuning, Prefix Tuning, etc.

## PEFT (Parameter-Efficient Fine-Tuning)

**PEFT** is an umbrella term for techniques that adapt large pre-trained models to specific tasks with minimal computational resources and storage requirements.

### LoRA (Low-Rank Adaptation)

**LoRA**, the most popular PEFT technique, freezes the base model and trains only small adapter layers.

- Reduces trainable parameters by **approximately 99%**
- Achieves performance close to full fine-tuning while being extremely efficient
- Multiple task-specific adapters can be stored and swapped flexibly

\`\`\`python
from peft import LoraConfig, get_peft_model

# LoRA configuration
lora_config = LoraConfig(
    r=16,               # Low-rank dimension
    lora_alpha=32,      # Scaling factor
    target_modules=["q_proj", "v_proj"],  # Target layers
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)

# Create PEFT model (base model weights are frozen)
peft_model = get_peft_model(model, lora_config)
peft_model.print_trainable_parameters()
# Output: trainable params: 4,194,304 || all params: 1,241,513,984 || trainable%: 0.34%
\`\`\`

### QLoRA (Quantized LoRA)

Combines LoRA with **quantization**, applying LoRA on a 4-bit quantized model.

- Dramatically reduces memory usage (fine-tune 7B models on 16GB GPUs)
- Minimal performance loss
- Makes fine-tuning large models practical on consumer hardware

## Transfer Learning

Fine-tuning is a primary application of **Transfer Learning**. Transfer learning reuses features learned by a pre-trained model from large-scale data for other downstream models and tasks.

\`\`\`
[ImageNet Pre-trained Model]
    ├── Medical Image Classification (transfer + fine-tune)
    ├── Autonomous Driving Object Detection (transfer + fine-tune)
    └── Satellite Image Analysis (transfer + fine-tune)

[GPT/LLaMA Pre-trained Model]
    ├── Customer Service Chatbot (fine-tune)
    ├── Legal Document Analysis (fine-tune)
    └── Medical Diagnosis Assistant (fine-tune)
\`\`\`

## Fine-Tuning Process

### Step 1: Data Preparation
- Curate high-quality training datasets
- Ensure data is representative of target tasks
- Clean and format data (JSONL, Alpaca format, etc.)

### Step 2: Hyperparameter Configuration
- **Learning Rate**: Typically 1e-5 to 5e-5 (smaller than pre-training)
- **Batch Size**: Adjust to fit GPU memory
- **Epochs**: Usually 1-5 (prevent overfitting)
- **Warmup Ratio**: 0.03-0.1 for training stability

### Step 3: Training & Monitoring
- Monitor performance with validation dataset
- **Prevent Overfitting**: Apply Early Stopping and Weight Decay
- Track training loss and validation loss trends

### Step 4: Evaluation
- Final performance evaluation on held-out test dataset
- Use task-appropriate metrics (Accuracy, F1, BLEU, ROUGE, etc.)

## Fine-Tuning Use Cases

### Healthcare
Fine-tuning pre-trained models on medical data enables more accurate diagnoses and treatment recommendations.

### Finance
Training on transaction data and customer behavior patterns for fraud detection and credit scoring.

### Customer Service
Building domain-specific chatbots by fine-tuning on corporate FAQs and manuals.

### Code Generation
Creating code generation models customized for specific programming languages or coding styles.

## Challenges of Fine-Tuning

- **Data Quality**: Quality over quantity. Noisy data degrades performance
- **Catastrophic Forgetting**: Loss of pre-trained knowledge during fine-tuning
- **Overfitting**: Risk of overfitting when training on small datasets
- **Compute Costs**: Larger models require more GPU memory and training time

## References

- [Databricks - What is Fine-Tuning?](https://www.databricks.com/blog/what-is-fine-tuning)
- [Databricks - Efficient Fine-Tuning with LoRA](https://www.databricks.com/blog/efficient-fine-tuning-lora-guide-llms)
- [Databricks - Fine-tuning LLMs with HuggingFace and DeepSpeed](https://www.databricks.com/blog/fine-tuning-large-language-models-hugging-face-and-deepspeed)
`};export{e as default};
