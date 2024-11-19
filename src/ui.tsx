import type ReactEcs from '@dcl/sdk/react-ecs'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

const uiComponent = (): ReactEcs.JSX.Element[] => [NpcUtilsUi()]

export function setupUi(): void {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
