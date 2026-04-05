export default {
  contentKo: `# 데이터 정제

## 중복 제거

\`\`\`python
import hashlib
from datasets import load_dataset

def deduplicate(dataset):
    seen = set()
    unique = []
    for item in dataset:
        h = hashlib.md5(item['text'].encode()).hexdigest()
        if h not in seen:
            seen.add(h)
            unique.append(item)
    return unique
\`\`\`

## 품질 필터링

\`\`\`python
def quality_filter(example):
    text = example['response']
    if len(text) < 50:           return False  # 너무 짧은 응답
    if len(text) > 10000:        return False  # 너무 긴 응답
    if text.count('\\n') > 100:   return False  # 과도한 줄바꿈
    return True

dataset = dataset.filter(quality_filter)
\`\`\`

## PII(개인정보) 제거

이메일, 전화번호, 주민번호 등 개인정보를 마스킹하거나 제거합니다.

\`\`\`python
import re

def remove_pii(text):
    text = re.sub(r'[\\w.-]+@[\\w.-]+', '[EMAIL]', text)
    text = re.sub(r'\\d{3}-\\d{4}-\\d{4}', '[PHONE]', text)
    return text
\`\`\`

## 언어 감지 및 필터링

\`\`\`python
from langdetect import detect

def filter_korean(example):
    try:
        return detect(example['text']) == 'ko'
    except:
        return False
\`\`\`

## 다음 단계

다음 레슨에서는 **데이터 포맷팅**을 학습합니다.
`,
  contentEn: `# Data Cleaning

## Deduplication

\`\`\`python
import hashlib

def deduplicate(dataset):
    seen = set()
    unique = []
    for item in dataset:
        h = hashlib.md5(item['text'].encode()).hexdigest()
        if h not in seen:
            seen.add(h)
            unique.append(item)
    return unique
\`\`\`

## Quality Filtering

\`\`\`python
def quality_filter(example):
    text = example['response']
    if len(text) < 50: return False
    if len(text) > 10000: return False
    return True

dataset = dataset.filter(quality_filter)
\`\`\`

## PII Removal

\`\`\`python
import re
def remove_pii(text):
    text = re.sub(r'[\\w.-]+@[\\w.-]+', '[EMAIL]', text)
    text = re.sub(r'\\d{3}-\\d{4}-\\d{4}', '[PHONE]', text)
    return text
\`\`\`

## Next Steps

Next lesson covers **Data Formatting**.
`,
};
