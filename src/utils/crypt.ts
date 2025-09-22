import bcrypt from "bcrypt";

// export async function encode(
// 	input: string,
// 	factory: number = 10,
// ): Promise<string> {
// 	const result = await bcrypt.hash(input, factory);
// 	return result;
// }

export class Crypt {
	private _saltRounds: number;

	constructor(saltRounds: number = 10) {
		this._saltRounds = saltRounds;
	}

	get saltRounds(): number {
		return this._saltRounds;
	}

	set saltRounds(rounds: number) {
		if (rounds < 4 || rounds > 31) {
			throw new Error("Salt rounds must be between 4 and 31.");
		}
		this._saltRounds = rounds;
	}

	getSaltRounds() {
		return this.saltRounds;
	}

	setSaltRounds(rounds: number) {
		this.saltRounds = rounds;
	}

	async encode(input: string): Promise<string> {
		return await bcrypt.hash(input, this.saltRounds);
	}

	async compare(raw: string, hashed: string): Promise<boolean> {
		return await bcrypt.compare(raw, hashed);
	}
}
