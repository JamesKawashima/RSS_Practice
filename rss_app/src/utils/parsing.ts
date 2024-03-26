import { Author } from "@/interfaces/Author";

export function AuthorsToString(authors: Author[]): string{
    let finalStr: string = "";
    for (let i = 0; i < authors.length; i++){
        finalStr += authors[i].name;
        if (i !== authors.length){
            finalStr += ", "
        }
    }
    return finalStr;
}