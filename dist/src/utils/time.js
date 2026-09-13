export const toMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    if (hour === undefined || minute === undefined || Number.isNaN(hour) || Number.isNaN(minute)) {
        throw new Error("Time must be in HH:mm format");
    }
    ;
    return hour * 60 + minute;
};
export const toHHmm = (minutes) => `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
//# sourceMappingURL=time.js.map