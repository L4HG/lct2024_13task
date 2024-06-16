#!/bin/bash
python3 -m pip install -U langchain gigachat pymongo \
fastapi requests opencv-contrib-python boto3 \
aiohttp aiofiles langsmith langchainhub langchain_experimental \
&& cd /lct/python_generator && fastapi run generate.py
