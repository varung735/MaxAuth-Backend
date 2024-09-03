const consoleFonts = {
    error: "\x1b[31m",   // Red text
    success: "\x1b[32m", // Green text
    warning: "\x1b[33m",  // Yellow text
    resetFont: "\x1b[0m"  // reset text
};

module.exports = {
    error: (message) => {
        return `${consoleFonts.error}${message}${consoleFonts.resetFont}`;
    },
    success: (message) => {
        return `${consoleFonts.success}${message}${consoleFonts.resetFont}`;
    },
    warning: (message) => {
        return `${consoleFonts.warning}${message}${consoleFonts.resetFont}`;
    }
}