const DocService = require('../services/docService')
const docService = new DocService;

class DocController {
    // Register Doc
    static async registerDoc(req, res) {
        const {
            name,
            documentType,
            documentCode,
            documentCpf,
        } = req.body;

        try {
            const doc = await docService.registerDoc({
                name,
                documentType,
                documentCode,
                documentCpf,
                upload: req.file.filename
            })

            res.status(201).json(doc)

        } catch (error) {
            
            console.log('Message error: ', error.message)
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Search all docs
    static async searchAllDocs(req, res) {
        const docs = await docService.searchAllDocs()

        res.status(200).json(docs)
    }

    static async searchDocsId(req, res) {
        try {
            const { id } = req.params;
            const doc = await docService.searchDocsId(id)

            res.status(200).json(doc)
        } catch (error) {
             res.status(400).send({
                 message: error.message
             })
        }
    }

    static async deleteDocId(req, res) {

        try {
            const { id } = req.params;

            await docService.deleteDocId(id)

            res.status(200).send({message: 'Documento deletado com sucesso!'})

        } catch(error){
            res.status(400).send({
                message: error.message
            })
        }
    }

    static async editDoc(req, res) {
        const { id } = req.params;

        const {
            name,
            documentType,
            documentCode,
            documentCpf,
            upload
        } = req.body;

        try {
            const doc = await docService.editDoc({
                id,
                name,
                documentType,
                documentCode,
                documentCpf,
                upload
            });

            res.status(201).json(doc);
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

}

module.exports = DocController