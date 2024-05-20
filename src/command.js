export const commandItem = () => {
  logseq.App.registerCommandPalette(
    {
      key: "clearBlock",
      label: "😺 Clear One block contents ❌",
      keybinding: { binding: 'ctrl+d'}
    },
    async ({uuid}) => {
      const isEditing = await logseq.Editor.checkEditing()
      if(!isEditing){
        warningMessage()
        return
      }
      const nextBlock = await logseq.Editor.getNextSiblingBlock(uuid);
      const context = await logseq.Editor.getEditingBlockContent();
      await parent.navigator.clipboard.writeText(context)
      if(nextBlock !== null){
        await logseq.Editor.removeBlock(uuid)
        await logseq.Editor.editBlock(nextBlock.uuid, {pos : 0})
      } else{
        await logseq.Editor.updateBlock(uuid, "")
      }
    }
  )

  logseq.App.registerCommandPalette({
    key: "createOneBlankPreviousLine",
    label: "😺 Create the one previous line ⤴️",
    keybinding: { binding: 'shift+alt+enter' }
  }, async ({ uuid }) => {
    if (uuid) {
      logseq.Editor.insertBlock(uuid, "", { before: true, focus: true, sibling: true })
    } else
      warningMessage()
  })

    logseq.App.registerCommandPalette({
    key: "createOneBlankNextLine",
    label: "😺 Create the next line ⤵️",
    keybinding: { binding: 'alt+enter' }
  }, async ({ uuid }) => {
    if (uuid)
      logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true })
    else
      warningMessage()
  })
}

const warningMessage = () => {
  if (!logseq.settings?.showWarningMessage) return

  logseq.UI.showMsg("🙀 Please select a block.", "warning")
}