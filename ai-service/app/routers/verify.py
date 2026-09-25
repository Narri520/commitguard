from fastapi import APIRouter, HTTPException, status
from app.schemas.verification import ImageVerificationRequest, TextVerificationRequest, VerificationResponse
from app.services.verification_service import ProofVerificationService

router = APIRouter(tags=["Verification"])
verification_service = ProofVerificationService()

@router.post("/verify/image", response_model=VerificationResponse)
async def verify_image_proof(req: ImageVerificationRequest):
    if not req.image_url and not req.image_base64:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Either image_url or image_base64 must be provided."
        )
    source = req.image_url or req.image_base64
    result = await verification_service.verify_image_proof(
        task_type=req.task_type,
        task_description=req.task_description,
        image_source=source
    )
    return result

@router.post("/verify/text", response_model=VerificationResponse)
async def verify_text_proof(req: TextVerificationRequest):
    result = await verification_service.verify_text_proof(
        task_type=req.task_type,
        task_description=req.task_description,
        text_content=req.text_content
    )
    return result
