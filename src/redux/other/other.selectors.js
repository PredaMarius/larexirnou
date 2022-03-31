/* eslint-disable linebreak-style */
import {createSelector} from 'reselect';

const selectOther=state=>state.other;

export const selectOtherLoading= createSelector(
  [selectOther],
  other=>other.loading
);

export const selectOtherDone= createSelector(
  [selectOther],
  other=>other.done
);

export const selectOtherErrors= createSelector(
  [selectOther],
  other=>other.errors
);

export const selectOtherVariant= createSelector(
  [selectOther],
  other=>other.variant
);

export const selectOtherOpenEditItem= createSelector(
  [selectOther],
  other=>other.openEditItem
);


export const selectOtherConfirmation= createSelector(
  [selectOther],
  other=>other.confirmation
);

export const selectOtherOverlaySpinner= createSelector(
  [selectOther],
  other=>other.overlaySpinner
);