from app.config import settings
from app.services.ai_provider import AIProvider, MockAIProvider, RealAIProvider
from app.schemas.verification import VerificationResponse

class ProofVerificationService:
    def __init__(self):
        if settings.AI_PROVIDER.lower() == "real":
            self.provider: AIProvider = RealAIProvider(api_key=settings.AI_API_KEY)
        else:
            self.provider: AIProvider = MockAIProvider()

    async def verify_image_proof(self, task_type: str, task_description: str, image_source: str) -> VerificationResponse:
        res = await self.provider.verify_image(task_type, task_description, image_source)
        # Apply threshold status mapping
        if res.confidence >= settings.CONFIDENCE_THRESHOLD:
            res.status = "VERIFIED"
            res.verified = True
        elif res.confidence >= 0.50:
            res.status = "NEEDS_REVIEW"
            res.verified = False
        else:
            res.status = "REJECTED"
            res.verified = False
        return res

    async def verify_text_proof(self, task_type: str, task_description: str, text_content: str) -> VerificationResponse:
        res = await self.provider.verify_text(task_type, task_description, text_content)
        if res.confidence >= settings.CONFIDENCE_THRESHOLD:
            res.status = "VERIFIED"
            res.verified = True
        elif res.confidence >= 0.50:
            res.status = "NEEDS_REVIEW"
            res.verified = False
        else:
            res.status = "REJECTED"
            res.verified = False
        return res
