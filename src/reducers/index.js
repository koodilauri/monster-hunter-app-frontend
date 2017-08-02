import { submission } from "./submission"
import { quest } from "./quest"
import { armor } from "./armor"
import { skill } from "./skill"
import { hunterArt } from "./hunterArt"
import { weapon } from "./weapon"
import { decoration } from "./decoration"
import { armorSetForm } from "./armorSetForm"
import { combineReducers } from "redux"

export default combineReducers({ submission, quest, armor, skill, hunterArt, weapon, decoration, armorSetForm })