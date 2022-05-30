export interface InterpolationPoint {
	start: number;
	name: string;
}

export interface InterpolationResult {
	intensity: number;
	name: string;
}

export function interpolate(
	interpolationList: InterpolationPoint[],
	num: number
): InterpolationResult[] {
	if (num > 1) {
		num = 1;
	} else if (num < 0) {
		num = 0;
	}
	let firstOverIdx = 0;
	while (firstOverIdx < interpolationList.length - 1) {
		if (num <= interpolationList[firstOverIdx].start) {
			break;
		}
		firstOverIdx++;
	}
	if (firstOverIdx == 0) {
		return [
			{
				intensity: 1,
				name: interpolationList[firstOverIdx].name
			}
		];
	}
	const secondStart = interpolationList[firstOverIdx].start;
	const firstStart = interpolationList[firstOverIdx - 1].start;
	const diff = secondStart - firstStart;
	const secondFrac = (num - firstStart) / diff;
	const firstFrac = 1 - secondFrac;
	return [
		{
			intensity: firstFrac,
			name: interpolationList[firstOverIdx - 1].name
		},
		{
			intensity: secondFrac,
			name: interpolationList[firstOverIdx].name
		}
	];
}
