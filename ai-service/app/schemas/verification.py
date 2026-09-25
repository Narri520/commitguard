from pydantic import BaseModel, Field
from typing import Optional

class ImageVerificationRequest(BaseModel):
    task_type: str = Field(..., description="Task category e.g. study, health, fitness")
    task_description: str = Field(..., description="Task detail description")
    proof_type: str = Field(default="image", description="Type of proof submitted")
    image_url: Optional[str] = None
    image_base64: Optional[str] = None

class TextVerificationRequest(BaseModel):
    task_type: str = Field(..., description="Task category e.g. reading, study")
    task_description: str = Field(..., description="Task detail description")
    proof_type: str = Field(default="text", description="Type of proof submitted")
    text_content: str = Field(..., description="Submitted text proof content")

class VerificationResponse(BaseModel):
    verified: bool
    confidence: float
    reason: str
    status: str  # VERIFIED, NEEDS_REVIEW, REJECTED
    provider: str = "mock"
