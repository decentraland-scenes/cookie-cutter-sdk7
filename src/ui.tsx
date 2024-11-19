import { openExternalUrl } from '~system/RestrictedActions'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { TextAlignMode, TextureFilterMode, TextureWrapMode } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

const uiComponent = () => [NpcUtilsUi()]

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
