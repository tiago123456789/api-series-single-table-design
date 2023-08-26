import bcryptjs from "bcryptjs"

class Encrypter {

    getHash(value: string): Promise<string> {
        return bcryptjs.hash(value, 8)
    }

    compare(value: string, hash: string): Promise<boolean> {
        return bcryptjs.compare(value, hash);
    }
}

export default Encrypter;