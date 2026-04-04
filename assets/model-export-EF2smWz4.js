const o={contentKo:`# 모델 변환 & 양자화

## 왜 양자화하는가?

- 모델 크기 축소 (7B: 14GB → 4GB)
- 추론 속도 향상
- 저사양 환경에서 실행 가능

## 양자화 방법 비교

| 방법 | 비트 | 품질 | 속도 | 도구 |
|------|------|------|------|------|
| GGUF (Q4_K_M) | 4bit | 좋음 | 빠름 | llama.cpp |
| GPTQ | 4bit | 좋음 | 빠름 | AutoGPTQ |
| AWQ | 4bit | 매우 좋음 | 빠름 | AutoAWQ |
| bitsandbytes | 4/8bit | 좋음 | 보통 | bitsandbytes |

## GGUF 변환 (llama.cpp)

\`\`\`bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# HuggingFace → GGUF 변환
python convert_hf_to_gguf.py ./my-model --outtype q4_k_m --outfile model-q4.gguf
\`\`\`

## GPTQ 양자화

\`\`\`python
from transformers import AutoModelForCausalLM, GPTQConfig

quantization_config = GPTQConfig(bits=4, dataset="c4")
model = AutoModelForCausalLM.from_pretrained(
    "./my-model", quantization_config=quantization_config, device_map="auto"
)
model.save_pretrained("./my-model-gptq")
\`\`\`

## 다음 단계

다음 레슨에서는 **vLLM 서빙**을 학습합니다.
`,contentEn:`# Model Conversion & Quantization

## Why Quantize?

Reduce model size (7B: 14GB → 4GB), improve inference speed, enable low-resource deployment.

## Comparison

| Method | Bits | Quality | Tool |
|--------|------|---------|------|
| GGUF | 4bit | Good | llama.cpp |
| GPTQ | 4bit | Good | AutoGPTQ |
| AWQ | 4bit | Very Good | AutoAWQ |

## GGUF Conversion

\`\`\`bash
python convert_hf_to_gguf.py ./my-model --outtype q4_k_m --outfile model-q4.gguf
\`\`\`

## Next Steps

Next lesson covers **vLLM Serving**.
`};export{o as default};
