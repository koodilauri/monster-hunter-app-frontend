import React from "react";
import { connect } from "react-redux"
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, AreaChart, Area } from "recharts"

import "./QuestInfo.css"

class QuestInfo extends React.Component {
  state = {
    questSubs: [],
    data: [
      { average_time: 0, type: 'Great Sword', runs: 0 },
      { average_time: 0, type: 'Long Sword', runs: 0 },
      { average_time: 0, type: 'Sword & Shield', runs: 0 },
      { average_time: 0, type: 'Dual Blades', runs: 0 },
      { average_time: 0, type: 'Hammer', runs: 0 },
      { average_time: 0, type: 'Hunting Horn', runs: 0 },
      { average_time: 0, type: 'Lance', runs: 0 },
      { average_time: 0, type: 'Gunlance', runs: 0 },
      { average_time: 0, type: 'Switch Axe', runs: 0 },
      { average_time: 0, type: 'Charge Blade', runs: 0 },
      { average_time: 0, type: 'Insect Glaive', runs: 0 },
      { average_time: 0, type: 'Heavy Bowgun', runs: 0 },
      { average_time: 0, type: 'Light Bowgun', runs: 0 },
      { average_time: 0, type: 'Bow', runs: 0 },],
    data2: [
      { time: 0, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 2, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 4, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 6, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 8, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 12, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 10, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 14, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 16, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 18, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 20, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 22, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 24, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 26, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 28, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 30, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 32, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 34, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 36, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 38, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 40, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 42, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 44, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 46, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 48, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 },
      { time: 50, GreatSword: 0, LongSword: 0, SwordNShield: 0, DualBlades: 0, Hammer: 0, HuntingHorn: 0, Lance: 0, Gunlance: 0, SwitchAxe: 0, ChargeBlade: 0, InsectGlaive: 0, HeavyBowgun: 0, LightBowgun: 0, Bow: 0 }
    ]
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.quest_name !== this.props.quest_name) {
      const questSubs = this.props.submissions.filter(sub => sub.quest_name === this.props.quest_name)
      const list = this.props.calculateQuests(questSubs, this.state.data)
      const list2 = this.calculateAverageTime(questSubs, this.state.data, list)
      const data2 = this.calculateDistribution(questSubs, this.state.data2)
      this.setState({
        data: list2,
        data2: data2,
        questSubs: questSubs
      })
    }
  }

  calculateDistribution(subs, data) {
    let list = []
    data.map((timeSpan, index) => {
      let dT = {}
      Object.keys(timeSpan).map(key => {
        if (key === "time")
          dT = Object.assign({}, dT, { [key]: timeSpan[key] })
        else {
          dT = Object.assign({}, dT, {
            [key]: this.countQuestsInTimeSpan(key, timeSpan.time * 60, subs)
          })
        }
        return 0
      })
      list.push(dT)
      return 0
    })
    return list
  }

  countQuestsInTimeSpan(weapon, timeWindow, subs) {
    let count = 0
    switch (weapon) {
      case "GreatSword":
        weapon = "Great Sword"
        break
      case "LongSword":
        weapon = "Long Sword"
        break
      case "SwordNShield":
        weapon = "Sword & Shield"
        break
      case "DualBlades":
        weapon = "Dual Blades"
        break
      case "HuntingHorn":
        weapon = "Hunting Horn"
        break
      case "SwitchAxe":
        weapon = "Switch Axe"
        break
      case "ChargeBlade":
        weapon = "Charge Blade"
        break
      case "InsectGlaive":
        weapon = "Insect Glaive"
        break
      case "HeavyBowgun":
        weapon = "Heavy Bowgun"
        break
      case "LightBowgun":
        weapon = "Light Bowgun"
        break
      default:
    }
    subs.map(sub => {
      let time = 0
      if (sub.weapon_class === weapon) {
        time += Number(sub.quest_time[7])
        time += Number(sub.quest_time[6]) * 10
        time += Number(sub.quest_time[4]) * 60
        time += Number(sub.quest_time[3]) * 600
        if (time <= timeWindow + 60 && time > timeWindow - 60)
          count++
      }
      return 0
    })
    return count
  }

  calculateAverageTime(subs, data, runs) {
    let list = []
    data.map((weapon, id) => {
      let time = 0
      const weaponClassSubs = subs.filter(sub => sub.weapon_class === weapon.type)
      weaponClassSubs.map(sub => {
        time += Number(sub.quest_time[7])
        time += Number(sub.quest_time[6]) * 10
        time += Number(sub.quest_time[4]) * 60
        time += Number(sub.quest_time[3]) * 600
        return 0
      })
      if (time !== 0)
        time = time / (weaponClassSubs.length * 60)
      list.push({
        type: weapon.type,
        average_time: time,
        runs: runs[id].runs
      })
      return 0
    }
    )
    return list
  }

  render() {
    if (!this.props.isOpen) return null
    return (
      <div className="quest-info-modal">
        <div className="modal-dialog quest-info-modal-dialog">
          <div className="modal-content quest-info-modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.quest_name}</h4>
            </div>
            <div className="modal-body">
              <BarChart width={730} height={250} data={this.state.data}>
                <XAxis dataKey="type" />
                <YAxis dataKey="runs" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="runs" fill="#8884d8" />
              </BarChart>

              <BarChart width={730} height={250} data={this.state.data}>
                <XAxis dataKey="type" />
                <YAxis dataKey="average_time" domain={[0, 50]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="average_time" fill="#82ca9d" />
              </BarChart>

              <AreaChart width={730} height={250} data={this.state.data2}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4286f4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4286f4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f44141" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f44141" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSNS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f4a341" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f4a341" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f4ee41" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f4ee41" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3f441" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a3f441" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#41f497" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#41f497" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#292f60" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#292f60" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#41f4eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#41f4eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4194f4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4194f4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7941f4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7941f4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorIG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ee41f4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ee41f4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bc6b64" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#bc6b64" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="GreatSword" stroke="#4286f4" fillOpacity={1} fill="url(#colorGS)" />
                <Area type="monotone" dataKey="LongSword" stroke="#f44141" fillOpacity={1} fill="url(#colorLS)" />
                <Area type="monotone" dataKey="SwordNShield" stroke="#f4a341" fillOpacity={1} fill="url(#colorSNS)" />
                <Area type="monotone" dataKey="DualBlades" stroke="#f4ee41" fillOpacity={1} fill="url(#colorDB)" />
                <Area type="monotone" dataKey="Hammer" stroke="#a3f441" fillOpacity={1} fill="url(#colorH)" />
                <Area type="monotone" dataKey="HuntingHorn" stroke="#41f497" fillOpacity={1} fill="url(#colorHH)" />
                <Area type="monotone" dataKey="Lance" stroke="#292f60" fillOpacity={1} fill="url(#colorL)" />
                <Area type="monotone" dataKey="Gunlance" stroke="#41f4eb" fillOpacity={1} fill="url(#colorGL)" />
                <Area type="monotone" dataKey="SwitchAxe" stroke="#4194f4" fillOpacity={1} fill="url(#colorSA)" />
                <Area type="monotone" dataKey="ChargeBlade" stroke="#7941f4" fillOpacity={1} fill="url(#colorCA)" />
                <Area type="monotone" dataKey="InsectGlaive" stroke="#ee41f4" fillOpacity={1} fill="url(#colorIG)" />
                <Area type="monotone" dataKey="HeavyBowgun" stroke="#8884d8" fillOpacity={1} fill="url(#colorHB)" />
                <Area type="monotone" dataKey="LightBowgun" stroke="#bc6b64" fillOpacity={1} fill="url(#colorLB)" />
                <Area type="monotone" dataKey="Bow" stroke="#82ca9d" fillOpacity={1} fill="url(#colorB)" />
              </AreaChart>
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
  quests: state.quest.quests,
  submissions: state.submission.submissions
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(QuestInfo)