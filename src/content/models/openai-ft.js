export default {
  contentKo: `# OpenAI 파인튜닝

## OpenAI 파인튜닝 API

OpenAI는 **gpt-4o-mini**, gpt-3.5-turbo 등의 파인튜닝을 API로 제공합니다.

## 데이터 형식 (ChatML JSONL)

\`\`\`jsonl
{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "질문"}, {"role": "assistant", "content": "답변"}]}
\`\`\`

## 파인튜닝 실행

\`\`\`python
from openai import OpenAI
client = OpenAI()

# 파일 업로드
file = client.files.create(file=open("train.jsonl", "rb"), purpose="fine-tune")

# 파인튜닝 작업 생성
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18",
    hyperparameters={"n_epochs": 3},
)

# 상태 확인
print(client.fine_tuning.jobs.retrieve(job.id))
\`\`\`

## 사용

\`\`\`python
response = client.chat.completions.create(
    model="ft:gpt-4o-mini-2024-07-18:my-org::abc123",  # 파인튜닝된 모델
    messages=[{"role": "user", "content": "질문"}]
)
\`\`\`

## 다음 단계

다음 레슨에서는 **LLaMA 파인튜닝**을 학습합니다.
`,
  contentEn: `# OpenAI Fine-tuning

## API-based Fine-tuning

OpenAI provides fine-tuning for gpt-4o-mini and gpt-3.5-turbo via API.

## Data Format (ChatML JSONL)

\`\`\`jsonl
{"messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
\`\`\`

## Run Fine-tuning

\`\`\`python
from openai import OpenAI
client = OpenAI()
file = client.files.create(file=open("train.jsonl", "rb"), purpose="fine-tune")
job = client.fine_tuning.jobs.create(training_file=file.id, model="gpt-4o-mini-2024-07-18")
\`\`\`

## Next Steps

Next lesson covers **LLaMA Fine-tuning**.
`,
};
