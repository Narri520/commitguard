from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "CommitGuard Python AI Service", "version": "1.0.0"}
