import type DbResult from "../common/types";

export type BrandReadData = {
    userId: String,
};



export type BrandReadResult = DbResult<{
    name: String,
}[]>;