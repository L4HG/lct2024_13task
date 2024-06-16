import io
import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
from fastapi import FastAPI, Response
app = FastAPI()
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1", torch_dtype=torch.float16, use_safetensors=True)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.to("cuda")
@app.get("/generate")
def generate(prompt: str):
    image_store = io.BytesIO()
    images = pipe(prompt).images
    images[0].save(image_store, "PNG")
    return Response(content=image_store.getvalue(), media_type="image/png")