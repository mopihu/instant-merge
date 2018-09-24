module.exports = function InstantMerge(mod) {
  mod.hook('S_REQUEST_CONTRACT', 1, event => {
    if (!mod.game.me.is(event.senderId) || event.type != 33) return;
    mod.send('C_MERGE_ITEM_EXECUTE', 1, {
      contractId: event.id,
    });
    process.nextTick(() => {
      mod.send('S_CANCEL_CONTRACT', 1, {
        type: 33,
        id: event.id
      });
    });
  });
  mod.hook('C_MERGE_ITEM_EXECUTE', 1, event => { return false; });
}
