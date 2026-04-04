const e={contentKo:`# API 서버 구축

## FastAPI + vLLM

\`\`\`python
from fastapi import FastAPI
from openai import OpenAI
from pydantic import BaseModel

app = FastAPI()
client = OpenAI(base_url="http://localhost:8000/v1", api_key="dummy")

class ChatRequest(BaseModel):
    message: str
    max_tokens: int = 512

@app.post("/chat")
async def chat(req: ChatRequest):
    response = client.chat.completions.create(
        model="my-model",
        messages=[{"role": "user", "content": req.message}],
        max_tokens=req.max_tokens,
    )
    return {"response": response.choices[0].message.content}
\`\`\`

## 스트리밍 응답

\`\`\`python
from fastapi.responses import StreamingResponse

@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    def generate():
        stream = client.chat.completions.create(
            model="my-model",
            messages=[{"role": "user", "content": req.message}],
            stream=True,
        )
        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    return StreamingResponse(generate(), media_type="text/plain")
\`\`\`

## Docker 배포

\`\`\`dockerfile
FROM python:3.11-slim
COPY . /app
WORKDIR /app
RUN pip install fastapi uvicorn openai
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
\`\`\`

## 프로덕션 체크리스트

- 인증 (API Key / JWT)
- Rate Limiting
- 로깅 & 모니터링
- Nginx 리버스 프록시
- SSL/TLS 인증서

## 다음 단계

다음 레슨에서는 **Ollama 로컬 배포**를 학습합니다.
`,contentEn:`# Building API Server

## FastAPI + vLLM

\`\`\`python
from fastapi import FastAPI
from openai import OpenAI

app = FastAPI()
client = OpenAI(base_url="http://localhost:8000/v1", api_key="dummy")

@app.post("/chat")
async def chat(message: str):
    response = client.chat.completions.create(
        model="my-model", messages=[{"role": "user", "content": message}])
    return {"response": response.choices[0].message.content}
\`\`\`

## Production Checklist

Authentication, Rate Limiting, Logging, Nginx reverse proxy, SSL/TLS

## Next Steps

Next lesson covers **Ollama Local Deployment**.
`};export{e as default};
