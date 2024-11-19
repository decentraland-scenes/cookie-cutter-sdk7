/*    SPLAT SURFACE
    contains all functional components of the splat surface object, including model's file path,
    interface for placement calls, splat placement functionality, and total area calculation. 

    because this module provides a ui render, so the file extension needs to be 'ui.tsx' 
*/

import {
  Entity,
  GltfContainer,
  InputAction,
  PointerEventType,
  PointerEvents,
  Transform,
  engine,
  inputSystem
} from '@dcl/sdk/ecs'
import { ReactEcs, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { SplatObject } from './splat-object'

export module SplatSurface {
  /** when true debug logs are generated (toggle off when you deploy) */
  const isDebugging: boolean = false

  /** splat surface model location */
  const MODEL_SPLAT_SURFACE: string = 'models/splat-attack/dough_small04.glb'
  /** */
  // var splatVolume: number = 0;

  /** interaction surface used by player to create splats */
  var splatSurfaceEntity: undefined | Entity = undefined

  /** object interface used to define all data required to manipulate the transform of the splat surface object */
  export interface SplatSurfaceTransformData {
    x: number
    y: number
    z: number
  }

  // prepare splat surface object interactions
  engine.addSystem(() => {
    //consume primary key-down event -> place splat object
    if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, SplatSurface.GetSurfaceObject())) {
      //access and process result
      const result = inputSystem.getInputCommand(
        InputAction.IA_PRIMARY,
        PointerEventType.PET_DOWN,
        SplatSurface.GetSurfaceObject()
      )
      if (result && result.hit && result.hit.position) {
        SplatSurface.PlaceSplatObject(result.hit.position)
      }
    }

    if (inputSystem.isTriggered(InputAction.IA_ACTION_3, PointerEventType.PET_DOWN, SplatSurface.GetSurfaceObject())) {
      SplatSurface.ResetSplatSurface()
    }
  })

  /** returns the surface object, only one instance is maintained. */
  export function GetSurfaceObject(): Entity {
    //ensure surface object has been initialized
    if (splatSurfaceEntity == undefined) {
      //  entity
      splatSurfaceEntity = engine.addEntity()
      Transform.create(splatSurfaceEntity)
      //  custom model
      GltfContainer.create(splatSurfaceEntity, {
        src: MODEL_SPLAT_SURFACE,
        visibleMeshesCollisionMask: undefined,
        invisibleMeshesCollisionMask: undefined
      })
      //  pointer event system
      PointerEvents.create(splatSurfaceEntity, {
        pointerEvents: [
          {
            //primary key -> places a new splat object
            eventType: PointerEventType.PET_DOWN,
            eventInfo: { button: InputAction.IA_PRIMARY, hoverText: 'Place Cutter' }
          },

          {
            //secondary key -> resets the splat surface
            eventType: PointerEventType.PET_DOWN,
            eventInfo: { button: InputAction.IA_ACTION_3, hoverText: 'Reset Dough' }
          }
        ]
      })
      if (isDebugging) console.log('Splat Surface: created new surface!')
    }
    return splatSurfaceEntity
  }

  export function PlaceSplatObject(position: SplatSurfaceTransformData) {
    if (isDebugging) console.log('Splat Surface: action call -> place splat object')
    //place splat object
    SplatObject.Create(position)
    //add splat's volume as a new circle listing
    circles.push(new Circle(position.x, position.y, 0.5))
    //play splat sound
    SplatObject.PlaySound()
  }

  export function ResetSplatSurface() {
    if (isDebugging) console.log('Splat Surface: action call -> reset splat objects')

    //disable all splat objects
    SplatObject.DisableAll()
    //reset volume data
    circles = []
  }

  /** moves the splat surface to the given location */
  export function Move(mod: SplatSurfaceTransformData) {
    if (isDebugging)
      console.log('Splat Surface: splat surface moved to pos(x=' + mod.x + ', y=' + mod.y + ', z=' + mod.z + ')')
    Transform.getMutable(GetSurfaceObject()).position = mod
  }

  /** rescales the splat surface to the given size */
  export function Scale(mod: SplatSurfaceTransformData) {
    if (isDebugging)
      console.log('Splat Surface: splat surface rescaled to scale(x=' + mod.x + ', y=' + mod.y + ', z=' + mod.z + ')')
    Transform.getMutable(GetSurfaceObject()).scale = mod
  }

  var circles: Circle[] = []

  /** represents a splat'//s volume */
  class Circle {
    constructor(
      public x: number,
      public y: number,
      public r: number
    ) {}
  }
}
