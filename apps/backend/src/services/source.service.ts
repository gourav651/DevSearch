import { SourceRepository } from "../repositories/source.repository";
import { AppError } from "../utils/AppError";

export class SourceService {
  private sourceRepository = new SourceRepository();

  async getSources() {
    return this.sourceRepository.findAll();
  }

  async getSourceById(id: string) {
  const source = await this.sourceRepository.findById(id);

  if (!source) {
    throw new AppError("Source not found", 404);
  }

  return source;
}
}