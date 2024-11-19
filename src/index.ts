import {
  Entity,
  engine,
  NftFrameType,
  NftShape,
  Transform,
  MeshRenderer,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  Schemas,
  pointerEventsSystem,
  TextureWrapMode,
  Billboard,
  ColliderLayer,
  RaycastHit,
  inputSystem,
  PointerEventType
} from '@dcl/sdk/ecs'
import { SplatSurface } from './splat-attack/splat-surface.ui'
import { setupUi } from './ui'
import { Quaternion, Vector3, Color4 } from '@dcl/sdk/math'
import { openExternalUrl } from '~system/RestrictedActions'
import * as npc from 'dcl-npc-toolkit'
import { testscript } from './dialogs'
import { createDogeNpc } from './dogeNpc'
import { MakeNFTFrame, createFullNFT, displayNFTUI } from './Resources/nftUI'

export function main() {
  //place splat surface (this lets the player paint the surface)
  SplatSurface.Move({ x: 2, y: 0, z: 0.8 })
  SplatSurface.Scale({ x: 1, y: 1, z: 1 })

  const doughBig = engine.addEntity()

  GltfContainer.create(doughBig, {
    src: 'models/splat-attack/dough03.glb'
  })
  Transform.create(doughBig, {
    position: Vector3.create(2, 0, 0.8),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })
}

// UI with GitHub link
setupUi()

// Shortcut to make an NFT picture frame that is also clickable and includes a UI
createFullNFT('0x12fedcf4e359b56e7677e0ddb6512c64b94a3167', '1', 9.9, 1, 13.5, 3, 3, 3, 0, 90, 0)
createFullNFT(
  '0x61dfb0887d61ccc38acbab7fbfe26dbd82976b79',
  '105312291668557186697918027683670432318895095400549111254310977537',
  9.9,
  2.8,
  13.5,
  3,
  3,
  3,
  0,
  90,
  0
)
createFullNFT('0x6fad7711dda6bb2f6901508e81dcf0ca20ee16c7', '1', 9.9, 1, 10.5, 3, 3, 3, 0, 90, 0)
createFullNFT('0x61dfb0887d61ccc38acbab7fbfe26dbd82976b79', '1', 9.9, 2.8, 10.5, 3, 3, 3, 0, 90, 0)

// Dough Table NPC
let tableDialogue = npc.create(
  {
    position: Vector3.create(2, 0, 0.8),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.create(1, 1, 1)
  },
  {
    type: npc.NPCType.CUSTOM,
    model: {
      src: 'models/table03-nocollider.glb'
    },
    //faceUser: true,
    portrait: { path: 'images/benji04.png' },
    reactDistance: 1,
    onActivate: () => {
      npc.talk(tableDialogue, testscript)
    },
    onWalkAway: () => {
      console.log('test on walk away function')
      npc.closeDialogWindow(tableDialogue)
    }
  }
)

// walking NPC
createDogeNpc()

//floor
const flooring = engine.addEntity()
Transform.create(flooring, {
  position: Vector3.create(8, 0, 8),
  rotation: Quaternion.fromEulerDegrees(90, 0, 0),
  scale: Vector3.create(16, 16, 1)
})
MeshRenderer.setPlane(flooring)
Material.setBasicMaterial(flooring, {
  texture: Material.Texture.Common({
    src: 'https://static.wixstatic.com/media/349397_e280c19a9da84ba89263543a664db7ae~mv2.png'
  })
})

//doorway
const doorway = engine.addEntity()

GltfContainer.create(doorway, {
  src: 'models/RedDoorframe.glb'
})
Transform.create(doorway, {
  position: Vector3.create(8, 0, 6),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

//roof
const roof1 = engine.addEntity()
Transform.create(roof1, {
  position: Vector3.create(9, 7, 12),
  rotation: Quaternion.fromEulerDegrees(90, 0, 0),
  scale: Vector3.create(2, 8, 1)
})
MeshRenderer.setPlane(roof1)

const roof2 = engine.addEntity()
Transform.create(roof2, {
  position: Vector3.create(4, 7, 8),
  rotation: Quaternion.fromEulerDegrees(90, 0, 0),
  scale: Vector3.create(8, 16, 1)
})
MeshRenderer.setPlane(roof2)

//create brochure rack
const brochureRack = engine.addEntity()
const brochure01 = engine.addEntity()
const brochure02 = engine.addEntity()
const brochure03 = engine.addEntity()
const brochure11 = engine.addEntity()
const brochure12 = engine.addEntity()
const brochure13 = engine.addEntity()
const brochure21 = engine.addEntity()

GltfContainer.create(brochureRack, {
  src: 'models/comic03.glb'
})
Transform.create(brochureRack, {
  position: Vector3.create(2, 0, 15.5),
  scale: Vector3.create(1, 1, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})
Transform.create(brochure01, {
  position: Vector3.create(0.1, 1.8, 0.75),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0),
  scale: Vector3.create(0.5, 0.5, 0.5),
  parent: brochureRack
})
MeshRenderer.setPlane(brochure01)
MeshCollider.setPlane(brochure01)
Transform.create(brochure02, {
  position: Vector3.create(1.3, 0, 0),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: brochure01
})
MeshRenderer.setPlane(brochure02)
MeshCollider.setPlane(brochure02)
Transform.create(brochure03, {
  position: Vector3.create(1.5, 0, 0),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: brochure02
})
MeshRenderer.setPlane(brochure03)
MeshCollider.setPlane(brochure03)

Transform.create(brochure11, {
  position: Vector3.create(-0.1, 1.4, 0.55),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0),
  scale: Vector3.create(0.5, 0.5, 0.5),
  parent: brochureRack
})
MeshRenderer.setPlane(brochure11)
MeshCollider.setPlane(brochure11)
Transform.create(brochure12, {
  position: Vector3.create(1.2, 0, 0),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: brochure11
})
MeshRenderer.setPlane(brochure12)
MeshCollider.setPlane(brochure12)
Transform.create(brochure13, {
  position: Vector3.create(1.1, 0, 0),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: brochure12
})
MeshRenderer.setPlane(brochure13)
MeshCollider.setPlane(brochure13)
Transform.create(brochure21, {
  position: Vector3.create(-0.12, 1.1, 0),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0),
  scale: Vector3.create(0.5, 0.5, 0.5),
  parent: brochureRack
})
MeshRenderer.setPlane(brochure21)
MeshCollider.setPlane(brochure21)

//create comic rack
const comicRack = engine.addEntity()
const rareDoge01 = engine.addEntity()
const rareDoge02 = engine.addEntity()
const rareDoge03 = engine.addEntity()
const rareDoge04 = engine.addEntity()
const rareDoge05 = engine.addEntity()
const rareDoge11 = engine.addEntity()
const rareDoge12 = engine.addEntity()
const rareDoge13 = engine.addEntity()
const rareDoge14 = engine.addEntity()
const rareDoge15 = engine.addEntity()
const rareDoge21 = engine.addEntity()
const rareDoge22 = engine.addEntity()
const rareDoge23 = engine.addEntity()
const rareDoge24 = engine.addEntity()
const rareDoge25 = engine.addEntity()
const rareDoge31 = engine.addEntity()
const rareDoge32 = engine.addEntity()
const rareDoge33 = engine.addEntity()
const rareDoge34 = engine.addEntity()
const rareDoge35 = engine.addEntity()
GltfContainer.create(comicRack, {
  src: 'models/dogeparty-comic-rack01.glb'
})
Transform.create(comicRack, {
  position: Vector3.create(5, 0, 12),
  scale: Vector3.create(0.5, 0.5, 0.5),
  rotation: Quaternion.fromEulerDegrees(0, 45, 0)
})
Transform.create(rareDoge01, {
  position: Vector3.create(0.45, 3.65, 0.77),
  rotation: Quaternion.fromEulerDegrees(-14, 180, 0),
  scale: Vector3.create(0.571, 0.8, 1),
  parent: comicRack
})
MeshRenderer.setPlane(rareDoge01)
MeshCollider.setPlane(rareDoge01)

Transform.create(rareDoge02, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge01
})
MeshRenderer.setPlane(rareDoge02)
MeshCollider.setPlane(rareDoge02)

Transform.create(rareDoge03, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge02
})
MeshRenderer.setPlane(rareDoge03)
MeshCollider.setPlane(rareDoge03)
Transform.create(rareDoge04, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge03
})
MeshRenderer.setPlane(rareDoge04)
MeshCollider.setPlane(rareDoge04)
Transform.create(rareDoge05, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge04
})
MeshRenderer.setPlane(rareDoge05)
MeshCollider.setPlane(rareDoge05)
Transform.create(rareDoge11, {
  position: Vector3.create(1.14, 3.65, 0.085),
  rotation: Quaternion.fromEulerDegrees(-14, 270, 0),
  scale: Vector3.create(0.571, 0.8, 1),
  parent: comicRack
})
MeshRenderer.setPlane(rareDoge11)
MeshCollider.setPlane(rareDoge11)

Transform.create(rareDoge12, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge11
})
MeshRenderer.setPlane(rareDoge12)
MeshCollider.setPlane(rareDoge12)
Transform.create(rareDoge13, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge12
})
MeshRenderer.setPlane(rareDoge13)
MeshCollider.setPlane(rareDoge13)
Transform.create(rareDoge14, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge13
})
MeshRenderer.setPlane(rareDoge14)
MeshCollider.setPlane(rareDoge14)
Transform.create(rareDoge15, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge14
})
MeshRenderer.setPlane(rareDoge15)
MeshCollider.setPlane(rareDoge15)
Transform.create(rareDoge21, {
  position: Vector3.create(0.45, 3.65, -0.6),
  rotation: Quaternion.fromEulerDegrees(-14, 0, 0),
  scale: Vector3.create(0.571, 0.8, -1),
  parent: comicRack
})
MeshRenderer.setPlane(rareDoge21)
MeshCollider.setPlane(rareDoge21)

Transform.create(rareDoge22, {
  position: Vector3.create(0, -0.95, 0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge21
})
MeshRenderer.setPlane(rareDoge22)
MeshCollider.setPlane(rareDoge22)
Transform.create(rareDoge23, {
  position: Vector3.create(0, -0.95, 0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge22
})
MeshRenderer.setPlane(rareDoge23)
MeshCollider.setPlane(rareDoge23)
Transform.create(rareDoge24, {
  position: Vector3.create(0, -0.95, 0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge23
})
MeshRenderer.setPlane(rareDoge24)
MeshCollider.setPlane(rareDoge24)
Transform.create(rareDoge25, {
  position: Vector3.create(0, -0.95, 0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge24
})
MeshRenderer.setPlane(rareDoge25)
MeshCollider.setPlane(rareDoge25)
Transform.create(rareDoge31, {
  position: Vector3.create(-0.25, 3.65, 0.09),
  rotation: Quaternion.fromEulerDegrees(-14, 90, 0),
  scale: Vector3.create(0.571, 0.8, 1),
  parent: comicRack
})
MeshRenderer.setPlane(rareDoge31)
MeshCollider.setPlane(rareDoge31)

Transform.create(rareDoge32, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge31
})
MeshRenderer.setPlane(rareDoge32)
MeshCollider.setPlane(rareDoge32)
Transform.create(rareDoge33, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge32
})
MeshRenderer.setPlane(rareDoge33)
MeshCollider.setPlane(rareDoge33)
Transform.create(rareDoge34, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge33
})
MeshRenderer.setPlane(rareDoge34)
MeshCollider.setPlane(rareDoge34)
Transform.create(rareDoge35, {
  position: Vector3.create(0, -0.95, -0.17),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0),
  scale: Vector3.create(1, 1, 1),
  parent: rareDoge34
})
MeshRenderer.setPlane(rareDoge35)
MeshCollider.setPlane(rareDoge35)

//end comic rack

//create cookie display
const cookeiDisplay = engine.addEntity()
GltfContainer.create(cookeiDisplay, {
  src: 'models/displaycase23.glb',
  // invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
})
Transform.create(cookeiDisplay, {
  position: Vector3.create(4.4, 0, 5.35),
  scale: Vector3.create(1, 1, 1),
  rotation: Quaternion.Zero()
})

// Create cutter clickeables

const cookie1 = engine.addEntity()

MeshCollider.setBox(cookie1)
Transform.create(cookie1, { position: Vector3.create(4.69, 1, 5.29), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie1,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/poodle' })
  }
)

const cookie6 = engine.addEntity()

MeshCollider.setBox(cookie6)
Transform.create(cookie6, { position: Vector3.create(4.295, 1, 5.29), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie6,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/corgi' })
  }
)

const cookie2 = engine.addEntity()

MeshCollider.setBox(cookie2)
Transform.create(cookie2, { position: Vector3.create(3.9, 1, 5.29), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie2,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/rottweiler' })
  }
)

const cookie3 = engine.addEntity()

MeshCollider.setBox(cookie3)
Transform.create(cookie3, { position: Vector3.create(3.49, 1, 5.29), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie3,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/basenji' })
  }
)

const cookie4 = engine.addEntity()

MeshCollider.setBox(cookie4)
Transform.create(cookie4, { position: Vector3.create(3.09, 1, 5.29), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie4,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/shih-tzu' })
  }
)

const cookie5 = engine.addEntity()
MeshCollider.setBox(cookie5)
Transform.create(cookie5, { position: Vector3.create(2.59, 1, 5.29), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie5,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/germanshepherd' })
  }
)

const cookie7 = engine.addEntity()
MeshCollider.setBox(cookie7)
Transform.create(cookie7, { position: Vector3.create(5.84, 1, 1.79), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie7,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/lab' })
  }
)
const cookie8 = engine.addEntity()
MeshCollider.setBox(cookie8)
Transform.create(cookie8, { position: Vector3.create(5.84, 1, 2.22), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie8,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/maltese' })
  }
)
const cookie9 = engine.addEntity()
MeshCollider.setBox(cookie9)

Transform.create(cookie9, { position: Vector3.create(5.84, 1, 2.75), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie9,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/pitbull' })
  }
)

const cookie10 = engine.addEntity()
MeshCollider.setBox(cookie10)
Transform.create(cookie10, { position: Vector3.create(5.84, 1, 3.22), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie10,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/pomeranian' })
  }
)

const cookie11 = engine.addEntity()
MeshCollider.setBox(cookie11)
Transform.create(cookie11, { position: Vector3.create(5.84, 1, 3.6), scale: Vector3.create(0.25, 0.25, 0.25) })

pointerEventsSystem.onPointerDown(
  {
    entity: cookie11,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Get Cutter'
    }
  },
  function () {
    openExternalUrl({ url: 'https://www.pupbusiness.com/product-page/dogecoin' })
  }
)

engine.addSystem(() => {
  const cmd = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN, cookeiDisplay)
  if (cmd) {
    console.log('CLICK', cmd.hit?.meshName === 'COR')
  }
})

//tip jar
const tipJar = engine.addEntity()
GltfContainer.create(tipJar, {
  src: 'models/tip-jar02.glb'
})
Transform.create(tipJar, {
  position: Vector3.create(5.5, 0.9, 4.8),
  scale: Vector3.create(0.1, 0.1, 0.1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})

pointerEventsSystem.onPointerDown(
  {
    entity: tipJar,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked Tip Jar')
    openExternalUrl({ url: 'https://mydoge.com/jumpnspid3r' })
  }
)

//create meta doge
const metaDoge = engine.addEntity()
GltfContainer.create(metaDoge, {
  src: 'models/MetaDoge225.glb'
})
Transform.create(metaDoge, {
  position: Vector3.create(1, 0, 3.9),
  scale: Vector3.create(1.4, 1.4, 1.4)
})
//Billboard.create(metaDoge, {})

// begin rare doge click info
//raredoge01 begin
Material.setBasicMaterial(rareDoge01, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/JOWLS.jpg'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge01,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/JOWLS' })
  }
)
// raredoge01 end
// raredoge11 begin
Material.setBasicMaterial(rareDoge11, {
  texture: Material.Texture.Common({
    src: 'https://static.wixstatic.com/media/349397_7c5246bbd3f64703ba271d1b635d9faa~mv2.jpg'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge11,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://rarerejectdirectory.com/card/DOGECENTRLND' })
  }
)
//raredoge11 end
// raredoge21 begin
Material.setBasicMaterial(rareDoge21, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/DOGECOOKIES.jpg',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge21,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/DOGECOOKIES' })
  }
)

Material.setBasicMaterial(rareDoge31, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/VOXELCOL.png',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge31,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/VOXELCOL' })
  }
)

Material.setBasicMaterial(rareDoge02, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/DOGETELLER.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge02,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/DOGETELLER' })
  }
)

Material.setBasicMaterial(rareDoge12, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/DOGEBUSKERS.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge12,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/DOGEBUSKERS' })
  }
)

Material.setBasicMaterial(rareDoge22, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/PARTYBUS.png',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge22,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/PARTYBUS' })
  }
)

Material.setBasicMaterial(rareDoge32, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/A11509161988019925455.png',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge32,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/A11509161988019925455' })
  }
)

Material.setBasicMaterial(rareDoge03, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/RARECOUPLE.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge03,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/RARECOUPLE' })
  }
)

Material.setBasicMaterial(rareDoge13, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/VOXELCOSMOS.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge13,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/VOXELCOSMOS' })
  }
)

Material.setBasicMaterial(rareDoge23, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/VOXELTREE.png',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge23,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/VOXELTREE' })
  }
)

Material.setBasicMaterial(rareDoge33, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/DOGELOVERS.png',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge33,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/DOGELOVERS' })
  }
)

Material.setBasicMaterial(rareDoge04, {
  texture: Material.Texture.Common({
    src: 'https://r6zvleju6hu4kzex22efzmcjwzxmjmtxrut2osj2d7a5hy5vdvsa.arweave.net/j7NVkTTx6cVkl9aIXLBJtm7EsneNJ6dJOh_B0-O1HWQ/1-DOGECOOKIES-trophy.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge04,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/DPAWRDTROPHY.BestUseCase' })
  }
)

Material.setBasicMaterial(rareDoge14, {
  texture: Material.Texture.Common({
    src: 'https://static.wixstatic.com/media/349397_d801e19e969245a796264267988bb269~mv2.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge14,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/THEMOONRULES' })
  }
)

Material.setBasicMaterial(rareDoge24, {
  texture: Material.Texture.Common({
    src: 'https://y7ggkeqnnnmuw5zb3vtknuyqgcfpdo77rkpifn6tkxjbozzodigq.arweave.net/x8xlEg1rWUt3Id1mptMQMIrxu_-KnoK301XSF2cuGg0/prfc2t_image.jpg',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge24,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/COOKIESHADES' })
  }
)

Material.setBasicMaterial(rareDoge34, {
  texture: Material.Texture.Common({
    src: 'https://i.imgur.com/K8r1MNE.png',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge34,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogeparty.tokenscan.io/asset/DOGERDRIP' })
  }
)

Material.setBasicMaterial(rareDoge05, {
  texture: Material.Texture.Common({
    src: 'https://pbs.twimg.com/media/GSvsGlGaMAAdbn7?format=jpg&name=small'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge05,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/SUMOPENPEN' })
  }
)
Material.setBasicMaterial(rareDoge15, {
  texture: Material.Texture.Common({
    src: 'https://pbs.twimg.com/media/GSvsGlFakAEiBKi?format=jpg&name=small'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge15,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/DOGERAMEN' })
  }
)

Material.setBasicMaterial(rareDoge25, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/DOGEOMIKOSHI.jpg',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge25,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/DOGEOMIKOSHI' })
  }
)

Material.setBasicMaterial(rareDoge35, {
  texture: Material.Texture.Common({
    src: 'https://dogeparty.tokenscan.io/img/cards/HANAYOMEDOGE.jpg',
    wrapMode: TextureWrapMode.TWM_MIRROR
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: rareDoge35,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://raredogedirectory.com/card/HANAYOMEDOGE' })
  }
)

//brochure01 begin
Material.setBasicMaterial(brochure01, {
  texture: Material.Texture.Common({
    src: 'images/dp.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure01,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dp.university/' })
  }
)

Material.setBasicMaterial(brochure02, {
  texture: Material.Texture.Common({
    src: 'images/dogechain.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure02,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://x.com/DogechainFamily' })
  }
)

Material.setBasicMaterial(brochure03, {
  texture: Material.Texture.Common({
    src: 'https://pbs.twimg.com/media/GVzVPNeWwAAGxtg?format=jpg&name=small'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure03,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://shibeship.com/' })
  }
)

Material.setBasicMaterial(brochure11, {
  texture: Material.Texture.Common({
    src: 'images/core.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure11,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://dogecoin.com/' })
  }
)

Material.setBasicMaterial(brochure12, {
  texture: Material.Texture.Common({
    src: 'images/mydoge.png'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure12,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://x.com/MyDogeOfficial' })
  }
)

Material.setBasicMaterial(brochure13, {
  texture: Material.Texture.Common({
    src: 'https://pbs.twimg.com/media/GQ4BUcQXIAA0NYx?format=jpg&name=small'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure13,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({
      url: 'https://decentraland.org/marketplace/contracts/0x61dfb0887d61ccc38acbab7fbfe26dbd82976b79/items/0'
    })
  }
)

Material.setBasicMaterial(brochure21, {
  texture: Material.Texture.Common({
    src: 'https://pbs.twimg.com/media/GVzMOpHWoAAYncm?format=jpg&name=small'
  })
})
pointerEventsSystem.onPointerDown(
  {
    entity: brochure21,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Click'
    }
  },
  function () {
    console.log('clicked entity')
    openExternalUrl({ url: 'https://shibeship.com/d-item/id-268' })
  }
)

//start wall code
const wall01 = engine.addEntity()
GltfContainer.create(wall01, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall01, {
  position: Vector3.create(1, 0, 0.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})

const wall02 = engine.addEntity()
GltfContainer.create(wall02, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall02, {
  position: Vector3.create(3, 0, 0.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})

const wall03 = engine.addEntity()
GltfContainer.create(wall03, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall03, {
  position: Vector3.create(5, 0, 0.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})

const wall04 = engine.addEntity()
GltfContainer.create(wall04, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall04, {
  position: Vector3.create(7, 0, 0.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})

const wall05 = engine.addEntity()
GltfContainer.create(wall05, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall05, {
  position: Vector3.create(8, 0, 1.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

const wall06 = engine.addEntity()
GltfContainer.create(wall06, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall06, {
  position: Vector3.create(8, 0, 3.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

const wall07 = engine.addEntity()
GltfContainer.create(wall07, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall07, {
  position: Vector3.create(8, 0, 5.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

//there is no wall08 b/c in original, had it deleted

const wall09 = engine.addEntity()
GltfContainer.create(wall09, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall09, {
  position: Vector3.create(7, 0, 16),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})

const wall10 = engine.addEntity()
GltfContainer.create(wall10, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall10, {
  position: Vector3.create(5, 0, 16),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})

const wall11 = engine.addEntity()
GltfContainer.create(wall11, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall11, {
  position: Vector3.create(3, 0, 16),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})

const wall12 = engine.addEntity()
GltfContainer.create(wall12, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall12, {
  position: Vector3.create(1, 0, 16),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})

const wall13 = engine.addEntity()
GltfContainer.create(wall13, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall13, {
  position: Vector3.create(0.01, 0, 7.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall14 = engine.addEntity()
GltfContainer.create(wall14, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall14, {
  position: Vector3.create(0.01, 0, 5.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall15 = engine.addEntity()
GltfContainer.create(wall15, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall15, {
  position: Vector3.create(0.01, 0, 3.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall16 = engine.addEntity()
GltfContainer.create(wall16, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall16, {
  position: Vector3.create(0.01, 0, 1.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall17 = engine.addEntity()
GltfContainer.create(wall17, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall17, {
  position: Vector3.create(0.01, 0, 9.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall18 = engine.addEntity()
GltfContainer.create(wall18, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall18, {
  position: Vector3.create(0.01, 0, 11.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall19 = engine.addEntity()
GltfContainer.create(wall19, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall19, {
  position: Vector3.create(0.01, 0, 13.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall20 = engine.addEntity()
GltfContainer.create(wall20, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall20, {
  position: Vector3.create(0.01, 0, 15),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 270, 0)
})

const wall21 = engine.addEntity()
GltfContainer.create(wall21, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall21, {
  position: Vector3.create(10, 0, 9.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

const wall22 = engine.addEntity()
GltfContainer.create(wall22, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall22, {
  position: Vector3.create(10, 0, 11.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

const wall23 = engine.addEntity()
GltfContainer.create(wall23, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall23, {
  position: Vector3.create(10, 0, 13.01),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

const wall24 = engine.addEntity()
GltfContainer.create(wall24, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall24, {
  position: Vector3.create(10, 0, 15),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

const wall25 = engine.addEntity()
GltfContainer.create(wall25, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall25, {
  position: Vector3.create(9, 0, 16),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})

const wall26 = engine.addEntity()
GltfContainer.create(wall26, {
  src: 'models/WALLS04.glb'
})
Transform.create(wall26, {
  position: Vector3.create(9, 0, 8),
  scale: Vector3.create(1, 1.75, 1),
  rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})
