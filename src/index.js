import { commandItem } from "./command.js"
import { settingsTemplate } from "./setting.js"

function main () {
  logseq.App.showMsg('😺 Rappire-KeyMap-Plugin')
  logseq.useSettingsSchema(settingsTemplate())
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300)
  commandItem()
}


// bootstrap
logseq.ready(main).catch(console.error)
