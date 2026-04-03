// FineTuning Lesson Categories & Configuration

export const LESSON_CATEGORIES = [
  // ── 기초 이론 ──
  {
    slug: 'fundamentals',
    icon: 'fa-brain',
    nameKo: 'AI/ML 기초',
    nameEn: 'AI/ML Fundamentals',
    descKo: '머신러닝과 딥러닝의 기초 개념을 학습합니다',
    descEn: 'Learn the fundamentals of machine learning and deep learning',
    level: 'beginner',
    lessons: [
      { slug: 'what-is-ml', titleKo: '머신러닝이란?', titleEn: 'What is Machine Learning?', descKo: 'ML의 기본 개념과 유형', descEn: 'Basic concepts and types of ML' },
      { slug: 'what-is-dl', titleKo: '딥러닝이란?', titleEn: 'What is Deep Learning?', descKo: '신경망의 기초 이해', descEn: 'Understanding neural network basics' },
      { slug: 'transformer', titleKo: '트랜스포머 아키텍처', titleEn: 'Transformer Architecture', descKo: 'Attention 메커니즘과 트랜스포머', descEn: 'Attention mechanism and transformers' },
      { slug: 'llm-overview', titleKo: 'LLM 개요', titleEn: 'LLM Overview', descKo: '대규모 언어 모델의 이해', descEn: 'Understanding large language models' },
      { slug: 'pretrain-vs-finetune', titleKo: '사전학습 vs 파인튜닝', titleEn: 'Pre-training vs Fine-tuning', descKo: '두 학습 방식의 차이와 활용', descEn: 'Differences and applications of both approaches' },
    ],
  },
  {
    slug: 'python-basics',
    icon: 'fa-python',
    nameKo: 'Python 환경 설정',
    nameEn: 'Python Environment Setup',
    descKo: '파인튜닝을 위한 Python 개발 환경을 구축합니다',
    descEn: 'Set up Python development environment for fine-tuning',
    level: 'beginner',
    lessons: [
      { slug: 'python-install', titleKo: 'Python & Conda 설치', titleEn: 'Python & Conda Installation', descKo: '개발 환경 설치 및 설정', descEn: 'Install and configure development environment' },
      { slug: 'jupyter-setup', titleKo: 'Jupyter Notebook 설정', titleEn: 'Jupyter Notebook Setup', descKo: '실습 환경 구성', descEn: 'Configure practice environment' },
      { slug: 'gpu-setup', titleKo: 'GPU 환경 설정', titleEn: 'GPU Environment Setup', descKo: 'CUDA, cuDNN 설치와 설정', descEn: 'CUDA, cuDNN installation and setup' },
      { slug: 'cloud-gpu', titleKo: '클라우드 GPU 활용', titleEn: 'Cloud GPU Usage', descKo: 'Colab, AWS, GCP GPU 사용법', descEn: 'Using Colab, AWS, GCP GPUs' },
    ],
  },

  // ── 데이터 준비 ──
  {
    slug: 'data-preparation',
    icon: 'fa-database',
    nameKo: '데이터 준비',
    nameEn: 'Data Preparation',
    descKo: '학습 데이터 수집, 정제, 포맷팅을 학습합니다',
    descEn: 'Learn data collection, cleaning, and formatting',
    level: 'intermediate',
    lessons: [
      { slug: 'data-collection', titleKo: '데이터 수집 전략', titleEn: 'Data Collection Strategy', descKo: '양질의 학습 데이터 확보 방법', descEn: 'Methods to acquire quality training data' },
      { slug: 'data-cleaning', titleKo: '데이터 정제', titleEn: 'Data Cleaning', descKo: '노이즈 제거와 데이터 품질 향상', descEn: 'Noise removal and data quality improvement' },
      { slug: 'data-format', titleKo: '데이터 포맷팅', titleEn: 'Data Formatting', descKo: 'JSONL, CSV, Alpaca 포맷 변환', descEn: 'JSONL, CSV, Alpaca format conversion' },
      { slug: 'data-augmentation', titleKo: '데이터 증강', titleEn: 'Data Augmentation', descKo: '적은 데이터로 성능을 높이는 기법', descEn: 'Techniques to improve performance with limited data' },
      { slug: 'tokenization', titleKo: '토크나이제이션', titleEn: 'Tokenization', descKo: '토큰화 이해와 커스텀 토크나이저', descEn: 'Understanding tokenization and custom tokenizers' },
    ],
  },
  {
    slug: 'dataset-platforms',
    icon: 'fa-cloud-arrow-down',
    nameKo: '데이터셋 플랫폼',
    nameEn: 'Dataset Platforms',
    descKo: 'HuggingFace, Kaggle 등 데이터셋 활용법',
    descEn: 'Using HuggingFace, Kaggle and other dataset platforms',
    level: 'intermediate',
    lessons: [
      { slug: 'huggingface-datasets', titleKo: 'HuggingFace Datasets', titleEn: 'HuggingFace Datasets', descKo: 'HuggingFace 데이터셋 라이브러리 활용', descEn: 'Using HuggingFace datasets library' },
      { slug: 'kaggle-datasets', titleKo: 'Kaggle 데이터셋', titleEn: 'Kaggle Datasets', descKo: 'Kaggle 데이터셋 검색과 활용', descEn: 'Searching and using Kaggle datasets' },
      { slug: 'custom-dataset', titleKo: '커스텀 데이터셋 구축', titleEn: 'Building Custom Datasets', descKo: '자체 데이터셋 만들기', descEn: 'Creating your own datasets' },
    ],
  },

  // ── 파인튜닝 기법 ──
  {
    slug: 'sft',
    icon: 'fa-graduation-cap',
    nameKo: 'SFT (지도학습 파인튜닝)',
    nameEn: 'SFT (Supervised Fine-Tuning)',
    descKo: '지도학습 기반 파인튜닝의 핵심 기법을 학습합니다',
    descEn: 'Learn core supervised fine-tuning techniques',
    level: 'intermediate',
    lessons: [
      { slug: 'full-finetuning', titleKo: '전체 파인튜닝', titleEn: 'Full Fine-tuning', descKo: '모든 파라미터를 학습하는 방법', descEn: 'Training all parameters' },
      { slug: 'lora', titleKo: 'LoRA', titleEn: 'LoRA', descKo: 'Low-Rank Adaptation 기법', descEn: 'Low-Rank Adaptation technique' },
      { slug: 'qlora', titleKo: 'QLoRA', titleEn: 'QLoRA', descKo: '양자화 기반 효율적 파인튜닝', descEn: 'Quantized efficient fine-tuning' },
      { slug: 'adapter-tuning', titleKo: '어댑터 튜닝', titleEn: 'Adapter Tuning', descKo: '어댑터 레이어 삽입 기법', descEn: 'Adapter layer insertion technique' },
      { slug: 'prefix-tuning', titleKo: '프리픽스 튜닝', titleEn: 'Prefix Tuning', descKo: '학습 가능한 프리픽스 활용', descEn: 'Using learnable prefixes' },
    ],
  },
  {
    slug: 'rlhf',
    icon: 'fa-comments',
    nameKo: 'RLHF & 정렬',
    nameEn: 'RLHF & Alignment',
    descKo: '인간 피드백 기반 강화학습과 모델 정렬',
    descEn: 'Reinforcement learning from human feedback and model alignment',
    level: 'advanced',
    lessons: [
      { slug: 'rlhf-overview', titleKo: 'RLHF 개요', titleEn: 'RLHF Overview', descKo: 'RLHF 파이프라인 이해', descEn: 'Understanding the RLHF pipeline' },
      { slug: 'reward-model', titleKo: '보상 모델 학습', titleEn: 'Reward Model Training', descKo: '보상 모델 구축과 학습', descEn: 'Building and training reward models' },
      { slug: 'ppo-training', titleKo: 'PPO 학습', titleEn: 'PPO Training', descKo: 'Proximal Policy Optimization', descEn: 'Proximal Policy Optimization training' },
      { slug: 'dpo', titleKo: 'DPO (Direct Preference)', titleEn: 'DPO (Direct Preference)', descKo: 'Direct Preference Optimization', descEn: 'Direct Preference Optimization technique' },
    ],
  },

  // ── 프레임워크 & 도구 ──
  {
    slug: 'huggingface',
    icon: 'fa-face-smile',
    nameKo: 'HuggingFace Transformers',
    nameEn: 'HuggingFace Transformers',
    descKo: 'HuggingFace 생태계를 활용한 파인튜닝',
    descEn: 'Fine-tuning with the HuggingFace ecosystem',
    level: 'intermediate',
    lessons: [
      { slug: 'hf-intro', titleKo: 'HuggingFace 시작하기', titleEn: 'Getting Started with HF', descKo: 'Hub, Transformers, Tokenizers 소개', descEn: 'Introduction to Hub, Transformers, Tokenizers' },
      { slug: 'trainer-api', titleKo: 'Trainer API 활용', titleEn: 'Using Trainer API', descKo: 'Trainer로 쉽게 파인튜닝하기', descEn: 'Easy fine-tuning with Trainer' },
      { slug: 'peft-library', titleKo: 'PEFT 라이브러리', titleEn: 'PEFT Library', descKo: 'Parameter-Efficient Fine-Tuning 도구', descEn: 'Parameter-Efficient Fine-Tuning tools' },
      { slug: 'trl-library', titleKo: 'TRL 라이브러리', titleEn: 'TRL Library', descKo: 'Transformer Reinforcement Learning', descEn: 'Transformer Reinforcement Learning library' },
      { slug: 'model-upload', titleKo: '모델 업로드 & 공유', titleEn: 'Model Upload & Share', descKo: 'HuggingFace Hub에 모델 공유하기', descEn: 'Sharing models on HuggingFace Hub' },
    ],
  },
  {
    slug: 'frameworks',
    icon: 'fa-toolbox',
    nameKo: '기타 프레임워크',
    nameEn: 'Other Frameworks',
    descKo: 'Axolotl, Unsloth, LLaMA-Factory 등 도구 활용',
    descEn: 'Using Axolotl, Unsloth, LLaMA-Factory and more',
    level: 'intermediate',
    lessons: [
      { slug: 'axolotl', titleKo: 'Axolotl', titleEn: 'Axolotl', descKo: 'YAML 기반 간편 파인튜닝', descEn: 'YAML-based easy fine-tuning' },
      { slug: 'unsloth', titleKo: 'Unsloth', titleEn: 'Unsloth', descKo: '초고속 파인튜닝 프레임워크', descEn: 'Ultra-fast fine-tuning framework' },
      { slug: 'llama-factory', titleKo: 'LLaMA-Factory', titleEn: 'LLaMA-Factory', descKo: 'WebUI 기반 파인튜닝', descEn: 'WebUI-based fine-tuning' },
      { slug: 'deepspeed', titleKo: 'DeepSpeed', titleEn: 'DeepSpeed', descKo: '대규모 분산 학습 최적화', descEn: 'Large-scale distributed training optimization' },
    ],
  },

  // ── 모델 활용 ──
  {
    slug: 'models',
    icon: 'fa-cube',
    nameKo: '주요 모델 파인튜닝',
    nameEn: 'Key Model Fine-tuning',
    descKo: 'GPT, LLaMA, Gemma 등 주요 모델별 파인튜닝',
    descEn: 'Fine-tuning GPT, LLaMA, Gemma and other key models',
    level: 'intermediate',
    lessons: [
      { slug: 'openai-ft', titleKo: 'OpenAI 파인튜닝', titleEn: 'OpenAI Fine-tuning', descKo: 'GPT-4o-mini API 파인튜닝', descEn: 'GPT-4o-mini API fine-tuning' },
      { slug: 'llama-ft', titleKo: 'LLaMA 파인튜닝', titleEn: 'LLaMA Fine-tuning', descKo: 'Meta LLaMA 모델 파인튜닝', descEn: 'Meta LLaMA model fine-tuning' },
      { slug: 'gemma-ft', titleKo: 'Gemma 파인튜닝', titleEn: 'Gemma Fine-tuning', descKo: 'Google Gemma 모델 파인튜닝', descEn: 'Google Gemma model fine-tuning' },
      { slug: 'mistral-ft', titleKo: 'Mistral 파인튜닝', titleEn: 'Mistral Fine-tuning', descKo: 'Mistral AI 모델 파인튜닝', descEn: 'Mistral AI model fine-tuning' },
      { slug: 'korean-llm', titleKo: '한국어 LLM 파인튜닝', titleEn: 'Korean LLM Fine-tuning', descKo: '한국어 특화 모델 학습', descEn: 'Korean language specific model training' },
    ],
  },

  // ── 평가 & 배포 ──
  {
    slug: 'evaluation',
    icon: 'fa-chart-bar',
    nameKo: '모델 평가',
    nameEn: 'Model Evaluation',
    descKo: '파인튜닝 모델의 성능 평가와 벤치마크',
    descEn: 'Performance evaluation and benchmarking of fine-tuned models',
    level: 'advanced',
    lessons: [
      { slug: 'eval-metrics', titleKo: '평가 지표', titleEn: 'Evaluation Metrics', descKo: 'Perplexity, BLEU, ROUGE 등', descEn: 'Perplexity, BLEU, ROUGE and more' },
      { slug: 'benchmark', titleKo: '벤치마크 테스트', titleEn: 'Benchmark Testing', descKo: 'MMLU, HellaSwag 등 벤치마크', descEn: 'MMLU, HellaSwag and other benchmarks' },
      { slug: 'human-eval', titleKo: '사람 평가', titleEn: 'Human Evaluation', descKo: '사람 평가 프로토콜 설계', descEn: 'Designing human evaluation protocols' },
      { slug: 'ablation', titleKo: '어블레이션 스터디', titleEn: 'Ablation Study', descKo: '하이퍼파라미터 튜닝 실험', descEn: 'Hyperparameter tuning experiments' },
    ],
  },
  {
    slug: 'deployment',
    icon: 'fa-rocket',
    nameKo: '모델 배포',
    nameEn: 'Model Deployment',
    descKo: '학습된 모델을 프로덕션에 배포하는 방법',
    descEn: 'Deploying trained models to production',
    level: 'advanced',
    lessons: [
      { slug: 'model-export', titleKo: '모델 변환 & 양자화', titleEn: 'Model Conversion & Quantization', descKo: 'GGUF, GPTQ, AWQ 변환', descEn: 'GGUF, GPTQ, AWQ conversion' },
      { slug: 'vllm', titleKo: 'vLLM 서빙', titleEn: 'vLLM Serving', descKo: '고성능 LLM 서빙 엔진', descEn: 'High-performance LLM serving engine' },
      { slug: 'api-server', titleKo: 'API 서버 구축', titleEn: 'Building API Server', descKo: 'FastAPI + vLLM 조합', descEn: 'FastAPI + vLLM combination' },
      { slug: 'ollama-local', titleKo: 'Ollama 로컬 배포', titleEn: 'Ollama Local Deployment', descKo: '로컬에서 모델 실행하기', descEn: 'Running models locally' },
    ],
  },

  // ── 실전 프로젝트 ──
  {
    slug: 'projects',
    icon: 'fa-flask',
    nameKo: '실전 프로젝트',
    nameEn: 'Real Projects',
    descKo: '실제 사용 사례 기반 파인튜닝 프로젝트',
    descEn: 'Fine-tuning projects based on real use cases',
    level: 'advanced',
    lessons: [
      { slug: 'chatbot-ft', titleKo: '챗봇 파인튜닝', titleEn: 'Chatbot Fine-tuning', descKo: '고객 응대 챗봇 만들기', descEn: 'Building customer service chatbot' },
      { slug: 'code-assistant', titleKo: '코드 어시스턴트', titleEn: 'Code Assistant', descKo: '코드 생성 모델 파인튜닝', descEn: 'Fine-tuning code generation model' },
      { slug: 'document-qa', titleKo: '문서 QA 시스템', titleEn: 'Document QA System', descKo: 'RAG + 파인튜닝 결합', descEn: 'Combining RAG + fine-tuning' },
      { slug: 'sentiment-analysis', titleKo: '감성 분석 모델', titleEn: 'Sentiment Analysis Model', descKo: '리뷰 감성 분석 파인튜닝', descEn: 'Review sentiment analysis fine-tuning' },
      { slug: 'translation-model', titleKo: '번역 모델', titleEn: 'Translation Model', descKo: '한영 번역 모델 파인튜닝', descEn: 'Korean-English translation model fine-tuning' },
    ],
  },
];

export const MENU_GROUPS = [
  {
    id: 'basics',
    nameKo: '기초 학습',
    nameEn: 'Fundamentals',
    icon: 'fa-book',
    categorySlugs: ['fundamentals', 'python-basics'],
  },
  {
    id: 'data',
    nameKo: '데이터 준비',
    nameEn: 'Data Preparation',
    icon: 'fa-database',
    categorySlugs: ['data-preparation', 'dataset-platforms'],
  },
  {
    id: 'techniques',
    nameKo: '파인튜닝 기법',
    nameEn: 'Fine-tuning Techniques',
    icon: 'fa-sliders',
    categorySlugs: ['sft', 'rlhf'],
  },
  {
    id: 'tools',
    nameKo: '프레임워크 & 도구',
    nameEn: 'Frameworks & Tools',
    icon: 'fa-toolbox',
    categorySlugs: ['huggingface', 'frameworks'],
  },
  {
    id: 'models',
    nameKo: '모델 활용',
    nameEn: 'Model Usage',
    icon: 'fa-cube',
    categorySlugs: ['models'],
  },
  {
    id: 'production',
    nameKo: '평가 & 배포',
    nameEn: 'Evaluation & Deployment',
    icon: 'fa-rocket',
    categorySlugs: ['evaluation', 'deployment'],
  },
  {
    id: 'projects',
    nameKo: '실전 프로젝트',
    nameEn: 'Real Projects',
    icon: 'fa-flask',
    categorySlugs: ['projects'],
  },
];

export function getCategoriesByGroup(groupId) {
  const group = MENU_GROUPS.find(g => g.id === groupId);
  if (!group) return [];
  return group.categorySlugs
    .map(slug => LESSON_CATEGORIES.find(c => c.slug === slug))
    .filter(Boolean);
}

export function getCategoryBySlug(slug) {
  return LESSON_CATEGORIES.find(c => c.slug === slug);
}

export function getTotalLessonCount() {
  return LESSON_CATEGORIES.reduce((sum, cat) => sum + cat.lessons.length, 0);
}
