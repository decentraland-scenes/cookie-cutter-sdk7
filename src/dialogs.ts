import { Dialog } from 'dcl-npc-toolkit'

export let testscript: Dialog[] = [
  {
    text: `Hi there! Check out this cookie cutter of me.`,
    portrait: {
      path: 'images/benji04.png'
    }
  },
  {
    text: `Interested in getting your own custom cookie cutter made?`,
    isQuestion: true,
    buttons: [
      { label: `Yes!`, goToDialog: 2 },
      { label: `No thanks.`, goToDialog: 4 }
    ]
  },
  {
    text: `Ok, awesome, you can order one at www.pupbusiness.com`
  },
  {
    text: `They make great gifts for the holidays!`,
    isEndOfDialog: true
  },
  {
    text: `Ok, come back soon`,
    isEndOfDialog: true,
    name: 'testing'
  }
]

export let dogeDialog = [
  {
    text: 'Me am muscle doge'
  },
  {
    text: 'And I am Meta Doge',
    portrait: {
      path: 'images/MetaDoge225-face01_150px.png'
    }
  },
  {
    text: 'Me love spending Dogecoin'
  },
  {
    text: 'And I like collecting all sorts of Doge related stuff in the metaverse',
    portrait: {
      path: 'images/MetaDoge225-face01_150px.png'
    }
  },
  {
    text: 'Dogecoin so simple'
  },
  {
    text: 'And dogecoin in the metaverse is so vast',
    portrait: {
      path: 'images/MetaDoge225-face01_150px.png'
    }
  },
  {
    text: 'Me Muscle Meta Doge Now',
    isEndOfDialog: true
  }
]
