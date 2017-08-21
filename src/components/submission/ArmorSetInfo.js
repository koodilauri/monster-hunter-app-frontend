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
    skillInArmor: {
      head: {},
      torso: {},
      arms: {},
      waist: {},
      feet: {},
      charm: {},
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
    this.calculateSkills(newSet)
  }

  calculateSkills(set) {
    const skills = {
      head: this.getSkills(set.head_id),
      torso: this.getSkills(set.torso_id),
      arms: this.getSkills(set.arms_id),
      waist: this.getSkills(set.waist_id),
      feet: this.getSkills(set.feet_id)
    }
    const skillMatrix = this.parseSkills(skills)
    this.setState({
      skills: skills,
      skillSums: skillMatrix,
      skillInArmor: {
        head: {
          [skills.head.skill1.name]: skills.head.skill1.amount,
          [skills.head.skill2.name]: skills.head.skill2.amount,
          [skills.head.skill3.name]: skills.head.skill3.amount
        },
        torso: {
          [skills.torso.skill1.name]: skills.torso.skill1.amount,
          [skills.torso.skill2.name]: skills.torso.skill2.amount,
          [skills.torso.skill3.name]: skills.torso.skill3.amount
        },
        arms: {
          [skills.arms.skill1.name]: skills.arms.skill1.amount,
          [skills.arms.skill2.name]: skills.arms.skill2.amount,
          [skills.arms.skill3.name]: skills.arms.skill3.amount
        },
        waist: {
          [skills.waist.skill1.name]: skills.waist.skill1.amount,
          [skills.waist.skill2.name]: skills.waist.skill2.amount,
          [skills.waist.skill3.name]: skills.waist.skill3.amount
        },
        feet: {
          [skills.feet.skill1.name]: skills.feet.skill1.amount,
          [skills.feet.skill2.name]: skills.feet.skill2.amount,
          [skills.feet.skill3.name]: skills.feet.skill3.amount
        },
        charm: {

        },
      }

    })
  }

  parseSkills(skills) {
    let skillMatrix = { skill: [], amount: [], effect: [] }
    Object.keys(skills).map((key1, id1) => {
      Object.keys(skills[key1]).map((key2, id2) => {
        let name = skills[key1][key2].name
        let amount = skills[key1][key2].amount
        let index = skillMatrix.skill.indexOf(name)//check if decoration is already in parsedDecorations
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

  getSkills = id => {
    const armor = this.props.armors.find(x => x.id === id)
    return {
      skill1: {
        name: this.props.skills.find(x => x.id === armor.skill1).name,
        amount: armor.amount1
      },
      skill2: {
        name: this.props.skills.find(x => x.id === armor.skill2).name,
        amount: armor.amount2
      },
      skill3: {
        name: this.props.skills.find(x => x.id === armor.skill3).name,
        amount: armor.amount3
      }
    }
  }

  renderSkills() {
    const { skillSums, skillInArmor } = this.state
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
          {skillInArmor.head[skillSums.skill[id]]}
        </td>
        <td>
          {skillInArmor.torso[skillSums.skill[id]]}
        </td>
        <td>
          {skillInArmor.arms[skillSums.skill[id]]}
        </td>
        <td>
        {skillInArmor.waist[skillSums.skill[id]]}          
        </td>
        <td>
        {skillInArmor.feet[skillSums.skill[id]]}          
        </td>
        <td>
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

  renderDecorations(decorations) {
    if (decorations === undefined) return null

    return (
      <div className="armor-set-modal--col">
        <div>
          {this.props.decorations.find(x => x.id === decorations.decoration1_id).name}
        </div>
        <div>
          {this.props.decorations.find(x => x.id === decorations.decoration2_id).name}
        </div>
        <div>
          {this.props.decorations.find(x => x.id === decorations.decoration3_id).name}
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