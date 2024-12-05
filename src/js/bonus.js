import * as c from "./constants.js";

// This is just a matrix multiplication function I found online cuz i aint writing allat and I couldn't find a library
function multMatrices(a ,b){
	if (a[0].length !== b.length)
		throw new Error("Nuh Uh!!! You can't do that!!!");

	let result = [];
	for (let i = 0; i < a.length; i++) {
		result[i] = [];
		for (let j = 0; j < b[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < a[0].length; k++)
				sum += a[i][k] * b[k][j];
			result[i][j] = sum;
		}
	}

	return result;
}

// Distance Formula
function distance(antennaCords, probeCords){
	let first = (probeCords[0] - antennaCords[0])**2;
	let second = (probeCords[1] - antennaCords[1])**2;
	let third = (probeCords[2] - antennaCords[2])**2;
	return Math.sqrt(first + second + third);
}

function rotationMatrix(timeElapsed){
	const earthTilt = 0.40910518;
	const earthRotation = 0.0043752689390883629091912824047036316217347442667247770055869327107291376933374649965090290441628832370979032264616092647931526225026442232147712881989155271345349586303407442060355058319830324161455127;
	// Initializes the rotation angles
	// Earth's tilt
	let thetaX = earthTilt; 
	// Earth's Rotation
	let thetaY = earthRotation * timeElapsed;

	// Rotation matrices (got these on wikipedia cuz i am NOT doing ts myself)
	let rX = [
		[1,                   0,  0],
		[0, Math.cos(thetaX), -Math.sin(thetaX)],
		[0, Math.sin(thetaX), Math.cos(thetaX)]
	]; 
	let rY = [
		[Math.cos(thetaY), 0, Math.sin(thetaY)],
		[0,              1, 0],
		[-Math.sin(thetaY), 0, Math.cos(thetaY)]
	];

	// Multiplies and returns the 2 matricies
	return multMatrices(rX, rY)
}

function antennaLoc(antenna, timeElapsed){
	let radLat = c.antennaPositions[antenna][0];
	let radLong = c.antennaPositions[antenna][1];

	let totalRadius = c.earthRadius + c.antennaPositions[antenna][2];

	// Used the Math from the handbook to change it into x,y,z cords
	let x = totalRadius * Math.cos(radLat) * Math.cos(radLong);
	let y = totalRadius * Math.cos(radLat) * Math.sin(radLong);
	let z = totalRadius * Math.sin(radLat);

	let initialPos = [[x], [y], [z]];

	let rotation = rotationMatrix(timeElapsed);

	return multMatrices(rotation, initialPos);
}

function bonusBudget(antenna, probeX, probeY, probeZ, time){
	let antennaPos = antennaLoc(antenna, time);
	let probe = [probeX, probeY, probeZ];

	return distance(antennaPos, probe)
}

console.log(rotationMatrix(100));