const express = require('express');
const { submitProof, getProofByCommitment } = require('../controllers/proofController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const proofRouter = express.Router();

proofRouter.use(protect);
proofRouter.post('/:id/proof', upload.single('file'), submitProof);
proofRouter.get('/:id/proof', getProofByCommitment);

module.exports = proofRouter;
