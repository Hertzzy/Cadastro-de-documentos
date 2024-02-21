const db = require('../models')
const {
    v4: uuidv4
} = require('uuid')

class DocService {

    // Register new doc
    async registerDoc(dto) {
        const doc = await db.docs.findOne({
            where: {
                name: dto.name
            }
        });

        if (doc){
            throw new Error('Documentos já cadastrado')
        }

        try {
            const newDoc = await db.docs.create({
                id: uuidv4(),
                name: dto.name,
                documentType: dto.documentType,
                documentCode: dto.documentCode,
                documentCpf: dto.documentCpf,
                upload: dto.upload
            })

            return newDoc;

        } catch (error) {
            console.error('Message error: ', error.message)
            throw error;
        }
    }
    // Search all docs
    async SearchAllDocs(){
        const docs = await db.docs.findAll()

        if(!docs) {
            throw new Error("Nenhum documento encontrado")
        }

        return docs
    }
    // Search one docs ID
    async SearchDocsId(id){
        const doc = await db.docs.findOne({
            where: {
                id: id
            }
        });

        if(!doc){
            throw new Error("Documento não encontrado")
        }

        return doc;
    }
    // Delete Doc ID
    async deleteDocId(id){
        const doc = await db.docs.findOne({
            where: {
                id: id
            }
        });

        if(!doc){
            throw new Error('Documento informado não encontrado')
        }

        try {
            await db.docs.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error('Erro ao deletar documento', error)
        }


    }
    // Edit Doc
    async editDoc(dto){
        const doc = await db.docs.findOne({
            where: {
                id: dto.id
            }
        });

        if (!doc){
            throw new Error('Documento não cadatrado')
        }

        try {
            doc.name = dto.name
            doc.documentType = dto.documentType
            doc.documentCode = dto.documentCode
            doc.documentCpf = dto.documentCpf
            doc.upload = dto.upload
            
            await doc.save();

            return await doc.reload()

        } catch (error) {
            throw new Error('Erro ao deletar documento', error)
        }
    }

}

module.exports = DocService