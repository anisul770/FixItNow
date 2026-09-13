export const notFound = (req, res) => {
    res.status(404).json({
        message: "Route not Found",
        path: req.originalUrl,
        date: Date()
    });
};
//# sourceMappingURL=notFound.js.map