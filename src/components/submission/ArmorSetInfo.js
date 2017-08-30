import React from "react";
import { connect } from "react-redux"
import image from "../../images/"

class ArmorSetInfo extends React.Component {
  state = {
    armorSet: {},
    setDecorations: [],
    setArts: [],
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
    const newArts = this.props.hunterArts.filter(x => x.id === newSet.art1_id || x.id === newSet.art2_id || x.id === newSet.art3_id)
    const newDecorations = this.props.setDecorations.filter(deco => deco.set_id === newSet.id)
    const newWeapon = this.props.weapons.find(x => x.id === newSet.weapon_id)
    this.setState({
      armorSet: newSet,
      setDecorations: newDecorations,
      setArts: newArts.filter(x => x.id !== 1),
      weapon: newWeapon
    })
    this.calculateSkills(newSet, newDecorations)
  }

  calculateSkills(set, decorations) {
    const charm = this.props.charms.find(x => x.id === set.charm_id)
    let skills = {
      selectedHead: this.getArmorSkills(set.head_id),
      selectedTorso: this.getArmorSkills(set.torso_id),
      selectedArms: this.getArmorSkills(set.arms_id),
      selectedWaist: this.getArmorSkills(set.waist_id),
      selectedFeet: this.getArmorSkills(set.feet_id),
      selectedCharm: {
        [this.props.skills.find(x => x.id === charm.skill1_id).name]: charm.bonus1,
        [this.props.skills.find(x => x.id === charm.skill2_id).name]: charm.bonus2
      }
    }
    const decos = this.getDecoSkills(skills, decorations) //gets the skills from decorations
    this.sumArmorAndDecoSkills(skills, decos)
    const skillMatrix = this.parseSkills(skills, decos) //sums up the skills so they can be shown in the 'total' colum
    this.setState({
      skills: skills,
      skillSums: skillMatrix,
    })
  }

  sumArmorAndDecoSkills(skills, decos) {
    Object.keys(skills).map(key => { //loop through the parts (head, torso etc)
      if (decos[key] !== undefined) { //if there are decorations in an armor piece...
        Object.keys(decos[key]).map(key2 => {//loop through the skills of those decorations
          if (skills[key][key2] !== undefined) {
            //if the skill is already in the skills object, add the bonus from decorations to it
            skills[key][key2] += decos[key][key2]
          }
          else {
            //otherwise create a new skill in the skills object 
            skills[key] = Object.assign({}, skills[key], {
              [key2]: decos[key][key2]
            })
          }
          return 0
        })
      }
      return 0
    })
    return skills
  }

  getDecoSkills(skills, setDecorations) {
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

  getArmorSkills = (id, part) => {
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
    if (decos === undefined) return <div className="mh-modal--col"></div>
    const { decorations } = this.props

    return (
      <div className="mh-modal--col">
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

  renderArts() {
    const { setArts } = this.state
    return setArts.map((art, id) =>
      <div key={id} title={art.description} className="well well-sm mh-modal--art">
        Art #{id + 1}: {art.name}
      </div>
    )
  }

  render() {
    if (!this.props.isOpen) return null
    const { armorSet, weapon, setDecorations } = this.state
    return (
      <div className="mh-modal">
        <div className="modal-dialog mh-modal-dialog">
          <div className="modal-content mh-modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{armorSet.style} style: {armorSet.name}</h4>
            </div>
            <div className="modal-body mh-modal--body">
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    Equipment
                </div>
                </div>
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.decoration} alt="Decoration " width="25" height="25" />
                  </div>
                </div>
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.greatSword} alt="Weapon: " width="30" height="30" />
                    {weapon.name}
                  </div>
                </div>
                <div className="mh-modal--col">
                </div>
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.head} alt="Head: " width="30" height="30" />
                    {armorSet.head}
                  </div>
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedHead"))}
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.torso} alt="Torso: " width="30" height="30" />
                    {armorSet.torso}
                  </div>
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedTorso"))}
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.arms} alt="Arms: " width="30" height="30" />
                    {armorSet.arms}
                  </div>
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedArms"))}
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.waist} alt="Waist: " width="30" height="30" />
                    {armorSet.waist}
                  </div>
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedWaist"))}
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.feet} alt="Feet: " width="30" height="30" />
                    {armorSet.feet}
                  </div>
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedFeet"))}
              </div>
              <div className="mh-modal--row">
                <div className="mh-modal--col mh-modal--col__center">
                  <div>
                    <img src={image.charm} alt="Charm: " width="30" height="30" />
                    #{armorSet.charm_id}
                  </div>
                </div>
                {this.renderDecorations(setDecorations.find(x => x.part === "selectedCharm"))}
              </div>
              {this.renderArts()}
              <table className="table table-striped table-hover mh-modal--table">
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
  charms: state.charm.charms,
  weapons: state.weapon.weapons,
  armors: state.armor.armors,
  hunterArts: state.hunterArt.hunterArts,
  decorations: state.decoration.decorations,
  skills: state.skill.skills,
  effects: state.skill.effects
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ArmorSetInfo)