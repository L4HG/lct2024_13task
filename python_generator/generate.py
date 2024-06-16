from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
import io
import logging
import uuid
import os, random

class ImageParams(BaseModel):
    sex: str
    age: str | None = None
    propuctInfo: str | None = None
    chanal: str | None = None
    pictureFormat: str | None = None
    otherData: str | None = None

class ImageS3(BaseModel):
    s3url: str

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.getLogger('botocore').setLevel(logging.INFO)

logger = logging.getLogger(__name__)

s3_url = os.getenv("S3_URL")
s3_user = os.getenv("S3_USER")
s3_pass = os.getenv("S3_PASS")

s3_client = boto3.client('s3', 
                        endpoint_url=f'{s3_url}',
                        aws_access_key_id=f'{s3_user}',
                        aws_secret_access_key=f'{s3_pass}',
                        aws_session_token=None,
                        config=boto3.session.Config(signature_version='s3v4'),
                        verify=True
                    )

@app.post("/get_image/")
async def create_item(image_params: ImageParams) -> ImageS3:
    imagename = uuid.uuid4().hex
    image_bytes = b""
    random_file = random.choice(os.listdir("./images"))
    with open('./images/'+random_file, "rb") as fin:
        s3_client.upload_fileobj(fin, 
                                 'task13', 
                                 imagename,
                                 ExtraArgs={
                                    "ContentType": "image/png"
                                })
    ret_s3  = ImageS3(s3url = f"{s3_url}/task13/{imagename}")
    return  ret_s3

