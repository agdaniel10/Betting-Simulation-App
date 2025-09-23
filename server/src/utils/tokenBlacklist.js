class TokenBlacklist {
    constructor() {
        this.blacklistedTokens = new Set();
        
        // Optional: Clean expired tokens periodically
        this.cleanupInterval = setInterval(() => {
            this.cleanExpiredTokens();
        }, 60 * 60 * 1000); // Clean every hour
    }

    // Add token to blacklist
    addToken(token) {
        this.blacklistedTokens.add(token);
        console.log(`Token blacklisted. Total blacklisted: ${this.blacklistedTokens.size}`);
    }

    // Check if token is blacklisted
    isBlacklisted(token) {
        return this.blacklistedTokens.has(token);
    }

    // Optional: Clean expired tokens to prevent memory leaks
    cleanExpiredTokens() {
        // This is a simple cleanup - in production you'd decode tokens and check expiry
        // For now, clear all tokens older than JWT expiry time
        if (this.blacklistedTokens.size > 1000) { // Arbitrary limit
            console.log('Clearing old blacklisted tokens...');
            this.blacklistedTokens.clear();
        }
    }

    // Get blacklist size (for monitoring)
    getSize() {
        return this.blacklistedTokens.size;
    }
}

// Create singleton instance
const tokenBlacklist = new TokenBlacklist();

export default tokenBlacklist;