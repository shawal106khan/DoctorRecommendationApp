/**
 * @typedef {Object} User
 * @property {string} uid
 * @property {string} name
 * @property {string} email
 * @property {"patient" | "doctor" | "admin"} role
 *
 * // Doctor-only
 * @property {"pending" | "approved"} [status]
 * @property {boolean} [profileCompleted]
 */
