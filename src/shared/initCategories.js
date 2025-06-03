import Categories from "./Categories.js";
import Category from "../models/Category.js";

export async function initCategories() {
    const categoryNames = Object.values(Categories);

    for (const name of categoryNames) {
        await Category.findOneAndUpdate(
            { name },
            { name },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }
}
