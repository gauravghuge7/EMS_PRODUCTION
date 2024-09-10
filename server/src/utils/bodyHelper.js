import ApiError from "./ApiError.js"

export const checkArgsIfExists = (...args) => {
    for (let arg of args) {
        if (!args) {
            throw new ApiError(400, "Required Input not Found")
        }
    }
}

export const checkIfStringArgsIsEmpty = (...args) => {
    for (let arg of args) {
        if (args.length == 0) {
            throw new ApiError(400, "Required Input Found Empty")
        }
    }
}