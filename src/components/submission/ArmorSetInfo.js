import React from "react";
import { connect } from "react-redux"
import image from "../../images/"

import "./ArmorSetInfo.css"

class ArmorSetInfo extends React.Component {
  state = {
    armorSet: {},
    setDecorations: [],
    weapon: {},
    skillSums: {
      skill: [],
      amount: [],
      effect: []
    },
    skills: {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.set_id !== this.props.set_id && this.props.set_id !== -1) {
      this.findArmorSet()
    }
  }

  findArmorSet() {
    const newSet = this.props.armorSets.find(x => x.id === this.props.set_id)
    const newDecorations = this.props.setDecorations.filter(deco => deco.set_id === newSet.id)
    const newWeapon = this.props.weapons.find(x => x.id === newSet.weapon_id)
    this.setState({
      armorSet: newSet,
      setDecorations: newDecorations,
      weapon: newWeapon
    })
    this.calculateSkills(newSet, newDecorations)
  }

  calculateSkills(set, decorations) {
    const charm = this.props.charms.find(x => x.id === set.charm_id)
    let skills = {
      selectedHead: this.getSkills(set.head_id),
      selectedTorso: this.getSkills(set.torso_id),
      selectedArms: this.getSkills(set.arms_id),
      selectedWaist: this.getSkills(set.waist_id),
      selectedFeet: this.getSkills(set.feet_id),
      selectedCharm: {
        [this.props.skills.find(x => x.id === charm.skill1_id).name]: charm.bonus1,
        [this.props.skills.find(x => x.id === charm.skill2_id).name]: charm.bonus2
      }
    }
    const decos = this.addDecos(skills, decorations) //gets the skills from decorations
    const skillMatrix = this.parseSkills(skills, decos) //sums up the skills so they can be shown in the 'total' colum
    this.setState({
      skills: skills,
      skillSums: skillMatrix,
    })
  }

  addDecos(skills, setDecorations) {
    let newValues = {}
    let deco1 = {}
    let deco2 = {}
    let deco3 = {}
    Object.keys(skills).map(key => {  //doesnt really need the 'skills' var, only wants the 'selected*' keys
      let decos = setDecorations.find(x => x.part === key)
      if (decos !== undefined) {
        deco1 = this.props.decorations.find(x => x.id === decos.decoration1_id)
        deco2 = this.props.decorations.find(x => x.id === decos.decoration2_id)
        deco3 = this.props.decorations.find(x => x.id === decos.decoration3_id)
        newValues = Object.assign({}, newValues, {
          [key]: {
            [this.props.skills.find(x => x.id === deco1.skill1_id).name]: deco1.bonus1,
            [this.props.skills.find(x => x.id === deco1.skill2_id).name]: deco1.bonus2,
            [this.props.skills.find(x => x.id === deco2.skill1_id).name]: deco2.bonus1,
            [this.props.skills.find(x => x.id === deco2.skill2_id).name]: deco2.bonus2,
            [this.props.skills.find(x => x.id === deco3.skill1_id).name]: deco3.bonus1,
            [this.props.skills.find(x => x.id === deco3.skill2_id).name]: deco3.bonus2,
          }
        })
      }
      return 0
    })
    return newValues
  }

  parseSkills(skills, decos) {
    let skillMatrix = { skill: [], amount: [], effect: [] }
    Object.keys(skills).map((key1, id1) => {
      Object.keys(skills[key1]).map((key2) => {
        let name = key2
        let amount = skills[key1][key2]
        let index = skillMatrix.skill.indexOf(name)//check if skill is already in skillMatrix
        if (index === -1) {
          if (name !== "---") {
            skillMatrix.skill = skillMatrix.skill.concat(name)
            skillMatrix.amount = skillMatrix.amount.concat(amount)
          }
        }
        else {
          skillMatrix.amount[index] += amount
        }
        return 0
      })
      if (decos[key1] !== undefined)
        Object.keys(decos[key1]).map(key3 => {
          //repeat all the things! 
          let name = key3
          let amount = decos[key1][key3]
          let index = skillMatrix.skill.indexOf(name)
          if (index === -1) {
            if (name !== "---") {
              skillMatrix.skill = skillMatrix.skill.concat(name)
              skillMatrix.amount = skillMatrix.amount.concat(amount)
            }
          }
          else {
            skillMatrix.amount[index] += amount
          }
          return 0
        })
      return 0
    })
    skillMatrix.skill.map((name, index) => {
      let amount = skillMatrix.amount[index]
      skillMatrix.effect = skillMatrix.effect.concat(this.checkEffect(name, amount))
      return 0
    })
    return skillMatrix
  }

  checkEffect(name, amount) {
    let value = 0
    let skillEffect = { name: "", description: "" }
    this.props.effects.map((effect) => {
      if (name === effect.name) {
        if ((amount >= effect.amount && value < effect.amount) || (amount <= effect.amount && value > effect.amount)) {
          value = effect.amount
          skillEffect.name = effect.effect
          skillEffect.description = effect.description
        }
      }
      return 0
    })
    return skillEffect
  }

  getSkills = (id, part) => {
    const armor = this.props.armors.find(x => x.id === id)
    const skill1 = this.props.skills.find(x => x.id === armor.skill1).name
    const skill2 = this.props.skills.find(x => x.id === armor.skill2).name
    const skill3 = this.props.skills.find(x => x.id === armor.skill3).name
    return {
      [skill1]: armor.amount1,
      [skill2]: armor.amount2,
      [skill3]: armor.amount3
    }
  }

  renderSkills() {
    const { skillSums, skills } = this.state
    return skillSums.skill.map((name, id) => {
      let skillColor = ""
      if (skillSums.effect[id].description !== "") {
        if (skillSums.amount[id] > 0) skillColor = "success"
        else skillColor = "warning"
      }
      return (<tr key={id} className={skillColor}>
        <td>
          {skillSums.skill[id]}
        </td>
        <td>
          -
        </td>
        <td>
          {skills.selectedHead[skillSums.skill[id]]}
        </td>
        <td>
          {skills.selectedTorso[skillSums.skill[id]]}
        </td>
        <td>
          {skills.selectedArms[skillSums.skill[id]]}
        </td>
        <td>
          {skills.selectedWaist[skillSums.skill[id]]}
        </td>
        <td>
          {skills.selectedFeet[skillSums.skill[id]]}
        </td>
        <td>
          {skills.selectedCharm[skillSums.skill[id]]}
        </td>
        <td>
          {this.state.skillSums.amount[id]}
        </td>
        <td>
          <div
            data-toggle="tooltip"
            data-placement="left"
            title={this.state.skillSums.effect[id].description}
            data-original-title="Tooltip on right">
            {this.state.skillSums.effect[id].name}
          </div>
        </td>
      </tr>)
    })
  }

  renderDecorations(decos) {
    if (decos === undefined) return null
    const { decorations } = this.props

    return (
      <div className="armor-set-modal--col">
        <div title={decorations.find(x => x.id === decos.decoration1_id).skill_name}>
          {decorations.find(x => x.id === decos.decoration1_id).name}
        </div>
        <div title={decorations.find(x => x.id === decos.decoration2_id).skill_name}>
          {decorations.find(x => x.id === decos.decoration2_id).name}
        </div>
        <div title={decorations.find(x => x.id === decos.decoration3_id).skill_name}>
          {decorations.find(x => x.id === decos.decoration3_id).name}
        </div>
      </div>
    )
  }

  renderDecorations2() {
    return this.state.setDecorations.map((decos, id) =>
      <div key={id} className="armor-set-modal--col">
        <img src={image.decoration} alt="Decoration " width="25" height="25" />
        {decos.part}|
        {this.props.decorations.find(x => x.id === decos.decoration1_id).name}|
        {this.props.decorations.find(x => x.id === decos.decoration2_id).name}|
        {this.props.decorations.find(x => x.id === decos.decoration3_id).name}
      </div>)
  }

  render() {
    if (!this.props.isOpen) return null
    const { armorSet, weapon, setDecorations } = this.state
    return (
      <div className="armor-set-modal">
        <div className="modal-dialog armor-set-modal-dialog">
          <div className="modal-content armor-set-modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Set Name: {armorSet.name}</h4>
            </div>
            <div className="modal-body">
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  Equipment
                </div>
                <div className="armor-set-modal--col">
                  <img src={image.decoration} alt="Decoration " width="25" height="25" />
                </div>
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.greatSword} alt="Weapon: " width="30" height="30" />
                  {weapon.name}
                </div>
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.head} alt="Head: " width="30" height="30" />
                  {armorSet.head}
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedHead"))}
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.torso} alt="Torso: " width="30" height="30" />
                  {armorSet.torso}
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedTorso"))}
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.arms} alt="Arms: " width="30" height="30" />
                  {armorSet.arms}
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedArms"))}
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.waist} alt="Waist: " width="30" height="30" />
                  {armorSet.waist}
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedWaist"))}
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.feet} alt="Feet: " width="30" height="30" />
                  {armorSet.feet}
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedFeet"))}
              </div>
              <div className="armor-set-modal--row">
                <div className="armor-set-modal--col">
                  <img src={image.charm} alt="Charm: " width="30" height="30" />
                  #{armorSet.charm_id}
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedCharm"))}
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>
                      Skill
                      </th>
                    <th>
                      weapon
                      </th>
                    <th>
                      head
                      </th>
                    <th>
                      torso
                      </th>
                    <th>
                      arms
                      </th>
                    <th>
                      waist
                      </th>
                    <th>
                      feet
                      </th>
                    <th>
                      charm
                      </th>
                    <th>
                      Total
                      </th>
                    <th>
                      Effect
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderSkills()}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.close}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  armorSets: state.armorSet.armorSets,
  charms: state.charm.charms,
  setDecorations: state.armorSet.setDecorations,
  weapons: state.weapon.weapons,
  armors: state.armor.armors,
  decorations: state.decoration.decorations,
  skills: state.skill.skills,
  effects: state.skill.effects
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ArmorSetInfo)