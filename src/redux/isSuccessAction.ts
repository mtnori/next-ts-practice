/**
 * @fileoverview SuccessActionのTypeGuard
 */
import { NormalizedData } from './NormalizedData';
import { RootAction } from './actions';

// Success action type
interface SuccessAction {
  type: any;
  payload: NormalizedData;
}

// TypeGuard
export default function isSuccessAction(
  action: RootAction
): action is SuccessAction {
  return (
    (action as SuccessAction).payload !== undefined &&
    (action as SuccessAction).payload.entities !== undefined
  );
}
