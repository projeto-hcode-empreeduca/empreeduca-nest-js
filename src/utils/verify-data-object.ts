import { BadRequestException } from "@nestjs/common";

export function verifyDataObject(
    dataObject,
    message: string = "Informe pelo menos um dado para atualização.",
) {

    if (Object.entries(dataObject).length === 0) {
        throw new BadRequestException(message);
    }

}