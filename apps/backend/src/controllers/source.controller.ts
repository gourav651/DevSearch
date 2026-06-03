import { Request, Response } from "express";
import { SourceService } from "../services/source.service";

export class SourceController {
  private sourceService = new SourceService();

  getSources = async (_req: Request, res: Response) => {
    const sources = await this.sourceService.getSources();

    return res.status(200).json({
      success: true,
      data: sources,
    });
  };
}