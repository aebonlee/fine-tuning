const e={contentKo:`# Jupyter Notebook 설정

## 설치

\`\`\`bash
pip install jupyterlab notebook
jupyter lab  # JupyterLab 실행
\`\`\`

## Google Colab

무료 GPU를 제공하는 가장 쉬운 실습 환경입니다.
- **런타임 유형 변경**: 런타임 → 런타임 유형 변경 → GPU (T4)
- Pro 구독 시 A100, V100 사용 가능

\`\`\`python
# Colab에서 GPU 확인
!nvidia-smi
import torch
print(torch.cuda.get_device_name(0))
\`\`\`

## VS Code Jupyter 확장

VS Code에서 \`.ipynb\` 파일을 직접 편집할 수 있습니다.
- Python 확장 + Jupyter 확장 설치
- 커널 선택 후 셀 실행

## 유용한 매직 명령어

\`\`\`python
%time model.generate(**inputs)      # 실행 시간 측정
%memit model.generate(**inputs)     # 메모리 사용량
!nvidia-smi                         # GPU 모니터링
\`\`\`

## 다음 단계

다음 레슨에서는 **GPU 환경 설정**을 학습합니다.
`,contentEn:`# Jupyter Notebook Setup

## Installation

\`\`\`bash
pip install jupyterlab notebook
jupyter lab
\`\`\`

## Google Colab

Easiest environment with free GPU access.
- **Change runtime**: Runtime → Change runtime type → GPU (T4)

\`\`\`python
!nvidia-smi
import torch
print(torch.cuda.get_device_name(0))
\`\`\`

## VS Code Jupyter Extension

Edit \`.ipynb\` files directly in VS Code with Python + Jupyter extensions.

## Useful Magic Commands

\`\`\`python
%time model.generate(**inputs)
%memit model.generate(**inputs)
!nvidia-smi
\`\`\`

## Next Steps

Next lesson covers **GPU Environment Setup**.
`};export{e as default};
