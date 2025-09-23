class TokenBlacklist {
    constructor() {
        this.blacklistedTokens = new Set();
        
        this.cleanupInterval = setInterval(() => {
            this.cleanExpiredTokens();
        }, 60 * 60 * 1000);
    }

    addToken(token) {
        this.blacklistedTokens.add(token);
        console.log(`Token blacklisted. Total blacklisted: ${this.blacklistedTokens.size}`);
    }

    isBlacklisted(token) {
        return this.blacklistedTokens.has(token);
    }

    cleanExpiredTokens() {
        if (this.blacklistedTokens.size > 1000) {
            console.log('Clearing old blacklisted tokens...');
            this.blacklistedTokens.clear();
        }
    }

    getSize() {
        return this.blacklistedTokens.size;
    }
}

const tokenBlacklist = new TokenBlacklist();

export default tokenBlacklist;