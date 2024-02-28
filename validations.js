import { body } from "express-validator";

export const loginValidation = [
    body("email", "Invalid email format").isEmail(),
    body(
        "password",
        "The password must be at least 5 characters long"
    ).isLength({ min: 5 }),
];

export const registerValidation = [
    body("email", "Invalid email format").isEmail(),
    body(
        "password",
        "The password must be at least 5 characters long"
    ).isLength({ min: 5 }),
    body("fullName", "Write correct name").isLength({ min: 3 }),
    body("avatarUrl", "Invalid avatar url").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Write a title of article").isLength({ min: 3 }).isString(),
    body("text", "Write a text of article").isLength({ min: 10 }).isString(),
    body("tags", "Invalid tags format [array]").optional().isString(),
    body("imageUrl", "Invalid image url").optional().isString(),
];
