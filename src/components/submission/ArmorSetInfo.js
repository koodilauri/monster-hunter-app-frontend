import React from "react";
import { connect } from "react-redux"
import image from "../../images/"

import "./ArmorSetInfo.css"

class ArmorSetInfo extends React.Component {
state={
  armorSet:{},
  weapon:{},
  skillSums:{
    skill:[],
    amount:[],
    effect:[]
  },
  skills:{}
}

  componentDidUpdate(prevProps, prevState){
    if(prevProps.set_id!==this.props.set_id && this.props.set_id!==-1){
      this.findArmorSet()
    }
  }

  findArmorSet(){
    const newValue = this.props.armorSets.find(x => x.id === this.props.set_id)
    const newWeapon = this.props.weapons.find(x => x.id === newValue.weapon_id)
    this.setState({
      armorSet:newValue,
      weapon:newWeapon
    })
    this.calculateSkills(newValue)
  }

  calculateSkills(set){
    const skills = {
      head: this.getSkills(set.head_id),
      torso: this.getSkills(set.torso_id),
      arms: this.getSkills(set.arms_id),
      waist: this.getSkills(set.waist_id),
      feet: this.getSkills(set.feet_id)
    }
    const skillMatrix = this.parseSkills(skills)
    this.setState({
      skills:skills,
      skillSums:skillMatrix

    })
  }

  parseSkills(skills){
    let skillMatrix = {skill:[], amount:[], effect:[]}
      Object.keys(skills).map((key1, id1)=>{
        Object.keys(skills[key1]).map((key2, id2)=>{
          let name = skills[key1][key2].name
          let amount = skills[key1][key2].amount
          let index = skillMatrix.skill.indexOf(name)//check if decoration is already in parsedDecorations
          if (index === -1) {
            if (name!=="---") {
              skillMatrix.skill = skillMatrix.skill.concat(name)
              skillMatrix.amount = skillMatrix.amount.concat(amount)
            }
          }
          else {
            skillMatrix.amount[index]+=amount
          }
          return 0
        })
        return 0        
      })
      skillMatrix.skill.map((name, index)=>{
        let amount=skillMatrix.amount[index]
        skillMatrix.effect = skillMatrix.effect.concat(this.checkEffect(name,amount))  
        return 0            
      })
    return skillMatrix
  }

  checkEffect(name, amount){
    let value = 0
    let skillEffect = {name:"", description:""}
    this.props.effects.map((effect)=>{
    if(name === effect.name){
      if((amount >= effect.amount && value < effect.amount) || (amount <= effect.amount && value > effect.amount)){
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
    const armor = this.props.armors.find(x=>x.id === id)
    return{
      skill1: {
        name: this.props.skills.find(x=> x.id === armor.skill1).name,
        amount:armor.amount1
      },
      skill2: {
        name: this.props.skills.find(x=> x.id === armor.skill2).name,
        amount:armor.amount2
      },
      skill3: {
        name: this.props.skills.find(x=> x.id === armor.skill3).name,
        amount:armor.amount3
      }
    }
    }

  renderSkills(){
    return this.state.skillSums.skill.map( (name, id) =>{
      let skillColor = ""
      if(this.state.skillSums.effect[id].description!==""){
        if(this.state.skillSums.amount[id]>0) skillColor="success"
        else skillColor = "warning"
      }
    return (<tr key={id} className={skillColor}>
      <td>
      {this.state.skillSums.skill[id]}
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
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

  render() {
    if(!this.props.isOpen) return null
    const {armorSet, weapon} = this.state
    return (
        <div className="armor-set-modal">
          <div className="modal-dialog armor-set-modal-dialog">
            <div className="modal-content armor-set-modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Set Name: {armorSet.name}</h4>
              </div>
              <div className="modal-body">
                <p>
                <img src={image.greatSword} alt="weapon" width="30" height="30" />
                {weapon.name}
                </p>
                <p>
                <img src={image.head} alt="Head" width="30" height="30" />
                {armorSet.head}
                </p>
                <p>
                <img src={image.torso} alt="Torso" width="30" height="30" />
                {armorSet.torso}
                </p>
                <p>
                <img src={image.arms} alt="Arms" width="30" height="30" />
                {armorSet.arms}
                </p>
                <p>
                <img src={image.waist} alt="Waist" width="30" height="30" />
                {armorSet.waist}
                </p>
                <p>
                <img src={image.feet} alt="Feet" width="30" height="30" />
                {armorSet.feet}
                </p>
                <p>
                <img src={image.charm} alt="Charm " width="30" height="30" />
                {armorSet.charm_id}
                </p>
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
  weapons: state.weapon.weapons,
  armors: state.armor.armors,
  skills: state.skill.skills,
  effects: state.skill.effects
})

const mapDispatchToProps = dispatch=> ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ArmorSetInfo)