exports.payments = (req, res) => {
    const random = (max = 50) => {
        return Math.floor(Math.random() * max);
    };

    const num = random(10);
    let status = 'paid';
    if (num > 7) {
        status = 'not paid'
    }

    res.json({
        status: status,
        userid: req.body.userid,
    })
}