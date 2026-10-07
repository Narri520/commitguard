/**
 * Haversine formula to calculate the distance between two geographical points in meters.
 * @param {number} lat1 - Latitude of point 1 (Target)
 * @param {number} lon1 - Longitude of point 1 (Target)
 * @param {number} lat2 - Latitude of point 2 (User)
 * @param {number} lon2 - Longitude of point 2 (User)
 * @returns {number} Distance in meters rounded to nearest integer
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Configurable maximum allowed GPS accuracy radius in meters (Default: 150 meters)
const MAX_GPS_ACCURACY_THRESHOLD = Number(process.env.MAX_GPS_ACCURACY) || 150;

module.exports = {
  calculateHaversineDistance,
  MAX_GPS_ACCURACY_THRESHOLD
};
