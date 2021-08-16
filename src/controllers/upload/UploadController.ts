import {BodyParams, Controller, Get, MultipartFile, Post, QueryParams, RawBodyParams, Req, Res} from "@tsed/common";
import {BadRequest, PaymentRequired} from "@tsed/exceptions";
import {access, appendFile, rm, writeFile} from "fs/promises";
import {constants} from "fs";
import {outputFile, readFile} from "fs-extra";
import {Required} from "@tsed/schema";

type FilePayload = string;

const contactChunks = async ({resumableTotalChunks, resumableIdentifier, resumableFilename}: any) => {
    let i = 1;

    try {

        while (i <= parseInt(resumableTotalChunks)) {
            console.info(i)
            await access(`./public/media/${i}-${resumableIdentifier}-${resumableFilename}`, constants.R_OK | constants.W_OK)
            const data = await readFile(`./public/media/${i}-${resumableIdentifier}-${resumableFilename}`)
            await appendFile(`./public/media/${resumableFilename}`, data);
            await rm(`./public/media/${i}-${resumableIdentifier}-${resumableFilename}`)
            i++
        }
    } catch (e) {
        console.info(e)

    } finally {

    }
}

@Controller("/upload")
export class UploadController {
    @Get("/resumable",)
    async startResumable(@Res() res: Res,
                         @QueryParams("resumableIdentifier") resumableIdentifier: string,
                         @QueryParams("resumableFilename") resumableFilename: string,
                         @QueryParams("resumableChunkNumber") resumableChunkNumber: string,
                         @QueryParams("resumableTotalChunks") resumableTotalChunks: string,
    ): Promise<string> {
        // 先检查合成文件是否存在
        // 再检查是否有片段
        // 可以新开个线程去搞合并？
        try {
            const hasTotalFile = await access(`./public/media/${resumableFilename}`, constants.R_OK | constants.W_OK).then(() => true).catch(() => false);

            if (hasTotalFile) {
                return `/media/${resumableFilename}`
            }
            await access(`./public/media/${resumableChunkNumber}-${resumableIdentifier}-${resumableFilename}`, constants.R_OK | constants.W_OK);
            return resumableChunkNumber
        } catch (e) {
            throw(new PaymentRequired("Not Found"));
        }

    }

    @Post("/resumable",)
    async resumable(
        @QueryParams("resumableChunkNumber") resumableChunkNumber: string,
        @QueryParams("resumableIdentifier") resumableIdentifier: string,
        @QueryParams("resumableFilename") resumableFilename: string,
        @QueryParams("resumableTotalChunks") resumableTotalChunks: string,
        @MultipartFile("file") @Required() files: Express.Multer.File[],
    ): Promise<string> {
        const currentChunk = `./public/media/${resumableChunkNumber}-${resumableIdentifier}-${resumableFilename}`
        await outputFile(currentChunk, files[0].buffer)
        if (resumableTotalChunks === resumableChunkNumber) {
            await contactChunks({resumableTotalChunks, resumableIdentifier, resumableChunkNumber, resumableFilename})
            return `/media/${resumableFilename}`
        }
        return resumableChunkNumber
    }
}
