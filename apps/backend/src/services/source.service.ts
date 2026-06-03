import { SourceRepository } from "../repositories/source.repository";

export class SourceService {
  private sourceRepository = new SourceRepository();

  async getSources() {
    return this.sourceRepository.findAll();
  }
}