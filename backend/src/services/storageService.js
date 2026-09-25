const fs = require('fs');
const path = require('path');

class StorageService {
  async uploadFile(file) {
    throw new Error('uploadFile method not implemented');
  }
}

class LocalStorageService extends StorageService {
  constructor() {
    super();
    this.uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `proof-${uniqueSuffix}${ext}`;
    const filePath = path.join(this.uploadDir, filename);

    if (file.buffer) {
      fs.writeFileSync(filePath, file.buffer);
    } else if (file.path && fs.existsSync(file.path)) {
      fs.copyFileSync(file.path, filePath);
    }

    return {
      filename,
      url: `/uploads/${filename}`,
      path: filePath
    };
  }
}

class CloudStorageService extends StorageService {
  async uploadFile(file) {
    // Cloud storage implementation (S3/GCS) fallback to local
    const local = new LocalStorageService();
    return await local.uploadFile(file);
  }
}

const getStorageService = () => {
  return new LocalStorageService();
};

module.exports = { StorageService, LocalStorageService, CloudStorageService, getStorageService };
