import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_verify_image_success():
    payload = {
        "task_type": "study",
        "task_description": "Complete Python DSA practice",
        "proof_type": "image",
        "image_url": "http://example.com/proof.jpg"
    }
    response = client.post("/verify/image", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["verified"] is True
    assert data["confidence"] >= 0.80
    assert data["status"] == "VERIFIED"

def test_verify_image_health_disclaimer():
    payload = {
        "task_type": "health",
        "task_description": "Take evening vitamin pills",
        "proof_type": "image",
        "image_url": "http://example.com/pills.jpg"
    }
    response = client.post("/verify/image", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["verified"] is True
    # Verify safety requirement for medicine: AI must NOT claim ingestion
    assert "cannot verify biological ingestion" in data["reason"]

def test_verify_text_short_rejected():
    payload = {
        "task_type": "reading",
        "task_description": "Read 20 pages",
        "proof_type": "text",
        "text_content": "done"
    }
    response = client.post("/verify/text", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["verified"] is False
    assert data["status"] == "REJECTED"
