import { Vehicle } from "@prisma/client";
import { type } from "os";


export type BrandReadData = {
    userId: String,
};

export type BrandReadResult = {
    brands: String[],
};