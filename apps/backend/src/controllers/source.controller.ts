import { Request, Response } from "express";
import { SourceService } from "../services/source.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export class SourceController {
  private sourceService = new SourceService();

  getSources = asyncHandler(async (_req: Request, res: Response) => {
    const sources = await this.sourceService.getSources();

    return ApiResponse.success(
      res,
      sources,
      "Sources fetched successfully"
    );
  });

  getSourceById = asyncHandler(
    async (req: Request, res: Response) => {
      const source = await this.sourceService.getSourceById(
        req.params.id as string
      );

      return ApiResponse.success(
        res,
        source,
        "Source fetched successfully"
      );
    }
  );
}