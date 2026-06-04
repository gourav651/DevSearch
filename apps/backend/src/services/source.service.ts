import { SourceRepository } from "../repositories/source.repository";
import { AppError } from "../utils/AppError";
import { toSourceDto, SourceResponseDto } from "../dtos/source.dto";

export class SourceService {
  private sourceRepository = new SourceRepository();

  async getSources(): Promise<SourceResponseDto[]> {
    const sources = await this.sourceRepository.findAll();

    return sources.map(toSourceDto);
  }

  async getSourceById(id: string): Promise<SourceResponseDto> {
    const source = await this.sourceRepository.findById(id);

    if (!source) {
      throw new AppError("Source not found", 404);
    }

    return toSourceDto(source);
  }
}