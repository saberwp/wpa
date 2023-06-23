class TimeRanges {
    constructor() {
        this.currentDate = new Date();
    }

    getRange(period) {
        const end = new Date(this.currentDate);
        const start = new Date(this.currentDate);

        switch (period) {
            case 'day':
                start.setDate(start.getDate() - 1);
                start.setHours(0, 0, 0, 0);
                break;
            case 'week':
                const daysToSubtract = start.getDay() === 0 ? 7 : start.getDay();
                start.setDate(start.getDate() - daysToSubtract);
                start.setHours(0, 0, 0, 0);
                break;
            case 'month':
                start.setDate(1);
                start.setMonth(start.getMonth() - 1);
                start.setHours(0, 0, 0, 0);
                break;
            case 'year':
                start.setDate(1);
                start.setMonth(0);
                start.setFullYear(start.getFullYear() - 1);
                start.setHours(0, 0, 0, 0);
                break;
            default:
                throw new Error('Invalid period specified.');
        }

        return {
            start: this.formatDate(start),
            end: this.formatDate(end)
        };
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed.
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

// Example usage:
const timeRanges = new TimeRanges();
console.log(timeRanges.getRange('day'));
console.log(timeRanges.getRange('week'));
console.log(timeRanges.getRange('month'));
console.log(timeRanges.getRange('year'));
