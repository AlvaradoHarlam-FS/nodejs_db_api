const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
res.json({
    message: "Authors - get"
})
});
router.post("/", (req, res, next) => {
    res.json({
        message: "Authors - post"
    })
    });
        router.patch("/:authorId", (req, res, next) => {
            const authorId = req.params.authorId;
            res.json({
                message: "Authors - patch",
                id: authorId 
            })
            });

            router.delete("/", (req, res, next) => {
                res.json({
                    message: "Authors - delete"
                })
                });
                router.get("/:authorId", (req, res, next) => {
                    const authorId = req.params.authorId;
                    res.json({
                        message: "Authors - get",
                        id: authorId 
                    })
                    });

module.exports = router; 