import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./backend/images");
    },

    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

export const upload = multer({storage});