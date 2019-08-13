import { ActionType, getType } from 'typesafe-actions'
import { IPreviewState } from '../types/PreviewState'

import * as previewAction from '../actions/PreviewAction'
export type PreviewAction = ActionType<typeof previewAction>

export function PreviewActionReducer(state: IPreviewState | undefined, action: PreviewAction){
  if (state === undefined)
  {
    var diodes = [];
    for (var i = 0; i < 18; i++)
    {
      diodes.push('N/A');
    }

    state = {
      diodeSequence: diodes,
      currSelection: 0,
    }
  }

  switch (action.type) {
    case getType(previewAction.setDiodeSequence):
      return { ...state,
        diodeSequence: action.payload.diodeSequence,
      };
    case getType(previewAction.setCurrSelection):
      return { ...state,
        currSelection: action.payload.currSelection,
      };
    default:
      return state;
  }
}