const Minio = require('minio')
export const client = new Minio.Client({
    endPoint: 'minio.smartreportz.com',
    port: 9000,
    useSSL: false,
    accessKey: process.env.ACCESS_KEY_MINIO,
    secretKey: process.env.SECRET_KEY_MINIO
})
export default function hello (req, res) {
    client.presignedPutObject(`smartreportzuploads${ req.query.idPro }`, req.query.name, (err, url) => {
        if (err) throw err
        res.send(url)
    })
}
