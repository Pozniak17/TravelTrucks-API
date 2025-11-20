import { CampersCollection } from '../db/models/campers.js';

export async function getAllCampers() {
  const campers = await CampersCollection.find();
  return campers;
}

export async function getCamperById(id) {
  const camper = await CampersCollection.findById(id);
  return camper;
}
