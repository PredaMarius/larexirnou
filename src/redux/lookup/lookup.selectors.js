/* eslint-disable linebreak-style */
import {createSelector} from 'reselect';

const selectLookup=state=>state.lookup;

export const selectLookupProduse= createSelector(
  [selectLookup],
  lookup=>lookup.produse
);

export const selectLookupMateriale= createSelector(
  [selectLookup],
  lookup=>lookup.materiale
);

export const selectLookupPreturiTabelare= createSelector(
  [selectLookup],
  lookup=>lookup.preturitabelare
);

export const selectLookupOptionale= createSelector(
  [selectLookup],
  lookup=>lookup.optionale
);

export const selectLookupCulori= createSelector(
  [selectLookup],
  lookup=>lookup.culori
);

export const selectLookupInformari= createSelector(
  [selectLookup],
  lookup=>lookup.informari
);

export const selectLookupIndicatori= createSelector(
  [selectLookup],
  lookup=>lookup.indicatori
);

export const selectLookupFirma= createSelector(
  [selectLookup],
  lookup=>lookup.firma
);

export const selectLookupCurs= createSelector(
  [selectLookup],
  lookup=>lookup.curs
);