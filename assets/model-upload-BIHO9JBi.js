const e={contentKo:`# 모델 업로드 & 공유

## Hub에 업로드

\`\`\`python
# Trainer를 통한 자동 업로드
trainer.push_to_hub("my-username/my-model")

# 직접 업로드
model.push_to_hub("my-username/my-model", private=True)
tokenizer.push_to_hub("my-username/my-model")
\`\`\`

## 모델 카드 작성

README.md에 모델 정보를 기록합니다:
- 기반 모델, 학습 데이터, 하이퍼파라미터
- 성능 벤치마크, 사용 예시
- 라이선스 정보

## GGUF 변환 (공유용)

\`\`\`bash
# llama.cpp로 GGUF 변환
python convert_hf_to_gguf.py ./my-model --outtype q4_k_m

# Ollama에서 바로 사용 가능
\`\`\`

## Spaces 데모

Gradio를 활용하여 모델 데모를 만들 수 있습니다.

\`\`\`python
import gradio as gr

def generate(prompt):
    return pipe(prompt, max_new_tokens=200)[0]["generated_text"]

demo = gr.Interface(fn=generate, inputs="text", outputs="text")
demo.launch()
\`\`\`

## 라이선스

- Apache 2.0: 자유로운 상업적 사용
- Llama License: Meta 조건부 라이선스
- CC-BY-NC: 비상업적 사용만

## 다음 단계

다음 카테고리에서는 **기타 프레임워크**를 학습합니다.
`,contentEn:`# Model Upload & Share

## Upload to Hub

\`\`\`python
trainer.push_to_hub("my-username/my-model")
model.push_to_hub("my-username/my-model", private=True)
\`\`\`

## Model Card

Document base model, training data, hyperparameters, benchmarks, and license in README.md.

## GGUF Conversion

\`\`\`bash
python convert_hf_to_gguf.py ./my-model --outtype q4_k_m
\`\`\`

## Spaces Demo with Gradio

\`\`\`python
import gradio as gr
demo = gr.Interface(fn=generate, inputs="text", outputs="text")
demo.launch()
\`\`\`

## Next Steps

Next category covers **Other Frameworks**.
`};export{e as default};
